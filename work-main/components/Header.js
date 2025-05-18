import React from "react";
import {View , Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = ({title}) =>{
const navigation = useNavigation();
 const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

    return(
        <View style={styles.header}>
            <Text style={styles.htext}>{title}</Text>
           <View style={styles.row}>
             <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.out}>Logout</Text>
        </TouchableOpacity>
           </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header:{
        
        backgroundColor:'darkblue',
        width:"100%",
        padding:10,
        flexDirection :'row',
    
    },
    htext:{
        textAlign:'center',
        fontSize:20,
        color:'white',
        marginLeft:110,
        marginTop:7
        
    },
    out:{
        backgroundColor:'darkred',
        color:'white',
        width:70,
        height:40,
        textAlign:'center',
        paddingTop:7,
        fontSize: 17
    },
    row:{
        flex:1,
        flexDirection:'row',
        marginLeft:50
    }
});