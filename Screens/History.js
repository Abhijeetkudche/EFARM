import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import dbh from '../Config';

const History = () => {

    const [store, setstore] = useState([]);

    const datee="22 Nov, 2021";
    const doctEmail="doctorabhi@gmail.com";

    useEffect(() => {  
        addDoctorHistory()
    },)

    const addDoctorHistory = () => {
        const data = dbh.collection('slothistory').doc(datee).collection('HistoryDoctors').doc(doctEmail).collection('MRVisits').onSnapshot(querySnapshot => {
            const arret=[];
            querySnapshot.forEach(documentSnapshot => {
                arret.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
                // console.log(documentSnapshot.get('name'))
                // console.log(arret)
                setstore(arret)
            })
        })
 
    }

    const Item = ({name}) => {
        return(
            <View>
            <Card style={{paddingTop: 20, paddingBottom: 20}}>
                <Button title={name}/>
            </Card>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <Item name={item.name} />
      );

    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <FlatList
                data={store}
                renderItem={renderItem}
                keyExtractor={item=>item.key}
            />
        </View>
    )
}

export default History;