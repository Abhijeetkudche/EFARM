import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import dbh from '../Config';

const VerificationPage = ({ navigation }) => {
    
    //loading
    const [loadingAll, setloadingAll] = useState(true);

    const STORE_EMAIL = '@save_email';
    const STORE_PASSWORD = '@save_password';

    //for user documents
    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    //for updating documents
    const [aadhar, setaadhar] = useState();
    const [ration, setration] = useState();
    const [gutno, setgutno] = useState();
    const [land, setland] = useState();

    //user info
    // const [name, setname] = useState();
    // const [emaild, setemaild] = useState();
    // const [contact, setcontact] = useState();

    // const callself = (userEmail) => {
    //     const fetchd = dbh.collection('documents').doc(userEmail).onSnapshot(documentSnapshot=>{
    //         setname(documentSnapshot.get('name'))
    //         setemaild(documentSnapshot.get('email'))
    //         setcontact(documentSnapshot.get('contact'))
    //     })
    // }

   
    const call = async () => {
        try{
            const userEmail = await AsyncStorage.getItem(STORE_EMAIL);
            const userPass = await AsyncStorage.getItem(STORE_PASSWORD);
            if(userEmail !== "" && userPass !== ""){
                setemail(userEmail);
                setpassword(userPass);
                // callself(userEmail)
            }else{
                alert("Please sign in again")
            }
        }
        catch(e){
            console.log(e)
        }
    }

    const UploadDet = (aadhar, ration, gutno, land) => {

        var regexp=/^(\d{12})$/;
        console.log(regexp.test(aadhar))
        if(regexp.test(aadhar)){
            ToastAndroid.show("Aadhar Card valid",ToastAndroid.SHORT);
            const a = dbh.collection('documents').doc(email).set({
                aadhar: aadhar,
                ration: ration,
                '712gutnumber': gutno,
                landinhectors: land,
                verification_status: 'Not Verified',
                vs: 0
            }).then(
                alert("All Details Saved in "+email)
            )
        }else{
            ToastAndroid.show("Not valid",ToastAndroid.SHORT);
        }
    }



    useEffect(() => {
        
        call();

        setTimeout(() => {
            setloadingAll(false)
        }, 2000);

    }, [])


    if(loadingAll){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../assets/SpinnerGIF.gif')} style={{height: 60, width: 60}} />
            </View>
        )
    }
    else{

    return(
    <ScrollView>
    <View style={styles.vc}>
        {/* <View style={{flexDirection: 'row', height: 45, backgroundColor: '#808080'}}>
            <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.back}>
                <Icon name='arrow-back' size={20} color={"#fff"} />
            </TouchableOpacity>
            <Text style={styles.documentVerification}>Document Verification</Text>
        </View> */}
       
        <View>
        <Card>
                <Card.Title>Aadhar Card</Card.Title>
                <TextInput
                    label="Aadhar Card"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={aadhar}
                    onChangeText={aadhar=>setaadhar(aadhar)}
                    placeholder={'6791 9321 XXXX'}
                    placeholderTextColor= "#808080"
                    left={<TextInput.Icon name="card-account-details" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                    maxLength={12}
                                        
                />
                    
            </Card>
        </View>
        <View>
        <Card>
                <Card.Title>Ration Card</Card.Title>
                <TextInput
                    label="Ration Card"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={ration}
                    onChangeText={ration=>setration(ration)}
                    placeholder={'044000000092'}
                    placeholderTextColor= "#808080"
                    left={<TextInput.Icon name="cards" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                    maxLength={6}
                />
                  
            </Card>
        </View>
        <View>
            <Card>
                <Card.Title>7/12 Gut Number</Card.Title>
                <TextInput
                    label="Gut Number"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={gutno}
                    onChangeText={gutno=>setgutno(gutno)}
                    placeholder={'1249029301'}
                    placeholderTextColor= "#808080"
                    left={<TextInput.Icon name="newspaper-variant-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                    maxLength={8}
                />
                 
            </Card>
        </View>
        <View>
        <Card>
                <Card.Title>Land In Hectors</Card.Title>
                <TextInput
                    label="Land"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={land}
                    onChangeText={land=>setland(land)}
                    placeholder={'2'}
                    placeholderTextColor= "#808080"
                    left={<TextInput.Icon name="map-marker-radius-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                
            </Card>
            <TouchableOpacity style={styles.upload} onPress={()=>UploadDet(aadhar, ration, gutno, land)}>
                        <Text style={styles.documentStatus}>Upload Now</Text>
                    </TouchableOpacity>
        </View>
        
    </View>
    </ScrollView>
    )
    }
}

const styles=ScaledSheet.create({
    main: {
        justifyContent: 'center',
        marginTop: "15@s"
    },
    vc: {
        alignContent: 'center'
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: '4@s',
        alignSelf: 'center',
        width: 230,
    },
    back: {
        backgroundColor: '#808080',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 30,
        height: 30,
    },
    upload: {
        height: '30@s',
        width: '90@s',
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20@s',
        alignSelf: 'center',
        borderRadius: '8@s'
    },
    gap: {
        marginLeft: 65,
        marginTop: 15,
    },
    documentStatus: {
        fontSize: '11@s',
        color: '#fff',
        fontWeight: 'bold'
    },
    documentVerification: {
        margin: 14,
        alignSelf: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff'
    },
})

export default VerificationPage;