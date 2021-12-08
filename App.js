import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dbh from './Config';
// import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerEx from './Drawer/DrawerDef';
import LoginEF from './Screens/Login';
// import Flat from './Screens/Flat';
import Welcome from './Screens/Welcome';
import Register from './Screens/Register';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import SpinnerWidg from './Screens/Spin';
import AdminCropsData from './Admin/AdminCropsData';
import ViewCrops from './Admin/CropsView';
// import OfflineNotice from './Screens/NoInternet';
import ExpertSection from './Admin/AdminExpertSct';
import AdminValidateUser from './Admin/AdminValidateUser';
import AdminEvents from './Admin/AdminEvents';
import Options from './Admin/Option';
import CropViewData from './Screens/CropsViewData';
// import History from './Screens/History';


const Stack = createStackNavigator();


const App = () => {

  console.log("hi")
  const data=dbh.collection("users").doc("newuser@gmail.com").onSnapshot(documentSnapshot =>{
     console.log("Data : ",documentSnapshot.data())
  })
 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>        
      
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="CropsData" component={CropViewData}/>
        <Stack.Screen name="Options" component={Options}/>

        <Stack.Screen name="AdminCropsData" component={AdminCropsData}/>
        
        <Stack.Screen name="AdminHome" component={AdminHome}/>
        <Stack.Screen name="ValidateUser" component={AdminValidateUser}/>
        {/* <Stack.Screen name="NoInternet" component={OfflineNotice}/> */}        
        <Stack.Screen name="AdminEvents" component={AdminEvents}/>
        
        <Stack.Screen name="AdminExpert" component={ExpertSection}/>
        <Stack.Screen name="AdminLogin" component={AdminLogin}/>
        <Stack.Screen name="ViewCrops" component={ViewCrops}/>
        <Stack.Screen name="Login" component={LoginEF}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Drawer" component={DrawerEx}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;