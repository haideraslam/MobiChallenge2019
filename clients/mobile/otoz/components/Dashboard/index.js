import React, { Component } from 'react';
import { Alert, View, Text, Image, Dimensions, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import { Content, Icon, Header, Left, Right, Body, Title } from "native-base";

// ============================= 3rd Party Components =============================== //
import { Dropdown } from 'react-native-material-dropdown';
import Carousel from 'react-native-snap-carousel';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import store from 'react-native-simple-store';
// ============================= 3rd Party Components =============================== //

// ==================================== Styles ====================================== //
import globalCss from '../../assets/styles';
import dashboardCss  from './dashboardCss';
// ==================================== Styles ====================================== //

// ============================== Application State ================================= //
import { ApplicationState } from '../../state';
// ============================== Application State ================================= //

// ================================ Service Routes ================================== //
import { Routes } from '../../utils/routes';
// ================================ Service Routes ================================== //

// =================================== Carousel ===================================== //
const horizontalMargin = 25;
const slideWidth = Dimensions.get('window').width;
const itemWidth = slideWidth - horizontalMargin * 2;
// =================================== Carousel ===================================== //

export class Dashboard extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props)
    this.state = { isLoading: true, entries: null }
    this._setApplicationState();
    this._fetchCars();
    
    this._setApplicationState = this._setApplicationState.bind(this);
    this._fetchCars = this._fetchCars.bind(this);
    this._searchCars = this._searchCars.bind(this);
    this._getRenter = this._getRenter.bind(this);
    this._createRenter = this._createRenter.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._bookYourCar = this._bookYourCar.bind(this);
    this._pickupLocationChanged = this._pickupLocationChanged.bind(this);
  }

  _setApplicationState = () => {
    AsyncStorage.setItem(ApplicationState.userToken, '');
    store.get(new ApplicationState().cookieName).then((obj) => { 
      if(parseInt(obj.bpId) !== 0) {
        console.log("Application state is available.");
        this.setState(obj); 
      } else {
        console.log("Application state is not available use default values.");
        let newApplicationState = new ApplicationState();
        store.save(new ApplicationState().cookieName, newApplicationState);
        this.setState(newApplicationState);
      }
    });
  }

  _fetchCars = () => {
    fetch(Routes.GET_CARS_LIST, { method: 'POST' })
    .then((response) => response.json())
    .then((jsonResponse) => { 
      this.setState({ entries: jsonResponse, isLoading: false }); 
    })
  }

  _searchCars = () => {
    store.update(this.state.cookieName, {
      endDate: this.state.endDate,
      startDate: this.state.startDate,
      pickupLocation: this.state.pickupLocation
    });
    this._fetchCars;
  }

  _getRenter = (car) => {
    fetch(Routes.GET_RENTER, { method: 'GET' })
    .then((response) => response.json())
    .then((jsonResponse) => { 
      store.update(this.state.cookieName, {
        car: car,
        bpId: this.state.bpId,
        id: (Math.floor(Math.random() * 99999) + 1).toString(),
        vehicle: `resource:netsol.innovation.aar.vehicle.model.Vehicle#${car.vin}`,
        endDate: this.state.endDate,
        startDate: this.state.startDate,
        pickupLocation: this.state.pickupLocation,
        numberOfDays: moment(this.state.endDate).diff(this.state.startDate, 'days'),
        rentPerDay: car.vehicleDetails.rentPerDay,
        renter: JSON.parse(JSON.stringify(jsonResponse)).participant,
        totalRent: parseInt(car.vehicleDetails.rentPerDay) * parseInt(moment(this.state.endDate).diff(this.state.startDate, 'days')),
        commissionPerDay: parseInt(car.vehicleDetails.rentPerDay) * 25 / 100,
        totalCommission: (parseInt(car.vehicleDetails.rentPerDay) * 25 / 100) * parseInt(moment(this.state.endDate).diff(this.state.startDate, 'days'))
      }).then(() => {
        this.props.navigation.navigate('bookYourCar');
      });
    });
  }

  _createRenter = (car) => {
    const obj = {
      "$class": "netsol.innovation.aar.participants.model.CreateRenter",
      bpId: (Math.floor(Math.random() * 99999) + 1).toString(),
      title: "title",
      firstName: "FirstName",
      lastName: "LastName",
      Dob: new Date()
    };

    fetch(Routes.CREATE_RENTER_FRONT_END, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
    .then((jsonResponse) => { 
      this.setState({ bpId: jsonResponse.bpId });
      this._getRenter(car);
    });
  }

  _bookYourCar = (car) => {
    if(!this.state.pickupLocation){
      Alert.alert('Please select pickup location.');
      return;
    }
    this._createRenter(car);
  }

  _pickupLocationChanged = (text) => {
    this.state.pickupLocation = text;
  }

  _renderItem({ item, index }) {
    const carImage = `http://aarvm2.westeurope.cloudapp.azure.com:3300/images/${item.vehicleDetails.featuredImage}`;
    return (
      <View style={dashboardCss.card}>
        <View style={dashboardCss.cardImageContainer}>
          <Image style={dashboardCss.cardImage} source={{ uri: carImage }} />
        </View>
        <View style={dashboardCss.cardDetails}>
        <View style={dashboardCss.cardHeadingContainer}>
          <View style={dashboardCss.cardHeading}>
            <Text style={globalCss.heading} numberOfLines={1}>{item.vehicleDetails.model}</Text>
          </View>
          <View style={dashboardCss.cardStarRating}>
            <StarRating disabled={true} maxStars={5} starSize={15} rating={item.vehicleDetails.doors} />
          </View>
        </View>
        <View style={dashboardCss.cardInfo}>
          <View style={dashboardCss.cardHelpingText}>
            <Text numberOfLines={2}>{item.vehicleDetails.comments}</Text>
          </View>
          <View style={dashboardCss.cardFeatures}>
            <View style={dashboardCss.cardFeaturesModal}><Text>{item.vehicleDetails.year}</Text></View>  
            <View style={dashboardCss.cardFeaturesTransmission}><Text>{item.vehicleDetails.transmission}</Text></View>  
            <View style={dashboardCss.cardFeaturesSeats}><Text>{item.vehicleDetails.seats} Seats</Text></View>  
            <View style={dashboardCss.cardFeaturesDoors}><Text>{item.vehicleDetails.doors} Doors</Text></View>  
          </View>
        </View>
        <View style={dashboardCss.cardButtonContainer}>
          <View style={dashboardCss.cardButtonText}>
            <Text style={[dashboardCss.amount, globalCss.heading]}>{item.vehicleDetails.rentPerDay}</Text>
            <Text style={dashboardCss.currency}>HTB/day</Text>
          </View>
          <View style={dashboardCss.cardButton}>
            <TouchableOpacity rounded block style={dashboardCss.bookNow} onPress={() => { this._bookYourCar(item) }}>
              <Text style={[dashboardCss.bookNowText, globalCss.btnText]}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    );
  }

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
            <Body style={{flex:5}}><Title style={globalCss.heading}>Dashboard</Title></Body>
            <Right style={{flex:1}}>
              <Image style={globalCss.loginImage} source={require(imagePath)} />
            </Right>
          </Header>
          <Content contentContainerStyle={globalCss.container} >
            <View style={[dashboardCss.datePicker, dashboardCss.horizontalMargin20]}>
              <View style={dashboardCss.datePickerIcon}>
                <Icon type="FontAwesome" name="calendar" style={dashboardCss.icon} />
              </View>
              <View style={dashboardCss.datePickerFromDate}>
                <DatePicker
                  date={this.state.startDate}
                  mode="datetime"
                  placeholder="select date"
                  onDateChange={(date) => { this.setState({ startDate: date }) }}
                  style={{ width: '100%' }}
                  customStyles={{ dateIcon: { display: 'none' }, dateInput: { marginLeft: 0, borderColor: 'transparent' } }} />
              </View>
              <View style={dashboardCss.datePickerToDate}>
                <DatePicker
                  date={this.state.endDate}
                  mode="datetime"
                  placeholder="select date"
                  onDateChange={(date) => { this.setState({ endDate: date }) }}
                  style={{ width: '100%' }}
                  customStyles={{ dateIcon: { display: 'none' }, dateInput: { marginLeft: 0, borderColor: 'transparent' } }} />
              </View>
            </View>
            <View style={[dashboardCss.PickupLocation, dashboardCss.horizontalMargin20]}>
              <View style={dashboardCss.PickupLocationIcon}>
                <Icon type="FontAwesome" name="map-marker" style={dashboardCss.icon} />
              </View>
              <View style={dashboardCss.PickupLocationDropDown}>
                <Dropdown 
                  data={this.state.allLocations} 
                  value={'Suvarnabhumi Airport'} 
                  onChangeText={this._pickupLocationChanged}
                  containerStyle={{marginTop: -15}} />
              </View>
              <View style={dashboardCss.PickupLocationSearchButton}>
                <TouchableOpacity transparent style={dashboardCss.SearchButton} onPress={this._searchCars}>
                  <Icon style={[dashboardCss.icon, dashboardCss.SearchButtonIcon]} name="search"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Carousel data={this.state.entries} renderItem={this._renderItem} hasParallaxImages={true} sliderWidth={slideWidth} itemWidth={itemWidth} />
            </View>
          </Content>
        </View>
      )
   }
  }
}

export default Dashboard ;