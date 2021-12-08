import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet , ScrollView, TouchableOpacity, FlatList, StatusBar, Touchable, ImageBackground } from 'react-native'; 
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import dbh from '../Config';
import SelectDropdown from 'react-native-select-dropdown'
import { ScaledSheet } from 'react-native-size-matters';
import { Overlay } from 'react-native-elements';

const AdminHome = ({ navigation }) => {
  
//   const [RealUsers, setRealUsers] = useState([]);
  
  const [RealExprt, setRealExprt] = useState([]);

  // //to change its content
  // const [name, setname] = useState()
  // const [surname, setsurname] = useState()
  // const [status, setstatus] = useState()

  // const [visible, setVisible] = useState(false);
  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // };


    useEffect(() => {

        const s = dbh.collection('experts').onSnapshot(querySnapshot => {
            const RealExperts = [];
    
            querySnapshot.forEach(documentSnapshot => {
                RealExperts.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setRealExprt(RealExperts);
            //console.log(RealSchemes);
        })
        
    }, [])

    // const rightchoice = (name, surname, status) => {
    //   setname(name)
    //   setsurname(surname)
    //   setstatus(status)
    //   toggleOverlay()
    // }

    // const Item1 = ({name, surname, status}) => {
    //  return(
    //   <View>
    //   <Card mode={'outlined'} style={{backgroundColor: '#252626'}}>
    //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //         <Text style={{color: 'white'}}>{name}</Text>
    //         <Text style={{color: 'white'}}>{surname}</Text>
    //         <Text style={{color: 'white'}}>{status}</Text>
    //     </View>
    //   </Card>
     
    //   </View>
    //  )}
    
    // const renderItem1 = ({ item }) => (
    //     <Item1 name={item.name} surname={item.surname} status={item.status} />
    //   );


  return (
    <View style={styles.mainView}>
        {/* <View style={styles.experts}>
            <FlatList
                data={RealExprt}
                renderItem={renderItem1}
                keyExtractor={item => item.id}
            />
        </View> */}
        <ImageBackground
          style={styles.coverImage}
          source={{
          uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
        }}>
        <View style={styles.container}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 30}}>ADMIN HOME</Text>
        <Text style={styles.sections} onPress={()=>navigation.navigate("AdminCropsData")}>Crops Section</Text>
        <Text style={styles.sections} onPress={()=>navigation.navigate("AdminEvents")}>Events Section</Text>
        <Text style={styles.sections} onPress={()=>navigation.navigate("AdminExpert")}>Experts Section</Text>
        <Text style={styles.sections} onPress={()=>navigation.navigate("ValidateUser")}>Validate Users</Text>
        <Text style={styles.sectionsLog} onPress={()=>navigation.navigate("Login")}>LOGOUT</Text>
        </View>
        </ImageBackground>

    </View>
  );
}


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center'
  },
  sections: {
    color: '#fff',
    marginBottom: '40@s',
    backgroundColor: '#822939',
    paddingTop: '10@s',
    paddingBottom: '10@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    borderRadius: 20,
    borderColor: '#822939',
    shadowColor: '#808080',
    textShadowColor: '#ffff00',
  }, 
  sectionsLog: {
    color: '#fff',
    marginBottom: '40@s',
    backgroundColor: 'green',
    paddingTop: '10@s',
    paddingBottom: '10@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
    borderRadius: 20,
    borderColor: '#822939',
    shadowColor: '#808080',
    textShadowColor: '#ffff00',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  inputs: {
    fontSize: 16,
    color: '#000',
    fontWeight: "bold",
    marginTop: 7,
    alignSelf: 'center',
    width: 230,
    // backgroundColor: '#000'
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cards: {
    height: 200,
    width: 440
  },
  shortdesc: {
    marginLeft: 8,
    marginTop: 5
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 2
  },
  card: {
    backgroundColor: '#FAFAFA',
    marginTop: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 2,
    marginBottom: 20,
    opacity: 0.7

},
experts: {
    marginTop: '25@s',
    flexDirection: 'row'
},
});

export default AdminHome;