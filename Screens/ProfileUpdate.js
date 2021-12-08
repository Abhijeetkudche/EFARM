import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, BackHandler, Alert } from 'react-native';
import { TextInput } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import { Card, Button, Image } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import dbh from "../Config";

const UpdateProfile = ({ navigation }) => {

    //loading

    const [loadingAll, setloadingAll] = useState(true);

    const [load, setload] = useState(true);


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

    //personal details usestate
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [Name, setName] = useState();
    const [Contact, setContact] = useState();

    //Editable TextInputs usestate
    const [editable, seteditable] = useState(false);
    const [editable1, seteditable1] = useState(false);

    //Document Details usestate
    const [Aadhar, setAadhar] = useState();
    const [Ration, setRation] = useState();
    const [LandRights, setLandRights] = useState();
    const [LandInHectors, setLandInHectors] = useState();

    //Event Details
    const [eventTitle, seteventTitle] = useState();
    const [eventOrganizer, seteventOrganizer] = useState();
    const [eventTime, seteventTime] = useState();
    const [eventDate, seteventDate] = useState();

    //storing variables on page load
    // const docd = async () => {
    //         try{
    //             const userAadhar = await AsyncStorage.getItem(STORE_AADHAR);
    //             const userRation = await AsyncStorage.getItem(STORE_RATION);
    //             const userLandRights = await AsyncStorage.getItem(STORE_LANDRIGHTS);
    //             const userLandInHectors = await AsyncStorage.getItem(STORE_LANDINHECTORS);
    //             setAadhar(documentSnapshot.get('aadhar'));
    //             setRation(documentSnapshot.get('ration'));
    //             setLandRights(documentSnapshot.get('landrights'));
    //             setLandInHectors(documentSnapshot.get('landinhectors'));
    //         }
    //         catch(e){console.log(e)}
    // }

    const call = async () => {
        try{
            const userEmail = await AsyncStorage.getItem(STORE_EMAIL);
            const userPass = await AsyncStorage.getItem(STORE_PASSWORD);
            const userName = await AsyncStorage.getItem(STORE_NAME);
            const userContact = await AsyncStorage.getItem(STORE_CONTACT);
            if(userEmail !== "" && userPass !== ""){
                setemail(userEmail);
                setpassword(userPass);
                setpassword(userPass);
                setName(userName);
                setContact(userContact);
            }else{
                alert("Please sign in again")
            }
        }
        catch(e){
            console.log(e)
        }
    }

    //Update Personal Details in USERS and DOCUMETNS
    const updatingProfile = (email, Name, Contact) => {
        dbh.collection('users').doc(email).update({
            name: Name,
            contact: Contact,
        }).then(()=>
            alert("Data Updated...!")
        )

        dbh.collection('documents').doc(email).update({
            contact: Contact
        }).then(()=>
            console.log("Document Doc Updated...!")
        )
    }


    //Updating Document details
    const updatingDocuments = (Aadhar, Ration, LandRights, LandInHectors) => {
        const b = dbh.collection('documents').doc(email).set({
            aadhar: Aadhar,
            ration: Ration,
            '712gutnumber': LandRights,
            landinhectors: LandInHectors
        }).then(
            alert('Documents Updated...!')
        )
    }

    //Documents Details function
    const documentDetails = () => {


      
        
        const docd = dbh.collection('documents').doc(email).onSnapshot(documentSnapshot => {
            console.log("Working Doc")
            setAadhar(documentSnapshot.get('aadhar'));
            setRation(documentSnapshot.get('ration'));
            setLandRights(documentSnapshot.get('712gutnumber'));
            setLandInHectors(documentSnapshot.get('landinhectors'));
        })
    
    }

    //Events Data fetch Function
    const eventsData = () => {

        const evd = dbh.collection('events').doc(email).get().then(
            documentSnapshot => {
                console.log("Working on Events")
                seteventTitle(documentSnapshot.get('title'));
                seteventOrganizer(documentSnapshot.get('organizer'));
                seteventTime(documentSnapshot.get('time'));
                seteventDate(documentSnapshot.get('date'));
            }
        )

    }


    useEffect(() => {
        
        call();
        documentDetails();
        setTimeout(() => {
            setloadingAll(false)
        }, 2000);

        
  }, []);

    if(loadingAll){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 60, height: 60}} source={require("../assets/SpinnerGIF.gif")}/>
            </View>
        )
    }

    else{

    return(
        <View style={styles.mainView}>
        <ScrollView>
            <Card>
                <Card.Title>Personal Details</Card.Title>
                <Card.Divider/>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                        label="Username"
                        underlineColor= '#000'
                        value={email}
                        editable={false}
                        //onChangeText={email=>setemail(email)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="email-outline" color="#000"/>}
                        style={styles.inputs}
                        theme={{colors: {text: '#000'}}}
                    />       
                    <TextInput
                        label="Name"
                        underlineColor= '#000'
                        value={Name}
                        editable={editable}
                        onChangeText={Name=>setName(Name)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="account-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />       
                    <TextInput
                        label="Contact"
                        underlineColor= '#000'
                        value={Contact}
                        editable={editable}
                        onChangeText={Contact=>setContact(Contact)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="phone-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />
                    <Card.Divider/>
                    <View style={{flexDirection:'row'}}>
                    <Button
                        type={"clear"}
                        icon={{
                            name: "edit",
                            size: 15,
                        }}
                        title="Edit"
                        onPress={editable=>seteditable(true)}
                    />
                    <Button
                        type={"clear"}
                        icon={{
                            name: "save",
                            size: 15,
                        }}
                        title="Save"
                        onPress={()=>updatingProfile(email, Name, Contact)}
                    />
                    </View>
                    
                </View>
            </Card>
            <Card>
                <Card.Title>Document Details</Card.Title>
                <Card.Divider/>
                
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                        label="Aadhar Card No."
                        underlineColor= '#000'
                        value={Aadhar}
                        editable={editable1}
                        onChangeText={Aadhar=>setAadhar(Aadhar)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="file-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />       
                    <TextInput
                        label="Ration Card No."
                        underlineColor= '#000'
                        value={Ration}
                        editable={editable1}
                        onChangeText={Ration=>setRation(Ration)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="file-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />       
                    <TextInput
                        label="7/12 Gut Number."
                        underlineColor= '#000'
                        value={LandRights}
                        editable={editable1}
                        onChangeText={LandRights=>setLandRights(LandRights)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="file-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />
                    <TextInput
                        label="Land in Hectors"
                        underlineColor= '#000'
                        value={LandInHectors}
                        editable={editable1}
                        onChangeText={LandInHectors=>setLandInHectors(LandInHectors)}
                        placeholderTextColor= "#000"
                        left={<TextInput.Icon name="shape-outline" color="#000"/>}
                        style={styles.inputs_ne}
                        theme={{colors: {text: '#000'}}}
                    />
                    <Card.Divider/>
                    <View style={{flexDirection:'row'}}>
                    <Button
                        type={"clear"}
                        icon={{
                            name: "edit",
                            size: 15,
                        }}
                        title="Edit"
                        onPress={editable1=>seteditable1(true)}
                    />
                    
                    <Button
                        type={"clear"}
                        icon={{
                            name: "refresh",
                            size: 15,
                        }}
                        title="Refresh"
                        onPress={()=>documentDetails()}
                    />

                    <Button
                        type={"clear"}
                        icon={{
                            name: "save",
                            size: 15,
                        }}
                        title="Save"
                        onPress={()=>updatingDocuments(Aadhar, Ration, LandRights, LandInHectors)}
                    />
                    </View>
                    
                </View>   
                
            </Card>

            
            </ScrollView>
        </View>
    )
    }
}

const styles=ScaledSheet.create({
    mainView: {
        marginBottom: '5@s'
    },
    org: {
        fontWeight: 'bold',
        marginTop: '5@s',
        
    },
    Editbutton: {
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        opacity: 0.5,
        fontWeight: "bold",
        marginTop: 2,
        alignSelf: 'center',
        width: 230,
        marginBottom: '5@s'
    },
    inputs_ne: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        opacity: 0.7,
        fontWeight: "bold",
        marginTop: 2,
        alignSelf: 'center',
        width: 230,
        marginBottom: '5@s'
    },
})

export default UpdateProfile;