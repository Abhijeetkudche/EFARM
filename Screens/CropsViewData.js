import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Touchable, TouchableOpacity, ToastAndroid } from 'react-native';
import { Image, PricingCard } from 'react-native-elements';
import { Card,DataTable } from 'react-native-paper';
import dbh from '../Config';

const CropViewData = () => {

    const [Crops, setCrops] = useState([]);
    const [Crops1, setCrops1] = useState([]);
    const [Crops2, setCrops2] = useState([]);

    const kpr = () => {

        const getsda = dbh.collection('kprices').onSnapshot(querySnapshot => {
            const gotd2=[];

            querySnapshot.forEach(documentSnapshot=>{
                gotd2.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setCrops(gotd2);
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
            setCrops1(gotd3);
            
        });
    }
    const mpr = () => {
        const getsd = dbh.collection('mprices').onSnapshot(querySnapshot => {
            const gotd1=[];

            querySnapshot.forEach(documentSnapshot=>{
                gotd1.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setCrops2(gotd1);
            
        });
    }
     
            
    

    useEffect(() => {
        
        kpr()
        stpr()
        mpr()
        
    }, [])

    

    const renderItem = ({ item }) => (
        <Item name={item.name} link={item.link} price={item.price} />
      );

      const Item = ({ name, link, price }) => {
        const toastCall = ({name, price}) => {
            ToastAndroid.show(name+" Crop of Rs."+price+".",ToastAndroid.SHORT)
        }
        return(
              <View style={{alignItems: "center", marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity onPress={()=>toastCall({name, price})}>
                <Card mode={'outlined'} style={{height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 14, fontStyle: 'italic'}}>{name}</Text>
                  <Image source={{uri: link}} style={{height: 40, width: 40}} />
                  <Text style={{fontSize: 14, fontStyle: 'italic'}}>{price}</Text>
                </Card>
                </TouchableOpacity>
              </View>

        )
    }

  return(
    <View style={{flex: 1, alignItems: "center"}}>
        <View style={{alignItems: 'center', justifyContent: 'center',height: 40, width: '100%',backgroundColor: '#228B22'}}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>CROPS INFORMATION</Text>
        </View>
        <View style={{justifyContent: 'center',flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCDCDC'}}>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{alignSelf: 'flex-start', paddingLeft: 25}}>KOLHAPUR</DataTable.Title>
                <DataTable.Title style={{alignSelf: 'center', paddingLeft: 10}}>SANGLI</DataTable.Title>
                <DataTable.Title style={{marginRight: -55}}>SATARA</DataTable.Title>
            </DataTable.Header>
        </DataTable>
            </View>
            <View style={{flexDirection: 'row'}}>
            <FlatList
                data={Crops}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            <FlatList    
                data={Crops1}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            <FlatList    
                data={Crops2}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            </View>
    </View>
)};

export default CropViewData;
