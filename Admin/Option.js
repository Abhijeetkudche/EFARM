import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, Button, ToastAndroid, FlatList } from 'react-native';
import dbh from '../Config';

const Options = () => {

    const [crops, setcrops] = useState([]);

    const [selectedValue, setSelectedValue] = useState("kprice");

    const mpr = () => {
        const getsd = dbh.collection('mprices').onSnapshot(querySnapshot => {
            const gotd1=[];

            querySnapshot.forEach(documentSnapshot=>{
                gotd1.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setcrops(gotd1);
            
        });
    }
     
    const kpr = () => {

        const getsda = dbh.collection('kprices').onSnapshot(querySnapshot => {
            const gotd2=[];

            querySnapshot.forEach(documentSnapshot=>{
                gotd2.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setcrops(gotd2);
            console.log(gotd2)
        });
    }

    const stpr = () => {

        const getsdaf = dbh.collection('stprices').onSnapshot(querySnapshot => {
            const gotd3=[];

            querySnapshot.forEach(documentSnapshot=>{
                gotd3.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setcrops(gotd3);
            console.log(gotd3)
        });
    }

    useEffect(() => {

    }, [])

    const gettingCrops = (sel) => {
        if(sel=="kprice"){
            kpr()
        }
        else if(sel=="mprice"){
            mpr()
        }
        else if(sel=="stprice"){
            stpr()
        }
        else{
            alert("Sorry...!")
        }
        callOption(sel)
    }

    const callOption = (sel) => {
        ToastAndroid.show("You have selected "+sel+" optipn",ToastAndroid.SHORT)
        return(
            <View style={{flex: 1}}>
                <FlatList data={crops} renderItem={renderItem} keyExtractor={item=>item.key} />
            </View>
        )
    }

    const Item = ({ nm, kprice, sprice, stprice }) => {
        return(
            <View>
            
                        <Text style={styles.title}>Price</Text>
               
            </View>
        )
    }

    const renderItem = ({ item }) => {
        <Item nm={item.Name} kprice={item.kprice} sprice={item.sprice} stprice={item.stprice} />
    }

return(
    <View style={styles.Options}>
        <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label="Kolhapur" value="kprice" />
            <Picker.Item label="Sangli" value="mprice" />
            <Picker.Item label="Satara" value="stprice" />
        </Picker>
        <Button title="Go" onPress={()=>gettingCrops(selectedValue)}/>
        <View>
        </View>
    </View>
)}

const styles=StyleSheet.create({
    Options: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default Options;
