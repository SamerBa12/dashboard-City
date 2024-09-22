import { Button, Container, Group, Input, Loader, Paper, Select, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CreateCity, getStatus } from '../apis/api';
import { useNavigate } from 'react-router-dom';

const AddCity = () => {

    const [fetchStatus, setFetchStatus] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchStatus = async () => {

            const status = await getStatus()
            setFetchStatus(status.status)
        }
        fetchStatus()
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('اسم المدينة مطلوب')
            .max(50, 'اسم المدينة يجب أن يكون أقل من 50 حرف'),
        note: Yup.string()
            .nullable()
            .max(300, 'الملاحظات يجب أن تكون أقل من 300 حرف'),
        status: Yup.string()
            .nullable()
    });

    const [city, setCity] = useState({
        name: '',
        status: '',
        note: null
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCity((prev) => ({ ...prev, [name]: value }));
    };


    const navigate = useNavigate()

    const handleCreateCity = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await validationSchema.validate(city, { abortEarly: false });
            await CreateCity(city);
            setCity({ name: '', status: '', note: null });
            navigate('/all-cities')
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setLoading(false)
            setErrors(validationErrors);
        }
    };

    return (
        <>
            {
                loading ? <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <Loader color="cyan" size="sm" type="bars" />
                </div> :
                    <Container size={420} my={40}>
                        <h1>
                            اضف مدينة جديدة
                        </h1>
                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput
                                onChange={handleChange}
                                value={city.name || ''}
                                name='name'
                                variant="default"
                                label="اسم المدينة"
                                size="md"
                                radius="md"
                                placeholder="اسم المدينة"
                                className='py-3'
                                error={errors.name}
                            />
                            <Select
                                onChange={(value) => {
                                    setCity((prev) => ({ ...prev, status: value }));
                                }}
                                value={city.status || ''}
                                name='status'
                                label="الحالة"
                                placeholder="اختر حالة المدينة"
                                data={fetchStatus}
                                className='py-3'
                            />
                            <TextInput
                                onChange={handleChange}
                                value={city.note || ''}
                                name='note'
                                variant="default"
                                size="md"
                                label="الملاحظات"
                                radius="md"
                                placeholder="ملاحظات"
                                className='py-3'
                                error={errors.note}
                            />
                            <Group position="apart" mt="md">
                                <Button
                                    fullWidth
                                    type="submit"
                                    onClick={handleCreateCity}
                                >
                                    اضافة
                                </Button>
                            </Group>
                        </Paper>
                    </Container>
            }
        </>
    );
};

export default AddCity;
