import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Cart/cartReducer";
import { setProducts } from "./productReducer";
import { RootState, AppDispatch } from "../../Services/store";
import client from "../../Apis/client";
import Loading from "../../components/Loading/Loading";

interface Product {
  id: number;
  name: string;
  image: ImageSourcePropType;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const { token } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(
    (state: RootState) => state.cart.items
  ) as CartItem[];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null); // Track which product is being added

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryId
          ? `/shortapi/v1/products/${categoryId}`
          : "/shortapi/v1/products";
        const productData = await client.getProducts(endpoint, token);

        //console.log("API Response: ", productData);

        const baseURL = "https://appalachiantrashbgone.com/wp-json";

        const formattedProducts = productData.map((item: any) => ({
          id: item.id,
          name: item.name || "Unnamed Product",
          image: item.image?.src
            ? {
                uri: item.image.src.startsWith("http")
                  ? item.image.src
                  : `${baseURL}${item.image.src}`,
              }
            : require("../../../assets/images/mountain.png"),
          price: item.price || "N/A",
        }));

        setProducts(formattedProducts);
      } catch (error) {
        Alert.alert("Error fetching products:");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, token]);

  const handleAddToCart = useCallback(
    async (product: Product) => {
      if (!token) {
        Alert.alert("Error", "Please log in to continue.", [
          {
            text: "OK",
            onPress: () => router.push("/components/Users/SignIn"),
          },
        ]);
        return;
      }

      setAddingToCart(product.id); // Set loading state for this product

      // Check if the product is already in the cart and get its current quantity
      const currentQuantity = getQuantity(product.id);
      const quantityToAdd = currentQuantity > 0 ? currentQuantity + 1 : 1;

      // Update the local cart state
      dispatch(addToCart({ ...product, quantity: 1 })); // Increment by 1

      try {
        // Send the updated quantity to the backend
        const response = await client.addToCart(
          product.id,
          quantityToAdd,
          token
        );
        Alert.alert("Success", response?.message || "Product added to cart", [
          {
            text: "View Cart",
            onPress: () =>
              router.push({
                pathname: "/components/Cart/Cart",
                params: { cart: encodeURIComponent(JSON.stringify(cart)) },
              }),
          },
          {
            text: "Continue Shopping",
            style: "cancel",
          },
        ]);
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to add to cart.",
          [
            {
              text: "Retry",
              onPress: () => handleAddToCart(product),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
        // Revert the local cart state if the API fails
        dispatch(removeFromCart(product.id));
      } finally {
        setAddingToCart(null); // Reset loading state
      }
    },
    [token, dispatch, cart, router]
  );

  const changeQuantity = (itemId: number, action: "increase" | "decrease") => {
    const product = products.find((p) => p.id === itemId);
    if (!product) return;

    if (action === "increase") {
      // When increasing quantity, call handleAddToCart to sync with the backend
      handleAddToCart(product);
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const isInCart = (itemId: number) => {
    return cart.some((item: CartItem) => item.id === itemId);
  };

  const getQuantity = (itemId: number) => {
    const item = cart.find((item: CartItem) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <View className="flex-1 bg-[#E6F2ED] justify-center items-center">
        <Text className="text-2xl font-semibold text-gray-700">
          No products found
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/Screens/Welcome")}
          className="bg-[#64CA96E5] px-6 py-3 rounded-lg mt-6"
        >
          <Text className="text-white font-bold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E6F2ED]">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity
          onPress={() => router.push("/Screens/Welcome")}
          className="p-2 rounded-full bg-[#64CA96E5]"
        >
          <MaterialIcons name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-700">
          <Text className="text-green-600">Products</Text> and Services
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/components/Cart/Cart",
              params: { cart: encodeURIComponent(JSON.stringify(cart)) },
            })
          }
        >
          <MaterialIcons name="shopping-cart" size={28} color="black" />
          {cart.length > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2">
              <Text className="text-white text-xs">{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View className="mx-4 mt-2">
        <Image
          source={require("../../../assets/images/quotes.png")}
          className="w-full h-24 rounded-lg"
          resizeMode="cover"
        />
        <Text className="absolute bottom-2 left-4 text-white font-bold text-lg">
          Innovate Today. Sustain for Tomorrow
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View className="bg-white p-2 m-2 rounded-lg items-center w-[45%] shadow-md">
            <Text className="text-lg font-bold text-right w-full text-gray-700">
              ${item.price}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/constants/Item",
                  params: { productId: item.id },
                })
              }
              className="items-center"
            >
              <Image
                source={item.image}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="text-center text-gray-800 font-semibold mt-2">
              {item.name}
            </Text>
            {isInCart(item.id) ? (
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, "decrease")}
                  className="bg-[#4CAF50] p-1 rounded-full"
                  disabled={addingToCart === item.id}
                >
                  <MaterialIcons name="remove" size={18} color="white" />
                </TouchableOpacity>
                <Text className="mx-2">{getQuantity(item.id)}</Text>
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, "increase")}
                  className="bg-[#4CAF50] p-1 rounded-full"
                  disabled={addingToCart === item.id}
                >
                  {addingToCart === item.id ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <MaterialIcons name="add" size={18} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-[#64CA96E5] px-3 py-2 mt-2 rounded-lg flex-row items-center"
                onPress={() => handleAddToCart(item)}
                disabled={addingToCart === item.id}
              >
                {addingToCart === item.id ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <MaterialIcons
                      name="shopping-cart"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white ml-2">Add to Cart</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
