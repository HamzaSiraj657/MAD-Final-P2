import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../components/Footer";
import { IP } from "../App";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Update = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, name: initname, description: initdescription, price: initprice, image: initimage } = route.params;

  const [name, setname] = useState(initname);
  const [description, setdescription] = useState(initdescription);
  const [price, setprice] = useState(initprice.toString());
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(initimage);

  const pickImage = () => {
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

  const UpdateProduct = async () => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  if (image) {
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.name,
    });
  }

    await fetch(`${IP}:3000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`, },
      body: formData,
      
    });
    Alert.alert('Product updated');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.addcon}>
        <TextInput style={styles.addtext} placeholder="Product Name" value={name} onChangeText={setname} />
        <TextInput style={styles.addtext} placeholder="Product Price" value={price} onChangeText={setprice} />
        <TextInput style={[styles.addtext, styles.textarea]} placeholder="Product Description" value={description} onChangeText={setdescription} />

        {image ? (
          <Image source={{ uri: image.uri }} style={styles.preview} />
        ) : existingImage ? (
          <Image source={{ uri: `${IP}:3000/uploads/${existingImage}` }} style={styles.preview} />
        ) : null}

        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.pickbtn}>Pick Image</Text>
        </TouchableOpacity>

        <Button title="Update Product" onPress={UpdateProduct} />
      </View>
      <Footer />
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: { flex: 1 },
  addcon: { flex: 1, padding: 20, gap: 10 },
  addtext: { borderWidth: 1, borderColor: "lightgrey" },
  textarea: { height: 100 },
  preview: { width: 200, height: 200, marginVertical: 10 },
  pickbtn: {
    backgroundColor: "gray",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
  },
});
