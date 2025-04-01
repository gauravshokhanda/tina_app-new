import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Cart/cartReducer";
import { RootState, AppDispatch } from "../../Services/store";
import client from "../../Apis/client";
import Loading from "../../components/Loading/Loading";

interface Product {
  id: number;
  name: string;
  image: any;
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
  const cart = useSelector((state: RootState) => state.cart.items) as CartItem[];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryId ? `/shortapi/v1/products/${categoryId}` : "/shortapi/v1/products";
        const productData = await client.getProducts(endpoint, token);
    
        //console.log("API Response:", productData); // Log to check image data structure
    
        const baseURL = "https://appalachiantrashbgone.com/wp-json";
    
        const formattedProducts = productData.map((item: any) => {
          const imageSrc = item.image?.src || item.image || ""; // Check for different possible image formats
          const finalImage = imageSrc
            ? { uri: imageSrc.startsWith("http") ? imageSrc : `${baseURL}${imageSrc}` }
            : require("../../../assets/images/mountain.png");
    
          return {
            id: item.id,
            name: item.name || "Unnamed Product",
            image: finalImage,
            price: item.price || "N/A",
          };
        });
    
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, token]);

  const handleAddToCart = useCallback(
    async (product: Product) => {
      if (!token) {
        // console.log("Please log in to continue.");
        return;
      }

      setAddingToCart(product.id);
      const currentQuantity = getQuantity(product.id);
      const quantityToAdd = currentQuantity > 0 ? currentQuantity + 1 : 1;

      dispatch(addToCart({ ...product, quantity: 1 }));
      
      try {
        await client.addToCart(product.id, quantityToAdd, token);
      } catch (error: any) {
        // console.error("Failed to add to cart.");
        dispatch(removeFromCart(product.id));
      } finally {
        setAddingToCart(null);
      }
    },
    [token, dispatch, cart]
  );

  const changeQuantity = (itemId: number, action: "increase" | "decrease") => {
    const product = products.find((p) => p.id === itemId);
    if (!product) return;

    if (action === "increase") {
      handleAddToCart(product);
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const isInCart = (itemId: number) => cart.some((item: CartItem) => item.id === itemId);
  const getQuantity = (itemId: number) => cart.find((item: CartItem) => item.id === itemId)?.quantity || 0;

  if (loading) {
    return <Loading />;
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
      <FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 12 }}
  contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
  renderItem={({ item }) => (
    <View className="bg-white p-4 rounded-xl shadow-lg w-[48%] mb-4 flex justify-between min-h-[250px]">
      {/* Price Tag */}
      <Text className="text-lg font-semibold text-gray-700 self-end">${item.price}</Text>

      {/* Product Image */}
      <TouchableOpacity onPress={() => router.push({ pathname: "/constants/Item", params: { productId: item.id } })}>
        <Image source={item.image} className="w-28 h-28 mt-2 ml-6" resizeMode="contain" />
      </TouchableOpacity>

      {/* Product Name */}
      <Text
        className="text-center text-gray-800 font-medium mt-2"
        numberOfLines={2}  // Prevents height mismatch due to long names
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>

      {/* Cart Actions - Always at the Bottom */}
      <View className="mt-auto items-center">
        {isInCart(item.id) ? (
          <View className="flex-row items-center mt-3">
            <TouchableOpacity
              onPress={() => changeQuantity(item.id, "decrease")}
              className="bg-[#4CAF50] p-2 rounded-full"
            >
              <MaterialIcons name="remove" size={22} color="white" />
            </TouchableOpacity>
            <Text className="mx-3 text-lg font-semibold">{getQuantity(item.id)}</Text>
            <TouchableOpacity
              onPress={() => changeQuantity(item.id, "increase")}
              className="bg-[#4CAF50] p-2 rounded-full"
            >
              {addingToCart === item.id ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <MaterialIcons name="add" size={22} color="white" />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-[#64CA96] px-4 py-2 mt-3 rounded-lg flex-row items-center"
            onPress={() => handleAddToCart(item)}
          >
            {addingToCart === item.id ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialIcons name="shopping-cart" size={20} color="white" />
                <Text className="text-white ml-2 font-semibold">Add to Cart</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )}
/>


    </View>
  );
}
