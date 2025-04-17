import axios from "axios";
import BodyTypeFactory from "../@utils/bodyType.factory.tsx";
import FinFactory from "../@utils/fin.factory.tsx";
import EyeFactory from "../@utils/eye.factory.tsx";

const API_BASE_URL = "https://pechapp.edwindev.fr/api/";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllFish = async () => {
    try {
        const response = await apiClient.get(`fish`);
        return response.data;
    } catch (error) {
        console.error("API Error : ", error);
        throw error;
    }
};

export const getFishById = async (id: string) => {
    try {
       const response = await axios.get(`fish/${id}`) 
       return response.data;
    } catch (error) {
       console.error("API Error : ", error); 
       return error;
    }
}

export const getAllBodyType = async () => {
    try {
       const response = await axios.get(`body-type`); 
       return BodyTypeFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error : ", error);
        return error;
    }
}

export const getBodyTypeById = async (id : string) => {
    try {
       const response = await axios.get(`body-type/${id}`) 
       return response.data;
    } catch (error) {
        console.error("API error : ", error);
        return error;
    }
}

export const getAllFins = async () => {
    try {
        const response = await axios.get(`fin`);
        return FinFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error : ", error);
        return error;
    }
}

export const getFinById = async (id: string) => {
    try {
        const response = await axios.get(`fin/${id}`);
        return response.data;
    } catch (error) {
       console.error("API error : ", error);
       return error; 
    }
}

export const getAllEyes = async () => {
    try {
        const response = await axios.get(`eye`);
        return EyeFactory.responseToModel(response.data);
    } catch (error) {
       console.error("API error : ", error); 
       return error;
    }
} 

export const getEyeById = async (id: string) => {
    try {
        const response = await axios.get(`eye/${id}`);
        return response.data;
    } catch (error) {
        console.error("API error : ", error);
        return error;
    }
}