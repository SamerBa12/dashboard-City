import React, { useEffect, useState } from 'react';
import { deleteCities, getCities } from '../apis/api';
import { Button, Group, Loader, Modal, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromStatus, fetchCities } from '../redux/sliceCities';
import { useNavigate } from 'react-router-dom';

const StatusCites = () => {
    const [cities, setCities] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()
    useEffect(() => {
        const fetchCity = async () => {
            setLoading(true)
            const response = await getCities();
            dispatch(fetchCities(response))
            setLoading(false)
        }
        fetchCity();
    }, []);

    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    const city = useSelector((state) => state.sliceCities.cities);

    const handleDelete = (id) => {
        deleteCities(id)
        dispatch(deleteFromStatus(id))
        close();
    };

    const handelUpdateCity = (id) => {
        navigate(`/edit-city/${id}`)
    }

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
                    <div className="container p-5" style={{ direction: 'ltr' }}>
                        <Table striped highlightOnHover withTableBorder withRowBorders={false}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>id</Table.Th>
                                    <Table.Th>name</Table.Th>
                                    <Table.Th>note</Table.Th>
                                    <Table.Th>status</Table.Th>
                                    <Table.Th>delete</Table.Th>
                                    <Table.Th>edit</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {city.map((element, index) => (
                                    <Table.Tr key={element.id}>
                                        <Table.Td>{element.id}</Table.Td>
                                        <Table.Td>{element.name}</Table.Td>
                                        <Table.Td>{element.note}</Table.Td>
                                        <Table.Td>{element.status}</Table.Td>
                                        <Table.Td>
                                            <Button
                                                onClick={() => {
                                                    setSelectedCityId(element.id);
                                                    open();
                                                }}
                                                color="red"
                                            >
                                                حذف
                                            </Button>
                                        </Table.Td>
                                        <Table.Td>
                                            <Button
                                                onClick={() => handelUpdateCity(element.id)}
                                            >تعديل</Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>

                        <Modal opened={opened} onClose={close} title="حذف العنصر">
                            <p>هل أنت متأكد أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذه العملية.</p>
                            <Group position="right" mt="md">
                                <Button onClick={close}>إلغاء</Button>
                                <Button color="red" onClick={() => handleDelete(selectedCityId)}>تأكيد الحذف</Button>
                            </Group>
                        </Modal>
                    </div>
            }
        </>
    );
};

export default StatusCites;
