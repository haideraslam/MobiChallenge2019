import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

import * as styles from '../../assets/styles'

export default dashboardStyles = StyleSheet.create({
  Container: { backgroundColor: "#ffffff", paddingVertical: 20 },
  icon: { color: "#333", fontWeight: 'bold' },
  horizontalMargin20: { marginHorizontal: 20 },
  datePicker: { marginTop: 15, flexDirection: 'row', borderColor: styles.WHITE, backgroundColor: styles.WHITE, borderRadius: 10, borderWidth: 1, height: 60, elevation: 2 },
  datePickerIcon: { flex: 1, padding: 15 },
  datePickerFromDate: { flex: 4, paddingVertical: 10 },
  datePickerToDate: { flex: 4, paddingVertical: 10 },
  PickupLocation: { flexDirection: 'row', height: 60, marginVertical: 20 },
  PickupLocationIcon: { flex: 1, padding: 15, backgroundColor: styles.WHITE, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, elevation: 2 },
  PickupLocationDropDown: { flex: 7, marginRight: 10, paddingRight: 10, backgroundColor: styles.WHITE, borderTopRightRadius: 10, borderBottomRightRadius: 10, elevation: 2 },
  PickupLocationSearchButton: { flex: 2 },
  SearchButton: { backgroundColor: styles.PRIMARY, width: 60, height: 60, borderRadius: 35, paddingLeft: 20, paddingTop: 15 },
  SearchButtonIcon: { color: styles.OFF_WHITE },
  card: { flex: 1, flexDirection: 'column', backgroundColor: styles.WHITE, marginBottom: 20, borderRadius: 20,
  ...Platform.select(
    {
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2
      }
    }
  )},
  cardImageContainer: { flex: 1 },
    cardImage: { width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  cardDetails: { flex: 1, paddingHorizontal: 10},
    cardHeadingContainer: { flexDirection: 'row', padding: 10 },
      cardHeading: { flex: 3, paddingTop: 10 },
      cardStarRating: { flex: 1, paddingTop: 10, paddingLeft: 10, maxWidth: 200 },
    cardInfo: { flexDirection: 'column' },
      cardHelpingText: { paddingHorizontal: 10 },
      cardFeatures: { flexDirection: 'row', paddingHorizontal: 10, marginTop: 15 },
        cardFeaturesModal: { flex: .8, borderRightWidth: 1 },
        cardFeaturesTransmission: { flex: 1.2, borderRightWidth: 1, paddingLeft: 10 },
        cardFeaturesSeats: { flex: 1, borderRightWidth: 1, paddingLeft: 10 },
        cardFeaturesDoors: { flex: 1, paddingLeft: 10 },
    cardButtonContainer: { flexDirection: 'row', padding: 10, marginTop: 20 },
      cardButtonText: { flex: 1, flexDirection: 'column' },
        amount: { flex: 1 },
        currency: { flex: 1 },
      cardButton: { flex: 1},
        bookNow: { backgroundColor: styles.PRIMARY, height: 40, borderRadius: 20, paddingTop: 12 },
        bookNowText: { color: styles.OFF_WHITE,  }
});