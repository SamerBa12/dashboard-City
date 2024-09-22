import axios from "axios"
import { axiosInstance } from "./axiosInstance";

const apiUrl = import.meta.env.VITE_API_URL;

export const LoginToken = async (user) => {
    try {
        const response = await axios.post(
            `${apiUrl}/api/login`,
            user
        );
        localStorage.setItem('token', response.data.data.access_token);

    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
    }
};



export const CreateCity = async (city) => {
    try {
        return await axiosInstance.post(
            `${apiUrl}/api/city/create`,
            city
            , {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            response.data
        })

    } catch (error) {
        console.log(error);
    }
};


export const getCities = async () => {
    try {
        const response = await axiosInstance.get(`/api/city/get`)
        return response.data.data

    } catch (error) {
        console.log(error);
    }
}


export const getStatus = async () => {
    try {
        const response = await axiosInstance.get(`/api/city/get/status`)
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteCities = async (id) => {
    try {

        return await axiosInstance.delete(`/api/city/delete/${id}`);
    } catch (error) {
        console.log("Error in delete product", error);
    }
};


export const getCity = (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance
            .get(`/api/city/${id}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch(err => reject(err));
    });
};

export const fetchEditCity = (id, data) => {
    return new Promise((resolve, reject) => {
        axiosInstance.put(`/api/city/update/${id}`, data)
            .then((res) => {
                resolve(res.data)
            })
            .catch(err => reject(err));
    })
}