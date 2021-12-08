import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { PricingCard } from 'react-native-elements';
import { Button, Card, TextInput, Title } from 'react-native-paper';
import dbh from '../Config';

const ViewCrops = ({ navigation }) => {

    const [crops, setcrops] = useState([]);

    useEffect(() => {
        const s = dbh.collection('kprice').onSnapshot(querySnapshot => {
            const CropsD = [];
    
            querySnapshot.forEach(documentSnapshot => {
                CropsD.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setTimeout(() => {
                setcrops(CropsD); 
            }, 2000);
            //console.log(RealSchemes);
        })
    }, [])

    const renderItem = ({ item }) => (
        <Item name={item.name} link={item.link} price={item.price} />
      );
      
    const removeCrop = (name) => {
        dbh.collection('kprice').doc(name).delete().then(
            alert(name+" Deleted Succesfully")
        )
    }


      const Item = ({ name, link, price }) => {
          return(
                <PricingCard
                    color="#4f9deb"
                    title={name}
                    price={price}
                    info={[<Image style={{height: 40, width: 40}} source={{uri: link}} PlaceholderContent={<Image style={{width: 20, height: 20}} source={require("../assets/SpinnerGIF.gif")}/>}/>]}
                    button={<TouchableOpacity style={styles.remove} onPress={()=>removeCrop(name)}><Text style={styles.txt}>Remove CROP</Text></TouchableOpacity>}
                />

          )
      }
    
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=>navigation.navigate("AdminCropsData")}>
                <Text style={{marginTop: 35, color: '#000', fontWeight: 'bold'}}>Back</Text>
                </TouchableOpacity>
                
            </View>
                <TextInput 
                    label="Enter Crop Name to search"
                    underlineColor= '#000'
                    placeholderTextColor= "#000"
                    left={<TextInput.Icon name="cloud-search" color="#000"/>}
                    style={styles.inputs}
                    theme={{colors: {text: '#000'}}}
                />
            </View>
            <View style={styles.res}>
                
            <FlatList
                
                data={crops}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputs: {
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginTop: 7,
        alignSelf: 'center',
        width: 230,
    },
    top: {
        marginTop: 35,
        alignSelf: 'center',
    },
    res: {
        marginTop: 10,
        width: 400,
        height: 800
    },
    remove: {
        backgroundColor: '#00008B',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    txt: {
        color: '#fff',
        fontWeight: 'bold'
    },
})

export default ViewCrops;