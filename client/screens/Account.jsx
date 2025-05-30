import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import HeaderMenu from '../components/Menus/HeaderMenu'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // นำเข้า MaterialIcons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'

const Account = () => {
    //global state
    const [authState, setAuthState] = useContext(AuthContext)
    const { user } = authState

    //logout
    const handleLogout = async () => {
        setAuthState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        alert("Logout Successfully")
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
               
                <View style={styles.textContainer}>
                    <Text style={styles.username}> {authState?.user.name}  {authState?.user.surname} </Text>
                    <Text style={styles.idcard}> เบอร์โทรศัพท์ : {authState?.user.tel} </Text>
                    <Text style={styles.idcard}> รหัสบัตรประจำตัวประชาชน :  {authState?.user.ID_card_number}</Text>
                    <Text style={styles.idcard}> Email : {authState?.user.email}</Text>

                </View>
            </View>

            <View style={styles.information}>

            <View style={styles.infoHeader}>
       
    </View>
               

                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="sign-out-alt" color="#87CEFA" size={20}  style={styles.icon}/>
                        <Text style={styles.menuItemTextsignout}>ออกจากระบบ</Text>

                    </View>
                </TouchableOpacity>
           
            </View>

            

            <FooterMenu />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
       
       
        
    },
    textContainer: {
        marginLeft: 10
    },
   
    username: {
        fontSize: 20,
        color: "black",
        fontFamily:"Kanit",
        
    },
    idcard: {
        color: "black",
        marginTop: 10,
        fontSize: 13,
        fontFamily:"Kanit"
    },
    information: {
        paddingHorizontal: 30,
        marginBottom: 25,
        padding:10,
        borderRadius:10,
        backgroundColor: "#fff",
        marginTop:0

      
    },
    cardText: {
        fontSize: 14,
        padding:0,
        lineHeight: 26,
        fontFamily:"Kanit",
        

        
    },
    menuWrapper:{
        marginTop:70,
        alignItems: "center", // จัดเรียงขอบเขตในแนวแกนนอน
        flex: 1, // ยืดขยายให้เต็มพื้นที่ที่เหลือ
       

    },
    menuItem:{
    flexDirection: 'row',
    backgroundColor:"white",
    width:200,
    marginTop:13,
    height:42,
    borderColor:"#87CEFA",
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center"


    },
    menuItem:{
    flexDirection: 'row',
    padding:15,
    
 
    },
    menuItemText: {
        color: '#87CEFA',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily:"Kanit",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        
      },
      menuItemTextsignout:{
        color: 'black',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily:"Kanit",
        flex: 1, // ข้อความตรงกลาง (right) ครอบคลุมพื้นที่ทางฝั่งขวาของ container

      },
      infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // จัดการส่วนเว้นวรรคระหว่างองค์ประกอบ
        borderBottomWidth:0.7,
        paddingBottom:10,
        borderColor:"#D4EFFF",
        margin:5

    },
    infoHeaderText: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: "Kanit",
    },
    right: {
        marginLeft: 'auto', // ตั้งให้ right อยู่ชิดหน้าจอฝั่งขวา
    },
    
})


export default Account
