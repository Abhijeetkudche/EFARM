import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, View, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dbh from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet } from 'react-native-size-matters';
// import LinearGradient from 'react-native-linear-gradient';

const LoginEF = ({ navigation }) => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);

    //checking if user is logged in or not
    // const [CheckUser, setCheckUser] = useState('')

    //users
    const STORE_EMAIL = '@save_email';
    const STORE_PASSWORD = '@save_password';
    const STORE_NAME = '@save_name';
    const STORE_CONTACT = '@save_contact';

    //documents
    const STORE_AADHAR = '@save_aadhar';
    const STORE_RATION = '@save_ration';
    const STORE_LANDRIGHTS = '@save_landrights';
    const STORE_LANDINHECTORS = '@save_landinhectors';

    //loading
    const [load, setload] = useState(false);

    const loginfarmerbyclick = (email, password) => {

        if(email==""){
            alert("No email found");
            if(password==""){
                alert("Please enter credentials")
            }
        }
        else{
            const authentic=dbh.collection("users").doc(email).get().then(
                documentSnapshot => authenticateNow(documentSnapshot, email, password)
            )
        }
    }

    const authenticateNow = async (documentSnapshot, email, password) => {
        setloading(true);
        

        if(email===documentSnapshot.get("email") && password===documentSnapshot.get("password")){
            setloading(false);

            alert("Logged In succesfully");
            
            //storing credentials in AsyncStorage
            try{
                //personaldetails
                await AsyncStorage.setItem(STORE_EMAIL, documentSnapshot.get("email").toString());
                await AsyncStorage.setItem(STORE_PASSWORD, documentSnapshot.get("password").toString());
                await AsyncStorage.setItem(STORE_NAME, documentSnapshot.get("name").toString());
                await AsyncStorage.setItem(STORE_CONTACT, documentSnapshot.get("contact").toString());
                
            }
            catch(e){
                console.log("Async type error : ",e)
            }

            navigation.navigate("Drawer");
        }
        else{
            alert("Check credentials")
        }
    }


    useEffect(() => {


        getData();
        // const backAction = () => {
        //   Alert.alert("Exit App!", "Are you sure you want to Exit?", [
        //     {
        //       text: "Cancel",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "YES", onPress: () => BackHandler.exitApp() }
        //   ]);
        //   return true;
        // };
    
        // const backHandler = BackHandler.addEventListener(
        //   "hardwareBackPress",
        //   backAction
        // );
    
        // return () => backHandler.remove();
      }, []);
        

        // if(STORE_EMAIL=="@save_email" && STORE_PASSWORD=="@save_password" && STORE_NAME=="@save_name" && STORE_CONTACT=="@save_contact"){
        //     alert("Suceesfully waited")
        // }
        // else{
        //     alert("Suceesfully wasted")
        // }
    

    const getData = async () =>  {
        try{
            AsyncStorage.getItem(STORE_EMAIL)
            .then(value => {
                if(value!=null){
                    navigation.navigate('LoggingIn')
                }
            })
        }
        catch(error){
            console.log("Shared Prefference error : ",error)
        }
    }

    

    // const doc = async ( documentSnapshot ) => {
    //     //documentdetails
      
    //     await AsyncStorage.setItem(STORE_AADHAR, documentSnapshot.get("aadhar").toString());
    //     await AsyncStorage.setItem(STORE_RATION, documentSnapshot.get("ration").toString());
    //     await AsyncStorage.setItem(STORE_LANDRIGHTS, documentSnapshot.get("landrights").toString());
    //     await AsyncStorage.setItem(STORE_LANDINHECTORS, documentSnapshot.get("landinhectors").toString());

    //     console.log(STORE_RATION)

    // }

    //calling doc() from btn sbmt
    // const calls = (email) => {
    //     const dc = dbh.collection('documents').doc(email).get().then(
    //         documentSnapshot => doc(documentSnapshot)
    //     )
    // }



    return(
        <ScrollView style={{backgroundColor: "#46F34B"}}>
        <View style={{backgroundColor: '#46F34B'}}>
        <View style={styles.main}>
            <View>
                <Image source={require("../assets/log_page.png")} style={styles.image}
                      PlaceholderContent={<Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>}
                />
            </View>
        </View>

            {/* <LinearGradient colors={['#46F34B', '#33EAEA']}>     */}
            <View style={styles.login}>
                {/* <Text style={styles.admin}>Admin</Text> */}
                <View style={styles.login}>
                    <Text style={styles.login1}>LOGIN</Text>
                    <Image source={require("../assets/line_4.png")} style={{height: 4,width: 55, marginTop: 15, marginBottom: 20}}/>
                    <TextInput
                        label="Email"
                        underlineColor= '#000'
                        value={email}
                        onChangeText={email=>setemail(email)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="account-outline" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                    
                    <TextInput
                        label="Password"
                        secureTextEntry={true}
                        underlineColor= '#000'
                        value={password}
                        onChangeText={password=>setpassword(password)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="lock-outline" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />
                </View>
                <View style={styles.login}>
                    <View>
                        <TouchableOpacity onPress={()=>loginfarmerbyclick(email, password)} style={styles.submit}>
                            <Text style={styles.login1}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.login2}>
                       
                        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                            <Text style={styles.aft_submit}>Don't have an account? Create New!</Text>
                        </TouchableOpacity>
                        <Image source={require("../assets/line_4.png")} style={{height: 4,width: 75, marginTop: 15}}/>
                        <TouchableOpacity onPress={()=>navigation.navigate("AdminLogin")}>
                            <Text style={styles.aft_submit1}>Login as a Admin? Click Here!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    {/* <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                        <Image source={require("../assets/group_3.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                        <Image source={require("../assets/group_38.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                        <Image source={require("../assets/group_39.png")} style={{height: 60,width: 75, marginTop: 15}}/>
                    </View> */}
            </View>

                {/* </LinearGradient> */}
        </View>
        </ScrollView>

)};

const styles=ScaledSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
    },
    image: {
        height: '275@s',
        width: '350@s',
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: 7,
        alignSelf: 'center',
        marginBottom: '10@s',
        width: 230,
    },
    
    aft_submit: {
        marginTop: '15@s',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: '9@s'
    },
    aft_submit1: {
        marginTop: '20@s',
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: '10@s'
    },
    styled_input: {
        width: 90
    },
    space: {
        marginTop: 30
    },
    submit: {
        width: 113,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        backgroundColor: '#3D15FF',
        marginBottom: '15@s'
    },
    login: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '32@s',
        backgroundColor: '#46F34B'
    },
    login1: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    login2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    admin: {
        marginLeft: '280@s',
    },
    error: {
        marginTop: 10,
        color: 'red'
    },
})

export default LoginEF;