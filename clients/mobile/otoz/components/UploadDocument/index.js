import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Content, Icon, Header, Left, Right, Body, Title } from "native-base";
import { StackActions, NavigationActions } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import PopupDialog from 'react-native-popup-dialog';

// ============================= 3rd Party Components =============================== //
import store from 'react-native-simple-store';
// ============================= 3rd Party Components =============================== //

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
// ==================================== Styles ====================================== //

// ============================== Application State ================================= //
import { ApplicationState } from '../../state';
// ============================== Application State ================================= //

// ================================ Service Routes ================================== //
import { Routes } from '../../utils/routes';
// ================================ Service Routes ================================== //

export class UploadDocument extends Component {
  constructor(){
    super();
    this.state = { isLoading: true }
    
    this._loadApp = this._loadApp.bind(this);
    this._setAuthToken = this._setAuthToken.bind(this);
    this._takePicture = this._takePicture.bind(this);
    
    this._loadApp();
  }

  _loadApp = () => {
    setTimeout(() => { this.setState({ isLoading: false }); }, 1000);
    store.get(new ApplicationState().cookieName).then((obj) => { this.setState(obj); });
  }

  _setAuthToken = async () => {
    await AsyncStorage.setItem(ApplicationState.userToken, '0000-0000-0000-0000');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'bookYourCar' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  _takePicture = async () => {
    this.popupDialog.show();
    if (this.backCamera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.backCamera.takePictureAsync(options);
      store.update(this.state.cookieName, {
        document: data.base64,
        documentPath: data.uri
      }).then(()=>{
        let obj = {
          $class: 'netsol.innovation.aar.participants.model.UploadKyc',
          "renter": 'resource:netsol.innovation.aar.participants.model.Renter#RNTR1',
          kycDetails: {
            $class: 'netsol.innovation.aar.participants.model.KYCDetails',
            idDocument: 'data.base64',
            picture: 'this.state.selfie'
          }
        };
        fetch(Routes.UPLOAD_KYC, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        }).then((response) => response.json()).then((jsonResponse) => {
          this._setAuthToken();
        });
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
          {/* ==================================== Dialog ====================================== */}
          <PopupDialog ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <View><ActivityIndicator /></View>
                <View style={{marginLeft: 10}}><Text>Uploading documents.</Text></View>
              </View>
            </View>
          </PopupDialog>
          {/* ==================================== Dialog ====================================== */}
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
                ref={ref => {this.backCamera = ref;}}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.auto}
              />
            </View>
            <View style={[styles.infoText, globalCss.alignCenter]}>
              <Text style={globalCss.heading}>Take photo of your ID document</Text>
              <Text style={styles.infoTextSubHeading}>Passport, Identity Card.</Text>
            </View>
            <View style={styles.uploadButtons}>
              <TouchableOpacity style={[globalCss.btn, styles.button]} onPress={this._takePicture}>
                <Text style={globalCss.btnText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </View>
      )
    }
  }
}

export default UploadDocument;

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