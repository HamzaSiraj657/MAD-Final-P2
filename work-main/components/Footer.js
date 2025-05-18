import React from "react";
import {View,Text,StyleSheet} from "react-native";



const Footer = () => {


    return(
        <View style={styles.footer}>
            <Text style={styles.tfooter}>© 2025 Product Shopping. All rights reserved.</Text>
        </View>
    );
}

export default Footer;

const styles = StyleSheet.create({
    footer:{
        
        flex:0,
        justifyContent:'flex-end',
        width:"100%",   
        padding:10,
        backgroundColor:"#d3d3d3"
    },
    tfooter:{
        color:"white",
        fontSize:15,
        textAlign:"center"
    }
})