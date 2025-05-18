import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Homescreen";
import Product from "./screens/Productscreen";
import Contact from "./screens/Contactscreen";
import Add from "./screens/AddProduct";
import Update from "./screens/UpdateProduct";
import Login from "./screens/Loginsecreen";
import Signup from "./screens/Signupscreen";
import Detail from "./screens/DetailProduct";
import { CartProvider } from './screens/context/CartContext';
import Cart from "./screens/Cart";
import OrderReview from "./screens/OrderReview";
import Orders from "./screens/Orders";
import OrderDetail from './screens/OrderDetail';
import ReviewScreen from "./screens/ReviewScreen";
import ReviewUpdate from "./screens/ReviewUpdate"

const App = () => {
    
    const Stack = createNativeStackNavigator();

    return (
        <CartProvider>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
             <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Update" component={Update} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="OrderReview" component={OrderReview} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="ReviewUpdate" component={ReviewUpdate} />
          </Stack.Navigator>
        </NavigationContainer>
        </CartProvider>
      );
    
}


export const IP = `http://192.168.100.85`;
export default App;