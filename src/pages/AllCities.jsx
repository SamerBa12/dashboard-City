import React, { useEffect } from 'react'
import { useState } from 'react';
import { Table, Checkbox, Loader } from '@mantine/core';
import { getCities } from '../apis/api';

const AllCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true)
            const response = await getCities();
            setCities(response);
            setLoading(false)
        }
        fetchCities();

    }, [])




    const rows = cities.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.note}</Table.Td>
            <Table.Td>{element.status}</Table.Td>
        </Table.Tr>
    ));
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
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table >

                    </div >
            }
        </>
    )
}

export default AllCities
