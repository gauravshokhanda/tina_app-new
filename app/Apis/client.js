import axios from "axios";

// Define the base URL for your API
const BASE_URL = "https://appalachiantrashbgone.com/wp-json";

// Create an axios instance
const Client = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Login Function
const login = async (data) => {
    try {
        const response = await Client.post("/jwt-auth/v1/token", data);
        return response;
    } catch (error) {
        console.error("Login API Error:", error.response?.data || error.message);
        throw error;
    }
};


// Signup Function
const signup = async (data) => {
    try {
        const response = await Client.post("/custom/v1/signup", data);
        return response;
    } catch (error) {
        console.error("Signup API Error:", error.response?.data || error.message);
        throw error;
    }
};

// Get Products Function
const getProducts = async (endpoint,token) => {
    // console.log("token",token)
    try {
        const response = await Client.get(endpoint, {
            headers: {
                "Authorization": "Basic " + btoa("ck_14ef07aa2b169178c93dd7cda910d7d7e306ef1b:cs_855830329384328e92c820d1b1d2ff4a8fa2b3ee"),
                "Content-Type": "application/json"
            },
        });
        // console.log("response data",response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        throw error;
    }
};
const getCategories = async (token) => {
    try {
        const response = await Client.get("/wc/v3/products/categories", {
            headers: {
                "Authorization": "Basic " + btoa("ck_14ef07aa2b169178c93dd7cda910d7d7e306ef1b:cs_855830329384328e92c820d1b1d2ff4a8fa2b3ee"),
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
        throw error;
    }
};

const getUser = async (token) => {
    try {
        const response = await Client.get("/wp/v2/users/me", {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        throw error;
    }
};


export default {
    login,
    signup,
    getProducts,
    getCategories,
    getUser,
};
