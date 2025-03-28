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
        Alert.alert("Login API Error:", error.response?.data || error.message);
        throw error;
    }
};


// Signup Function
const signup = async (data) => {
    try {
        const response = await Client.post("/custom/v1/signup", data);
        return response;
    } catch (error) {
        Alert.alert("Signup API Error:", error.response?.data || error.message);
        throw error;
    }
};

// Get Products Function
const getProducts = async (endpoint,token) => {
    // console.log("token",token)
    try {
        const response = await Client.get(endpoint, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        // console.log("response data",response.data)
        return response.data;
    } catch (error) {
        Alert.alert("Error fetching products:", error.response?.data || error.message);
        throw error;
    }
};
const getCategories = async (token) => {
    try {
        const response = await Client.get("/shortapi/v1/categories", {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert("Error fetching categories:", error.response?.data || error.message);
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
        Alert.alert("Error fetching user data:", error.response?.data || error.message);
        throw error;
    }
};

// Add to Cart Function
const addToCart = async (productId, quantity, token) => {

    try {
        const response = await Client.post(
            "/custom/v1/add-to-cart/",
            {
                product_id: productId,
                quantity: quantity,
                
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json"
                },
            }
        );
        
        return response.data;
    } catch (error) {
        Alert.alert("Add to Cart API Error:", error.response?.data || error.message);
        throw error;
    }
};

const getProductById = async (productId, token) => {
    try {
        const response = await Client.get(`/shortapi/v1/product/${productId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert("Error fetching product details:", error.response?.data || error.message);
        throw error;
    }
};



export default {
    login,
    signup,
    getProducts,
    getCategories,
    getUser,
    addToCart,
    getProductById
};