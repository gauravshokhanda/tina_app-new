import axios from "axios";

// Define the base URL for your API
const BASE_URL = "http://appalachiantrashbgone.com/wp-json/jwt-auth/v1"; 

// Create an axios instance
const Client = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Define the login function
const login = async (data) => {
    try {
        const response = await Client.post("/token", data); 
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    login,
};