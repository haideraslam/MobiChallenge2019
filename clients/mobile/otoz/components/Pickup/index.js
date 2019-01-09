import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Content, Icon, Header, Left, Right, Body, Title } from "native-base";
import { StackActions, NavigationActions } from 'react-navigation';

// ============================= 3rd Party Components =============================== //
import store from 'react-native-simple-store';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
// ============================= 3rd Party Components =============================== //

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
import * as style from '../../assets/styles';
// ==================================== Styles ====================================== //

// ============================== Application State ================================= //
import { ApplicationState } from '../../state';
// ============================== Application State ================================= //

// ================================ Service Routes ================================== //
import { Routes } from '../../utils/routes';
// ================================ Service Routes ================================== //

export class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
    this._loadApp();
    this._loadApp = this._loadApp.bind(this);
    this._pickupClicked = this._pickupClicked.bind(this);
  }

  _loadApp = async () => {
    await store.get(new ApplicationState().cookieName).then((obj) => { 
      this.setState(obj); 
    });
    const userToken = await AsyncStorage.getItem(ApplicationState.userToken);
    if (!userToken) {
      this.props.navigation.navigate('uploadSelfie');
    } else {
      this.setState({isLoading: false});
    }
  }

  _pickupClicked() {
    const obj = {
      $class: 'netsol.innovation.aar.contract.model.PickupCar',
      contract: `resource:netsol.innovation.aar.contract.model.Contract#${this.state.id}`
    };

    fetch(Routes.PICKUP_CAR, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }).then((response) => response.json()).then((jsonResponse) => {
      console.log("PICKUP_CAR: Successful:");
      console.log(jsonResponse);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'DropOffScreen'
          })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    });
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
        <View style={[globalCss.container, {backgroundColor: style.BACKGROUND}]}>
          <Header transparent style={globalCss.header}>
            <Left style={{flex:1}}><Icon name='menu' onPress={()=> this.props.navigation.openDrawer()} /></Left>
            <Body style={{flex:5}}><Title style={globalCss.heading}>Confirmed</Title></Body>
            <Right style={{flex:1}}>
              <Image style={globalCss.loginImage} source={require('../../assets/images/images/dp.jpg')} />
            </Right>
          </Header>
          <Content contentContainerStyle={[globalCss.container]} >
            <ImageBackground style={{width: 375, height: 500, alignSelf: 'center', marginTop: 20}} imageStyle={{resizeMode: 'contain'}} source={require('../../assets/images/images/ticket.png')}>
              <View style={{flex: 1, paddingVertical: 40, paddingHorizontal: 40}}>
                <View style={{paddingBottom: 40, borderBottomColor: style.LIGHT_GRAY, borderBottomWidth: 1}}>
                  <View style={styles.headingContainer}>
                    <View style={styles.heading}>
                      <Text numberOfLines={1} style={globalCss.heading}>{this.state.car.vehicleDetails.model}</Text>
                    </View>
                    <View style={styles.starRatting}>
                      <View style={{flex: 1}}>
                        <Text>5 Reviews</Text>
                      </View>  
                      <View style={{flex: 1}}>
                        <StarRating disabled={true} maxStars={5} starSize={15} rating={4} />
                      </View>  
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Text numberOfLines={2}>{this.state.car.vehicleDetails.comments}</Text>
                  </View>
                  <View style={styles.features}>
                    <View style={styles.year}><Text>{this.state.car.vehicleDetails.year}</Text></View>
                    <View style={styles.transmission}><Text style={{textAlign: 'center'}}>{this.state.car.vehicleDetails.transmission}</Text></View>
                    <View style={styles.seats}><Text style={{textAlign: 'center'}}>5 {this.state.car.vehicleDetails.seats} seats</Text></View>
                    <View style={styles.door}><Text style={{textAlign: 'center'}}>4 {this.state.car.vehicleDetails.doors} doors</Text></View>
                  </View>
                </View>
                <View style={{marginTop: 30}}>
                  <Text>Pick-up Location</Text>
                  <Text style={{fontWeight: 'bold', color: style.DARK}}>{this.state.pickupLocation}</Text>
                </View>
                <View style={{paddingTop: 30, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text>From</Text>
                    <Text style={{fontWeight: 'bold', color: style.DARK}}>{moment(this.state.startDate).format('MM-DD-YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', color: style.DARK}}>{moment(this.state.startDate).format('hh:mm')}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text>From</Text>
                    <Text style={{fontWeight: 'bold', color: style.DARK}}>{moment(this.state.endDate).format('MM-DD-YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', color: style.DARK}}>{moment(this.state.endDate).format('hh:mm')}</Text>
                  </View>
                </View>
                <View style={{paddingTop: 80, flexDirection: 'row'}}>
                  <View style={{flex: 1, paddingTop: 15}}>
                    <Text style={{fontWeight: 'bold', color: style.DARK}}>Total :</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{paddingTop: 15, marginRight: 10}}><Text>THB</Text></View>
                    <View><Text style={{fontWeight: 'bold', color: style.DARK, fontSize: 35}}>{this.state.totalRent + this.state.totalCommission}</Text></View>
                  </View>
                </View>
                <View style={{paddingTop: 20, alignItems: 'center'}}>
                  <TouchableOpacity style={[globalCss.btn, {width: 150}]} onPress={this._pickupClicked}>
                    <Text style={globalCss.btnText}>PICKUP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </Content>
        </View>
      )
    }
  }
}

export default Pickup;

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 9 },
    insideContainer: {padding: 25},
      headingContainer: {flexDirection: 'row'},
        heading: {flex: 1},
        starRatting: {flex: 1, flexDirection: 'row'},
        description: {marginVertical: 10},
      features: {flexDirection: 'row', marginBottom: 10},
        year: {flex: .6},
        transmission: {flex: 1, borderLeftColor: style.LIGHT_GRAY, borderLeftWidth: 1},
        seats: {flex: 1, borderLeftColor: style.LIGHT_GRAY, borderLeftWidth: 1},
        door: {flex: 1, borderLeftColor: style.LIGHT_GRAY, borderLeftWidth: 1},
})
