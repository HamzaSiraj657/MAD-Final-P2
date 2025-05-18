import React from "react";
import {View , StyleSheet , Button , Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () =>{
const navigation = useNavigation();

return(
    <View style={styles.container}>
        <Header title={"Lots of Get Shopping"}/>
        <Image
            style={styles.img}
            source={{uri:"https://img.freepik.com/premium-photo/black-friday-collage-featuring-mix-product-im-00044-03_883586-169718.jpg?semt=ais_hybrid&w=740"}}
        />
        <View style={styles.Btn}>
        
            <Button 
                title="Product View" onPress={() => navigation.navigate('Product')}
            />
            <Button 
                title="ContactPage" onPress={() => navigation.navigate('Contact')}
            />
            
        </View>
        <Footer/>
    </View>
);
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    Btn:{
        flex:1,
        justifyContent:'flex-start',
        padding:60,
        gap:10,
       
    },
    img:{
        width:"100%",
        height: 200,
 
    }
})
