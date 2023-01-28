import axios from "axios"
import { Material, Size } from "../shared/Models";
import { API_URL } from "../utils/Constants";

const backendApi = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

//#region Sizes

export const getSizes = () => {
    return backendApi.get<Size[]>('v1/size');
} 

export const addSize = (body: Size) => {
    return backendApi.post<Size>('v1/size', body);
} 

export const updateSize = (id: number, body: Size) => {
    return backendApi.put<Size>('v1/size/' + id, body);
} 

export const deleteSizes= (id:number) => {
    return backendApi.delete('v1/size/' + id);
} 

//#endregion

//#region Materials

export const getMaterials = () => {
    return backendApi.get<Material[]>('v1/material/');
} 

export const addMaterial = (body: Material) => {
    return backendApi.post<Material>('v1/material/', body);
} 

export const updateMaterial = (id: number, body: Material) => {
    return backendApi.put<Material>('v1/material/' + id, body);
} 

export const deleteMaterial = (id:number) => {
    return backendApi.delete(API_URL + 'v1/material/' + id);
} 

//#endregion