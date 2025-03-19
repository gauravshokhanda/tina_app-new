import axios from "axios";

// Define the base URLs for your APIs
const AUTH_BASE_URL = "http://appalachiantrashbgone.com/wp-json/jwt-auth/v1";
const SIGNUP_BASE_URL = "https://appalachiantrashbgone.com/wp-json/custom/v1";
const PRODUCT_API_URL = "https://appalachiantrashbgone.com/wp-json/wc/v3/products";

// Create axios instances
const AuthClient = axios.create({
    baseURL: AUTH_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const SignupClient = axios.create({
    baseURL: SIGNUP_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const WooCommerceClient = axios.create({
    baseURL: PRODUCT_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    
});

// Define the login function
const login = async (data) => {
    try {
        const response = await AuthClient.post("/token", data); 
        return response;
    } catch (error) {
        throw error;
    }
};


// Define the signup function
const signup = async (data) => {
    try {
      console.log("Signup Request Payload:", data); // Debug log
      console.log("Signup Request URL:", `${SIGNUP_BASE_URL}/signup`); // Debug log
        const response = await SignupClient.post("/signup", data);
      console.log("Signup Response:", response.data); // Debug log
        return response;
    } catch (error) {
        console.error("Signup API Error:", error.response?.data || error.message);
        throw error;
    }
};
//Define fetch Product
const fetchProducts = async () => {
    try {
        const response = await WooCommerceClient.get("/products");
        console.log("Products API Response:", response.data); // Debug log
        return response;
    } catch (error) {
        console.error("Products API Error:", error.response?.data || error.message); // Debug log
        throw error;
    }
};


export default {
    login,
    signup, 
    fetchProducts, 
};
