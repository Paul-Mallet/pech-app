import axios from "axios";
import BodyTypeFactory from "../@utils/bodyType.factory.tsx";
import FinFactory from "../@utils/fin.factory.tsx";
import EyeFactory from "../@utils/eye.factory.tsx";
import { BodyTypeModel, FinModel, EyeModel } from "../models/fish.model.tsx";
import ResearchAnswerModel from "../models/researchAnswer.model.tsx";

export const API_BASE_URL = "https://pechapp.edwindev.fr";
const API_NAME = "/api/";

const apiClient = axios.create({
    baseURL: API_BASE_URL + API_NAME,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getHomeContent = async () => {
    try {
        const response = await apiClient.get(`home`);
        return response.data;
    } catch (error) {
        console.error("API Error when trying to get the decouvrir content: ", error);
        return error;
    }
};

export const getAllFish = async () => {
    try {
        const response = await apiClient.get(`fish`);
        return response.data;
    } catch (error) {
        console.error("API Error when trying to get the fish: ", error);
        return [];
    }
};

export const getFishById = async (id: string) => {
    try {
        const response = await apiClient.get(`fish/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error when trying to get a fish by id: ", error); 
        return error;
    }
}

export const getAllBodyType = async () => {
    try {
        const response = await apiClient.get(`body-type`);

        const filteredResponse : BodyTypeModel[] = [];
        response.data.forEach((bodyType : any) => {
            filteredResponse.push(BodyTypeFactory.responseToModel(bodyType));
        })
        return filteredResponse;
    } catch (error) {
        console.error("API error when trying to get the body type: ", error);
        throw error;
    }
}

export const getBodyTypeById = async (id : string) => {
    try {
        const response = await apiClient.get(`body-type/${id}`);
        return BodyTypeFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error when trying to get a body type by id: ", error);
        throw error;
    }
}

export const getAllFins = async () => {
    try {
        const response = await apiClient.get(`fin`);

        const filteredResponse : FinModel[] = [];
        response.data.forEach((fin : any) => {
            filteredResponse.push(FinFactory.responseToModel(fin));
        })
        return filteredResponse;
    } catch (error) {
        console.error("API error when trying to get the fins: ", error);
        throw error;
    }
}

export const getFinById = async (id: string) => {
    try {
        const response = await apiClient.get(`fin/${id}`);
        return FinFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error when trying to get a fin by id: ", error);
        throw error; 
    }
}

export const getAllEyes = async () => {
    try {
        const response = await apiClient.get(`eye`);

        const filteredResponse : EyeModel[] = [];
        response.data.forEach((eye : any) => {
            filteredResponse.push(EyeFactory.responseToModel(eye));
        })
        return filteredResponse;
    } catch (error) {
        console.error("API error when trying to get the eyes: ", error); 
        throw error;
    }
} 

export const getEyeById = async (id: string) => {
    try {
        const response = await apiClient.get(`eye/${id}`);
        return EyeFactory.responseToModel(response.data);
    } catch (error) {
        console.error("API error when trying to get an eye: ", error);
        throw error;
    }
}

export const getAllLegislations = async () => {
    try {
        const response = await apiClient.get(`legislation`);
        return response.data;
    } catch (error) {
        console.error("API error when trying to get legislations: ", error);
        return error;
    }
}

export const getLegislationById = async (id : string | null) => {
    try {
        const response = await apiClient.get(`legislation/${id}`);
        return response.data;
    } catch (error) {
        console.error("API error when trying to get a legislation: ", error);
        return error;
    }
}

export const getFishByAnswer = async(answers : ResearchAnswerModel) => {
    try {
        const queryParts: string[] = [];

        if (answers.bodyType != null) {
            queryParts.push(`bodytype=${encodeURIComponent(answers.bodyType)}`);
        }

        if (answers.eye != null) {
            queryParts.push(`eye=${encodeURIComponent(answers.eye)}`);
        }

        if (Array.isArray(answers.fin)) {
            answers.fin.forEach(finValue => {
                if (finValue != null) {
                    queryParts.push(`fin[]=${encodeURIComponent(finValue)}`);
                }
            });
        }
        const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';

        console.log(queryString);
        // const response = await axios.get(`http://127.0.0.1:8000/api/fish/filter${queryString}`);

        // a decommenter une fois la requete mise en preprod
        const response = await apiClient.get(`fish/filter${queryString}`);
        return response.data;
    }
    catch (error) {
        console.error("API error when trying to update the fishlist: ", error);
        return error;
    }
}

// export const getCustomFishList = async () => {
//     try {
//         const response = await apiClient.get(`fish`);
//         return response.data;
//     } catch (error) {
//         console.error("API Error when trying to get the fish: ", error);
//         return [];
//     }
// };

export const sendPhotoToBack = async (photoPath: string) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: photoPath,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        const response = await axios.post('https://pechapp.edwindev.fr/api/ai/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Upload success:');
        return response.data;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};