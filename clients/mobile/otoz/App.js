import React, { Component } from 'react'
import { View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';

import * as globalCss from './assets/styles';
import * as font from './utils/fonts';

import { Dashboard } from './components/Dashboard';
import { CarBooking } from './components/CarBooking';
import { GoogleAuth } from './components/googleAuth';
import { UploadSelfie } from './components/UploadSelfie';
import { UploadDocument } from './components/UploadDocument';
import { Pickup } from './components/Pickup';
import { DropOff } from './components/DropOff';

export default class App extends Component {
  render() {
    return (
      <AppDrawerNavigator />
    )
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
    <View style={{height: 200, paddingTop: 30, paddingLeft: 15}}>
      <Image source={require('./assets/images/images/dp.jpg')} style={{height: 120, width: 120, borderRadius: 60}} />
      <Text style={{fontSize: 18, textAlign: 'left', color: globalCss.DARK, marginTop: 10}}>Slava Kornilov</Text>
      <Text style={{fontSize: 11, textAlign: 'left', color: globalCss.GRAY, marginBottom: 20}}>Token Balance: 370 TOK</Text>
    </View>
    <ScrollView style={{marginTop: 10}}>
      <DrawerItems {...props} />
    </ScrollView>
    <View style={{paddingLeft: 15}}>
      <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'left', color: globalCss.GRAY, marginBottom: 20}}>Logout</Text>
    </View>
  </SafeAreaView>
);

const AuthStackNavigator = createStackNavigator({
  Dashboard: { screen: Dashboard },
  googleAuth: { screen: GoogleAuth },
  uploadSelfie: { screen: UploadSelfie },
  uploadDocument: { screen: UploadDocument },
  bookYourCar: { screen: CarBooking },
  pickupScreen: { screen: Pickup },
  DropOffScreen: { screen: DropOff },
}, { navigationOptions: { header: null }});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: AuthStackNavigator,
  'List Your Car': Dashboard,
  'Learn More': Dashboard,
  'History': Dashboard,
  'Contact Us': Dashboard
  // uploadKyc: {  screen: UploadKyc, navigationOptions: { drawerLabel: () => null }},
}, 
{
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    labelStyle: {
      color: globalCss.GRAY,
      fontFamily: font.GothamProBold
    },
    activeTintColor: {
       color: globalCss.DARK
    }
  },
  style: {
    backgroundColor: globalCss.OFF_WHITE
  }

});
