import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Content, Icon, Header, Left, Right, Body, Title } from "native-base";
import { StackActions, NavigationActions } from 'react-navigation';
import { RNCamera } from 'react-native-camera';

// ============================== Application State ================================= //
import { ApplicationState } from '../../state';
// ============================== Application State ================================= //

// ============================= 3rd Party Components =============================== //
import store from 'react-native-simple-store';
// ============================= 3rd Party Components =============================== //

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
// ==================================== Styles ====================================== //

export class UploadSelfie extends Component {
  constructor(){
    super();
    this.state = { isLoading: true }

    this._loadApp = this._loadApp.bind(this);
    this._takePicture = this._takePicture.bind(this);
    
    this._loadApp();
  }

  _loadApp = () => { 
    setTimeout(() => { this.setState({ isLoading: false }); }, 1000);
    store.get(new ApplicationState().cookieName).then((obj) => { this.setState(obj); });
   }

  _takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      store.update(this.state.cookieName, {
        selfie: data.base64,
        selfiePath: data.uri
      }).then(()=>{
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'uploadDocument' })],
        });
        this.props.navigation.dispatch(resetAction);
      });
    }
  };

  render() {
    let imagePath = '../../assets/images/images/dp.jpg';
    if (this.state.isLoading) {
      return (
        <View style={[globalCss.container, globalCss.alignCenter]}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={globalCss.container}>
          <Header transparent style={globalCss.header}>
            <Left style={{flex:1}}><Icon name='menu' onPress={()=> this.props.navigation.openDrawer()} /></Left>
            <Body style={{flex:5}}><Title style={globalCss.heading}>Profile</Title></Body>
            <Right style={{flex:1}}>
              <Image style={globalCss.loginImage} source={require(imagePath)} />
            </Right>
          </Header>
          <Content contentContainerStyle={[globalCss.container]} >
            <View style={styles.cameraContainer}>
              <RNCamera
                ref={cam => {this.camera = cam;}}
                style = {styles.preview}
                type={RNCamera.Constants.Type.front}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.auto}
              />
            </View>
            <View style={[styles.infoText, globalCss.alignCenter]}>
              <Text style={globalCss.heading}>Take a Selfie</Text>
              <Text style={styles.infoTextSubHeading}>Update with your latest photograph</Text>
            </View>
            <View style={styles.uploadButtons}>
              <TouchableOpacity style={[globalCss.btn, styles.button]} onPress={this._takePicture}>
                <Text style={globalCss.btnText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </View>
      )
    }
  }
}

export default UploadSelfie;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  infoText: {
    flex: 1
  },
  infoTextSubHeading: {

  },
  uploadButtons: { 
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: 150,
  }
})