import axios from "axios";
import BodyTypeFactory from "../@utils/bodyType.factory.tsx";
import FinFactory from "../@utils/fin.factory.tsx";
import EyeFactory from "../@utils/eye.factory.tsx";
import BodyTypeModel from "../models/bodyType.model.tsx";
import FinModel from "../models/fins.model.tsx";
import EyeModel from "../models/eye.model.tsx";

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

export const getAllBodyType = async () : Promise<BodyTypeModel[]> => {
    try {
        const response = await axios.get(`body-type`); 

        const filteredResponse : BodyTypeModel[] = [];
        response.data.foreach((bodyType : any) => {
            filteredResponse.push(BodyTypeFactory.responseToModel(bodyType));
        })
        return filteredResponse;
    } catch (error) {
        console.error("API error : ", error);
        throw error;
    }
}

export const getBodyTypeById = async (id : string) : Promise<BodyTypeModel> => {
    try {
       const response = await axios.get(`body-type/${id}`) 
       return BodyTypeFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error : ", error);
        throw error;
    }
}

export const getAllFins = async () : Promise<FinModel[]> => {
    try {
        const response = await axios.get(`fin`);

        const filteredResponse : FinModel[] = [];
        response.data.foreach((fin : any) => {
            filteredResponse.push(FinFactory.responseToModel(fin));
        })
        return filteredResponse;
    } catch (error) {
        console.error("API error : ", error);
        throw error;
    }
}

export const getFinById = async (id: string) : Promise<FinModel> => {
    try {
        const response = await axios.get(`fin/${id}`);
        return FinFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error : ", error);
        throw error; 
    }
}

export const getAllEyes = async () : Promise<EyeModel[]> => {
    try {
        const response = await axios.get(`eye`);

        const filteredResponse : EyeModel[] = [];
        response.data.foreach((eye : any) => {
            filteredResponse.push(EyeFactory.responseToModel(eye));
        })
        return filteredResponse;
    } catch (error) {
       console.error("API error : ", error); 
       throw error;
    }
} 

export const getEyeById = async (id: string) : Promise<EyeModel> => {
    try {
        const response = await axios.get(`eye/${id}`);
        return EyeFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error : ", error);
        throw error;
    }
}

export const getLegislationById = async (id : string) : Promise<any> => {
    try {
        const response = await axios.get(`legislation/${id}`);
        return response.data;
    } catch (error) {
        console.error("API error : ", error);
        return error;
    }
}