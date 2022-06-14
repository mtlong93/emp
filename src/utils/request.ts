import axios from "axios";

export const request = axios.create(
    {
        baseURL: "https://6298ce35de3d7eea3c707a15.mockapi.io/api/"
    }    
)