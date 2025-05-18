import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert , Text , TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import { IP } from "../App";

const Signup = () => {
  const navigation = useNavigation();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignup = async () => {
  if (!Email.endsWith('@gmail.com')) {
    Alert.alert('Invalid Email', 'Only Gmail addresses are allowed (must end with @gmail.com)');
    return;
  }

  if (!Email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    const res = await fetch(`${IP}:3000/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      Alert.alert('Success', data.message || 'User registered!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      Alert.alert('Error', data.error || 'Signup failed');
    }
  } catch (error) {
    Alert.alert('Network Error', error.message);
  }
};


  return (
<View style={styles.container}>
<View style={styles.formContainer}>
<TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail} />
<TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
<Button title="SignUp" onPress={handleSignup} />
<TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={styles.lo}>Go to Login</Text>
</TouchableOpacity>
</View>
<Footer />
</View>
);
};

export default Signup;

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