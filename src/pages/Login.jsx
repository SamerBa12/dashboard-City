import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput, PasswordInput, Paper, Title, Container, Button, Group, Text, Alert, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginToken } from '../apis/api';
import { IconInfoCircle } from '@tabler/icons-react';



function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        localStorage.clear()
    }, [])

    const [loading, setLoading] = useState(false)

    const [err, setErr] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(pre => ({ ...pre, [name]: value })
        )
    }


    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = await LoginToken(user)
            localStorage.getItem('token') ?
                navigate('/all-cities')
                : setErr('يرجى التحقق من اسم المستخدم أو كلمة المرور')
            setLoading(false)
        } catch (err) {
            console.error(err)
        }


    };

    return (
        <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleLogin} >
                    <TextInput
                        label="اسم المستخدم"
                        placeholder="أدخل اسم المستخدم"
                        value={user.username}
                        name='username'
                        onChange={(e) => handleChange(e)}
                        required
                    />
                    <PasswordInput
                        label="كلمة المرور"
                        placeholder="أدخل كلمة المرور"
                        mt="md"
                        name='password'
                        value={user.password}
                        onChange={(e) => handleChange(e)}
                        required

                    />
                    {
                        err ? (
                            <Alert className="m-3" variant="light" color="red" radius="xl" title={err} icon={<IconInfoCircle />}>
                            </Alert>
                        ) : ''
                    }
                    <Group position="apart" mt="md">
                        <Button fullWidth type="submit">
                            {
                                loading ? <Loader color="cyan" size="sm" type="bars" /> :
                                    ' تسجيل الدخول'
                            }


                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}

export default Login;