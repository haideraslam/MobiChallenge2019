import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Icon } from "native-base";
import { StackActions, NavigationActions } from 'react-navigation';

// ============================= 3rd Party Components =============================== //
import store from 'react-native-simple-store';
import Gallery from 'react-native-image-gallery';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
// ============================= 3rd Party Components =============================== //

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
import * as style from '../../assets/styles';
// ==================================== Styles ====================================== //

// ================================ Service Routes ================================== //
import { Routes } from '../../utils/routes';
// ================================ Service Routes ================================== //

// ============================== Application State ================================= //
import { ApplicationState } from '../../state';
// ============================== Application State ================================= //

export class CarBooking extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, discountAmount: 0 };
    this._loadApp();

    this._loadApp = this._loadApp.bind(this);
    this._calculateDiscount = this._calculateDiscount.bind(this);
    this._confirmBooking = this._confirmBooking.bind(this);
    this._navigateToPickup = this._navigateToPickup.bind(this);
  }

  _loadApp = async () => {
    store.get(new ApplicationState().cookieName).then((obj) => { this.setState(obj); });
    const userToken = await AsyncStorage.getItem(ApplicationState.userToken);
    if (!userToken) {
      this.props.navigation.navigate('uploadSelfie');
    } else {
      fetch(Routes.GET_ACCOUNT_DETAILS + this.state.bpId, {method: 'GET'})
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({isLoading: false, balance: jsonResponse.balance, accountId: jsonResponse.address});
        store.update(this.state.cookieName, { balance: jsonResponse.balance });
      });
    }
  }

  _calculateDiscount = async () => {
    console.log('accountId: ' + this.state.accountId);
    fetch(Routes.CALCULATE_DISCOUNT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: `resource:netsol.innovation.aar.token.model.Account#${this.state.accountId}`
      })
    }).then((response) => response.json()).then((jsonResponse) => {
      console.log("CALCULATE_DISCOUNT: Successful:");
      console.log(jsonResponse);
      this.setState({discountAmount: jsonResponse.amount});
    });
  } 

  _confirmBooking = () => {
    confirmBookingPayload = {
      $class: 'netsol.innovation.aar.contract.model.CreateContract',
      id: this.state.id,
      vehicle: this.state.vehicle,
      renter: `resource:netsol.innovation.aar.participants.model.Renter#${this.state.bpId}`,
      pickupLocation: this.state.pickupLocation,
      dropoffLocation: this.state.pickupLocation,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      contractTerms: 'The Company shall rent a vehicle (hereinafter referred to as "rental car") to the "renter" in accordance with the provisions of this Agreement (hereinafter referred to as "Agreement") and Detailed Regulations. Matters not prescribed in the "Agreement" and Detailed Regulations shall be handled in accordance with laws and regulations or general customs.' +
        ' The Company may accept special agreements, provided that they do not infringe upon the "Agreement" and Detailed Regulations, laws and regulations and general customs. In case a special agreement is concluded, it shall supersede the "Agreement" and Detailed Regulations.'
    };

    fetch(Routes.CONFIRM_BOOKING, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmBookingPayload)
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("CONFIRM_BOOKING: Successful:");
        console.log(jsonResponse);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'pickupScreen'
            })
          ],
        });
        this.props.navigation.dispatch(resetAction);
      });
  }

  _navigateToPickup = () => {
    if (parseInt(this.state.discountAmount) > 0) {
      fetch(Routes.REDEEM_TOKENS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: `resource:netsol.innovation.aar.token.model.Account#${this.state.accountId}`
        })
      }).then((response) => response.json()).then((jsonResponse) => {
        console.log("REDEEM_TOKENS: Successful:");
        console.log(jsonResponse);
        this._confirmBooking();
      });
    } else {
      this._confirmBooking();
    }

  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={[globalCss.container, globalCss.alignCenter]}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const images = [];
      
      const carImage = `http://aarvm2.westeurope.cloudapp.azure.com:3300/images/${this.state.car.vehicleDetails.featuredImage}`;
      images.push({ source: { uri: carImage } });

      this.state.car.vehicleDetails.images.forEach(imageName => {
        images.push({ source: { uri: `http://aarvm2.westeurope.cloudapp.azure.com:3300/images/${imageName}` } })
      });
      
      return (
        <View style={styles.container} >
          <View style={styles.innerContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Gallery style={{height: 250, width: this.fullWidth }} images={images} />
              <View style={styles.insideContainer}>
                <View style={styles.headingContainer}>
                  <View style={styles.heading}>
                    <Text style={globalCss.heading}>{this.state.car.vehicleDetails.model}</Text>
                  </View>
                  <View style={styles.starRatting}>
                    <View style={{flex: 1}}><Text>5 Reviews</Text></View>  
                    <View style={{flex: 1}}><StarRating disabled={true} maxStars={5} starSize={15} rating={4} /></View>  
                  </View>
                </View>
                <View style={styles.description}>
                  <Text numberOfLines={2}>{this.state.car.vehicleDetails.comments}</Text>
                </View>
                <View style={styles.features}>
                  <View style={styles.year}><Text>{this.state.car.vehicleDetails.year}</Text></View>
                  <View style={styles.transmission}><Text style={{textAlign: 'center'}}>{this.state.car.vehicleDetails.transmission}</Text></View>
                  <View style={styles.seats}><Text style={{textAlign: 'center'}}>{this.state.car.vehicleDetails.seats} seats</Text></View>
                  <View style={styles.door}><Text style={{textAlign: 'center'}}>{this.state.car.vehicleDetails.doors} doors</Text></View>
                </View>
                <View style={styles.fromToDetails}>
                  <View style={styles.fromDate}>
                    <View>
                      <Icon type="FontAwesome" name="calendar" />
                    </View>
                    <View style={{marginLeft: 10, paddingTop: 5, flex: 1}}>
                      <Text style={{ width: '100%', textAlign: 'center'}}>{moment(this.state.startDate).format('MM-DD-YYYY - HH:MM:SS')}</Text>
                    </View>
                  </View>
                  <View style={styles.toDate}>
                    <View>
                      <Icon type="FontAwesome" name="calendar" />
                    </View>
                    <View style={{marginLeft: 10, paddingTop: 5, flex: 1}}>
                      <Text style={{ width: '100%', textAlign: 'center'}}>{moment(this.state.endDate).format('MM-DD-YYYY - HH:MM:SS')}</Text>
                    </View>
                  </View>
                  <View style={styles.pickupLocation}>
                    <View>
                      <Icon type="FontAwesome" name="map-marker" />
                    </View>
                    <View style={{marginLeft: 10, paddingTop: 5, flex: 1}}>
                      <Text style={{ width: '100%', textAlign: 'center'}} numberOfLines={1}>{this.state.pickupLocation}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.priceDetailContainer}>
                  <View style={styles.tripPriceDetails}>
                    <View style={styles.tripPrice}>
                      <Text>Trip price ({this.state.rentPerDay} x {this.state.numberOfDays} day) :</Text>
                    </View>
                    <View style={styles.tripPriceInDigits}>
                      <View style={{flex: 1}}><Text style={{textAlign: 'right'}}>THB</Text></View>
                      <View style={{flex: 1}}><Text style={[globalCss.heading, {textAlign: 'right'}]}>{this.state.totalRent}</Text></View>
                    </View>
                  </View>
                  <View style={styles.commissionDetails}>
                    <View style={styles.commission}>
                      <Text>Commission ({this.state.commissionPerDay} x {this.state.numberOfDays} day) :</Text>
                    </View>
                    <View style={styles.commissionInDigits}>
                      <View style={{flex: 1}}><Text style={{textAlign: 'right'}}>THB</Text></View>
                      <View style={{flex: 1}}><Text style={[globalCss.heading, {textAlign: 'right'}]}>{this.state.totalCommission}</Text></View>
                    </View>
                  </View>
                  <View style={styles.discountDetails}>
                    <View style={styles.discount}>
                      <Text>Discount :</Text>
                    </View>
                    <View style={styles.discountInDigits}>
                      <View style={{flex: 1}}><Text style={{textAlign: 'right'}}>THB</Text></View>
                      <View style={{flex: 1}}><Text style={[globalCss.heading, {textAlign: 'right'}]}>{this.state.discountAmount}</Text></View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.discountContainer}>
                <View style={styles.discountDetails}>
                  <View style={styles.discount}>
                    <Text>Available Token :</Text>
                  </View>
                  <View style={styles.discountInDigits}>
                    <View style={{flex: 1}}><Text style={[globalCss.heading, {textAlign: 'right'}]}>{this.state.balance}</Text></View>
                  </View>
                </View>
                <View>
                  <Text>Redeem tokens to avail discount</Text>
                </View>
                <View style={{marginTop: 10}}>
                  <TouchableOpacity style={[globalCss.btn, {width: 150, alignSelf: 'center'}]} onPress={this._calculateDiscount}>
                    <Text style={globalCss.btnText}>REDEEM</Text>
                  </TouchableOpacity>    
                </View>
              </View>
              <View style={styles.insideContainer}>
                <View style={styles.totalContainer}>
                  <View style={styles.totalHeading}>
                    <Text style={{fontWeight: 'bold', paddingTop: 10}}>Total : </Text>
                  </View>
                  <View style={styles.totalInDigits}>
                    <View style={{flex: 1}}><Text style={{textAlign: 'right', paddingTop: 10}}>THB</Text></View>
                    <View style={{flex: 2}}><Text style={[globalCss.heading, {textAlign: 'right', fontSize: 30}]}>{(this.state.totalRent + this.state.totalCommission) - this.state.discountAmount}</Text></View>
                  </View>
                </View>
                <View style={styles.textUnderTotal}>
                  <Text numberOfLines={1}>Tax and service fee are not included in rental price</Text>
                  <Text numberOfLines={1}>One day booking in advance is required</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={[styles.footer, {backgroundColor: style.OFF_WHITE}]}>
            <View style={{flex: 1}}>
              <View><Text style={globalCss.heading}>{(this.state.totalRent + this.state.totalCommission) - this.state.discountAmount}</Text></View>
              <View><Text>THB</Text></View>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity style={globalCss.btn} onPress={this._navigateToPickup}>
                <Text style={globalCss.btnText}>CONFIRM BOOKING</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

}

export default CarBooking;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: style.OFF_WHITE },
  innerContainer: { flex: 9 },
    insideContainer: {padding: 25},
      headingContainer: {flexDirection: 'row'},
        heading: {flex: 1},
        starRatting: {flex: 1, flexDirection: 'row'},
        description: {marginVertical: 10},
      features: {flexDirection: 'row', marginBottom: 20},
        year: {flex: .6},
        transmission: {flex: 1, borderLeftColor: style.EXTRA_LIGHT_GRAY, borderLeftWidth: 1},
        seats: {flex: 1, borderLeftColor: style.EXTRA_LIGHT_GRAY, borderLeftWidth: 1},
        door: {flex: 1, borderLeftColor: style.EXTRA_LIGHT_GRAY, borderLeftWidth: 1},
      fromToDetails: {marginVertical: 20, paddingTop: 30, borderTopColor: style.EXTRA_LIGHT_GRAY, borderTopWidth: 1},
        fromDate: {backgroundColor: style.WHITE, borderRadius: 10, padding: 15, flexDirection: 'row', elevation: 2},
        toDate: {backgroundColor: style.WHITE, borderRadius: 10, padding: 15, flexDirection: 'row', marginTop: 10, elevation: 2},
        pickupLocation: {backgroundColor: style.WHITE, borderRadius: 10, padding: 15, flexDirection: 'row', marginTop: 10, elevation: 2},
      priceDetailContainer: {marginVertical: 20},
        tripPriceDetails: {flexDirection: 'row'},
          tripPrice: {flex: 2},
          tripPriceInDigits: {flex: 1, flexDirection: 'row'},
        commissionDetails: {flexDirection: 'row'},
          commission: {flex: 2},
          commissionInDigits: {flex: 1, flexDirection: 'row'},
        discountDetails: {flexDirection: 'row'},
          discount: {flex: 2},
          discountInDigits: {flex: 1, flexDirection: 'row'},
      discountContainer: {padding: 20, backgroundColor: style.EXTRA_LIGHT_GRAY},
      totalContainer: {flexDirection: 'row'},
        totalHeading: {flex: 1},
        totalInDigits: {flex: 1, flexDirection: 'row'},
      textUnderTotal: {marginTop: 10},
  footer: { flex: 1, flexDirection: 'row', paddingHorizontal: 25, paddingTop: 20, backgroundColor: style.WHITE, borderTopColor: style.EXTRA_LIGHT_GRAY, borderTopWidth: 1, elevation: 2 }
})