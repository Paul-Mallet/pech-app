import { StyleSheet } from 'react-native';
import Colors from './colors.tsx'; // assuming you already created this

const GlobalStyles = StyleSheet.create({
  titleDark: {
    fontFamily: 'BoldFont',
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  textDark: {
    fontFamily: 'RegularFont',
    textAlign: 'left',
    fontSize: 12,
    color: Colors.textDark,
  },
  textHighlightDark: {
    fontFamily: 'BoldFont',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textHighlightDark,
    textShadowColor: '#00000088', // Shadow color
    textShadowOffset: { width: 0.5, height: 0.5 }, // Shadow direction (x, y)
    textShadowRadius: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniImg: {
    width: '100%',
    aspectRatio: 1,
    height: undefined,
    borderRadius: 24,
  },
  fishCardName:
  {
    color: Colors.textBoldLight,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [
      { translateX: '-50%' },
    ],
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow direction (x, y)
    textShadowRadius: 6,
  },
  fishCard: {
    width: '50%',
    aspectRatio: 1,
    height: undefined,
    backgroundColor: '#F6FEFF',
    borderRadius: 24,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // Android elevation
    elevation: 10,
  },
  card: {
    textAlign: 'left',
    padding: 16,
    backgroundColor: '#F6FEFF',
    borderRadius: 24,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // Android elevation
    elevation: 10,
  },
});

export default GlobalStyles;