import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'

export class AuthLoading extends Component {

  constructor(){
    super();
    this.loadApp();
  }

  loadApp = async() => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'app' : 'startApp');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default AuthLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
