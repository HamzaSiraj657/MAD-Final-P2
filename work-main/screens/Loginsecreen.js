import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert , Text ,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IP } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
const navigation = useNavigation();
const [Email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await fetch(`${IP}:3000/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userRole", data.user.role);
       await AsyncStorage.setItem("Email", Email);

      Alert.alert("Login successful");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], 
      });
    } else {
      Alert.alert("Error", data.error || "Login failed");
    }
  } catch (error) {
    Alert.alert("Network Error", error.message);
  }
};


return (
<View style={styles.container}>
<View style={styles.formContainer}>
<TextInput placeholder="Email" value={Email} onChangeText={setEmail} style={styles.input} />
<TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
<Button title="LogIn" onPress={handleLogin} />
<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
  <Text style={styles.lo}>Go to Signup</Text>
</TouchableOpacity>
</View>
</View>
);
}

export default Login;

const styles = StyleSheet.create({
container: {
flex: 1
},
formContainer: {
flex: 1,
padding: 20,
gap: 10
},
input: {
borderWidth: 1,
borderColor: "lightgrey",
padding: 10
},
lo:{
    color:'blue',
    fontSize: 20,
    textAlign:'center',
    textDecorationColor:'blue',
    textDecorationLine:'underline',

}
});