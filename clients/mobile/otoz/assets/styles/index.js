import { StyleSheet } from 'react-native';
import { Fonts } from '../../utils/fonts';

export const PRIMARY = "#5A55E0";
export const DARK = "#222324";
export const GRAY = "#848483";
export const LIGHT_GRAY = "#E8E8E8";
export const EXTRA_LIGHT_GRAY = "#e8e9ee";
export const OFF_WHITE = "#F7F7F7";
export const WHITE = "#ffffff";
export const BACKGROUND = "#fefefe";

export default StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: 20 },
  container: { flex: 1 },
  alignCenter: { alignItems: 'center', justifyContent: 'center' },
  header: { paddingLeft: 20, paddingRight: 20, marginTop: 15 },
  loginImage: {width: 50, height: 50, borderRadius: 25},
  heading: { fontSize: 18, textAlign: 'left', fontFamily: Fonts.GothamProBold, color: DARK},
  btn: {backgroundColor: PRIMARY, height: 40, borderRadius: 20, paddingTop: 12},
  btnText: { fontSize: 14, textAlign: 'center', fontFamily: Fonts.GothamProBold, color: OFF_WHITE}
});