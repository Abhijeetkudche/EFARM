import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import dbh from '../Config';

const AdminCropsData = ({ navigation }) => {

    const [CropName, setCropName] = useState();
    const [CropPriceK, setCropPriceK] = useState();
    const [CropPriceST, setCropPriceST] = useState();
    const [CropPriceS, setCropPriceS] = useState();
    const [CropImgLink, setCropImgLink] = useState();


    const AddCrop = (CropName, CropImgLink, CropPriceK, CropPriceS, CropPriceST) => {
        if(CropName == null){
            alert("Enter Crop Name")
        }
        else if(CropPriceK == null){
            alert("Enter Crop Price for Kolhapur")
        }
        else if(CropImgLink == null){
            alert("Enter Crop Image Link")
        }
        else if(CropPriceS == null){
            alert("Enter Crop price for Sangli")
        }
        else if(CropPriceST == null){
            alert("Enter crop price for satara")
        }
        else{
            const adding1 = dbh.collection('mprices').doc(CropName).set({
                name: CropName,
                link: CropImgLink,
                price: CropPriceS
            }).then(
                setCropPriceS(""),
                
            )
            const adding2 = dbh.collection('kprices').doc(CropName).set({
                name: CropName,
                link: CropImgLink,
                price: CropPriceK
            }).then(
                
                setCropPriceK(""),
                
            )
            const adding3 = dbh.collection('stprices').doc(CropName).set({
                name: CropName,
                link: CropImgLink,
                price: CropPriceST
            }).then(
                setCropName(""),
                setCropPriceST(""),
                setCropImgLink("")                
            )
            
        }
    }

    return(
        <View>
      
        <ImageBackground
        style={styles.coverImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
        }}>
        <TouchableOpacity onPress={()=>navigation.navigate("AdminHome")}>
        <Text style={{marginTop: 30, marginLeft: 15, color: '#000', fontWeight: 'bold'}}>Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
            
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', borderColor: '#00FF00', borderRadius: 1}}>ADD CROP</Text>
                <TextInput
                    label="Crop Name"
                    value={CropName}
                    underlineColor= '#000'
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="account-outline" color="#000"/>}
                    onChangeText={CropName => setCropName(CropName)}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Crop Image Link"
                    underlineColor= '#000'
                    value={CropImgLink}
                    keyboardType={'url'}
                    onChangeText={CropImgLink => setCropImgLink(CropImgLink)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="image-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Crop Rate for Kolhapur"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={CropPriceK}
                    onChangeText={CropPriceK=>setCropPriceK(CropPriceK)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="tag-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Crop Rate for Sangli"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={CropPriceS}
                    onChangeText={CropPriceS=>setCropPriceS(CropPriceS)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="tag-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
                <TextInput
                    label="Crop Rate for Sangli"
                    keyboardType={'number-pad'}
                    underlineColor= '#000'
                    value={CropPriceST}
                    onChangeText={CropPriceST=>setCropPriceST(CropPriceST)}
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="tag-outline" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />

                <TouchableOpacity style={styles.add} onPress={()=>AddCrop(CropName, CropImgLink, CropPriceK, CropPriceS, CropPriceST)}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>ADD</Text>
                </TouchableOpacity>
             
                </View>
            </View>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: '100%',
      },
    inputs: {
        backgroundColor: '#F0FFFF',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: 7,
        alignSelf: 'center',
        width: 230,
        opacity: 0.9
    },
    add: {
        marginTop: 20,
        backgroundColor: '#DC143C',
        width: 90,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    viewc: {
        marginTop: 20,
        backgroundColor: '#20B2AA',
        width: 120,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
})

export default AdminCropsData;
