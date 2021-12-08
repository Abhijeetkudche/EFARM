import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Clipboard, ToastAndroid, Linking} from 'react-native';
import { Card } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import dbh from '../Config';
import { Icon } from 'react-native-elements';

const AdminValidateUser = ({ navigation }) => {

    const [pendingUsers, setpendingUsers] = useState([]);

    const [pendingDoc, setpendingDoc] = useState([]);

    // const em="";

    useEffect(() => {
        const pu = dbh.collection('users').where('vs', '==', '0').onSnapshot(querySnapshot=>{
            const pendUs=[]
            
            querySnapshot.forEach(documentSnapshot=>{
                pendUs.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
                console.log("Wait wait",documentSnapshot.data())
                // em = documentSnapshot.id
                console.log("ID : ",documentSnapshot.id)
            })
            setpendingUsers(pendUs)
        
        })

        const pu1 = dbh.collection('documents').where('vs','==','0').onSnapshot(querySnapshot=>{
            const pendDocuments=[]
            
            querySnapshot.forEach(documentSnapshot=>{
                pendDocuments.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
                //console.log()
            })
            setpendingDoc(pendDocuments)
        
        })

    }, [])

    const verifyUser = (email) => {
        const verify=dbh.collection('users').doc(email).update({
            verification_status: 'Verified',
            vs: 1
        }).then(
            ToastAndroid.show("User Verified Succesfully...!",ToastAndroid.SHORT)
        )
        const verify1=dbh.collection('documents').doc(email).update({
            verification_status: 'Verified',
            vs: 1
        }).then(
            setTimeout(() => {
                ToastAndroid.show("Documents of User Verified Succesfully...!",ToastAndroid.LONG)    
            }, 2000)
        )
    }

    // const onClip = () =>{
    //     Clipboard.setString("Hello")
    //     ToastAndroid.show("Text Copied...!",ToastAndroid.SHORT)
    // }

    // const refRBSheet = useRef();

    // const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;

    const onClip = (aadhar) => {
        Clipboard.setString(aadhar)
        ToastAndroid.show("Aadhar Number copied succesfully...!", ToastAndroid.SHORT)
    }

    const Item = ({ em, gutnumber, aadhar, landinhectors, ration }) => {



        return(
            <View>
            <Card mode="outlined">
                <Card.Content>
                    <View style={styles.card}>
                   
                        <Text style={styles.title}>7/12 Gut Number : {gutnumber}</Text>
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>onClip(aadhar)}>
                            <Text style={styles.shortdesc}>Aadhar Number : {aadhar}</Text>
                            <Icon name="content-copy" size={16} style={{marginTop: 7, marginLeft: 5}} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Land in Hectors : {landinhectors}</Text>
                        <Text style={styles.title}>Ration Card No : {ration}</Text>
                        <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'green', paddingTop:10, marginTop: 10, paddingLeft:20, paddingRight:20, paddingBottom:10, marginRight: 10}} onPress={()=>Linking.openURL("https://resident.uidai.gov.in/verify")}>
                            <Text style={{ alignItems: 'center', color:'white', fontWeight:'bold'}}>Validate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'red', paddingTop:10, marginTop: 10, paddingLeft:20, paddingRight:20, paddingBottom:10}} onPress={()=>verifyUser(em)}>
                            <Text style={{ alignItems: 'center', color:'white', fontWeight:'bold'}}>Verify</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            {/* <RBSheet
                            ref={refRBSheet}
                            height={300}
                            duration={250}
                            animationType={'slide'}
                            customStyles={{
                                container: {
                                justifyContent: "center",
                                alignItems: "center"
                                }
                            }}
                            >
                            
                            <Text>{name}</Text>
                        </RBSheet> */}
                        </View>
    )}

    const renderItem = ({ item }) => (
        <Item em={item.email} gutnumber={item.gutnumber} aadhar={item.aadhar} landinhectors={item.landinhectors} ration={item.ration} />
      );

    return(
        <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('AdminHome')}>
                <Text style={{marginTop: 50, marginLeft: 15, fontWeight: 'bold'}}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.Text}>Pending Users</Text>
        </View>
            <View>
                <FlatList data={pendingDoc} renderItem={renderItem} keyExtractor={item=>item.key} />
            </View>
        </View>
)}

const styles = ScaledSheet.create({
    
    Text: {
        marginTop: '45@s',
        fontSize: '12@s',
        fontWeight: 'bold',
        marginBottom: '20@s',
        marginLeft: '90@s'
    },
    newList: {

    },
    shortdesc: {
        marginLeft: '8@s',
        marginTop: '5@s',
        fontWeight: 'bold'
      },
    title: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginTop: 5
      },
      card: {
       height: 180,
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: '10@s',
       marginBottom: '10@s'
    },
})

export default AdminValidateUser;
