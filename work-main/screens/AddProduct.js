import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import Footer from "../components/Footer";
import { IP } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Add = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState('');
  const [image, setImage] = useState(null);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const asset = response.assets[0];
        setImage({
          uri: asset.uri,
          name: asset.fileName || 'photo.jpg',
          type: asset.type || 'image/jpeg',
        });
      }
    });
  };

  const AddProduct = async () => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    await fetch(`${IP}:3000/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${token}`, },
      body: formData,
       
    });

    Alert.alert('Product added');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.addcon}>
        <TextInput
          style={styles.addtext}
          placeholder="Product Name"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          style={styles.addtext}
          placeholder="Product Price"
          value={price}
          onChangeText={setprice}
        />
        <TextInput
          style={[styles.addtext, styles.textarea]}
          placeholder="Product Description"
          value={description}
          onChangeText={setdescription}
        />
        <Button title="Select Image" onPress={selectImage} />
        {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
        <Button title="Add Product" onPress={AddProduct} />
      </View>
      <Footer />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: { flex: 1 },
  addcon: { flex: 1, padding: 20, gap: 10 },
  addtext: { borderWidth: 1, borderColor: "lightgrey" },
  textarea: { height: 100 },
});
