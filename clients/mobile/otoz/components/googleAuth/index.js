import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, AsyncStorage, NetInfo, WebView } from 'react-native';

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
// ==================================== Styles ====================================== //

// ================================ Service Routes ================================== //
import { Routes } from '../../utils/routes';
// ================================ Service Routes ================================== //

export class GoogleAuth extends Component {
  constructor(){
    super();
    this.state = { 
      isLoading: true,
      isConnected: null
    }
    this.loadApp();
  }

  loadApp = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  componentDidMount() {
    // NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
    // NetInfo.isConnected.fetch().done((isConnected) => { this.setState({isConnected: isConnected}); });
  }

  componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
  }

  _handleConnectivityChange = (isConnected) => {
    // this.setState({isConnected: isConnected});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[globalCss.container, globalCss.alignCenter]}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}} >
          <WebView 
            automaticallyAdjustContentInsets={true}
            source={{uri: Routes.AUTH_GOOGLE }}
            style={{marginTop: 20}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
           />
        </View>
      )
    }
  }
}

export default GoogleAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
