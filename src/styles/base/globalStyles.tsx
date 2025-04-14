import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext.tsx';

const GlobalStyles = () => {
  const { theme, font } = useTheme();

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.body,
    },
    h2: {
      fontSize: 24,
      marginVertical: 8,
      color: theme.textDark,
      fontFamily: font.bold,
      lineHeight: 40
    },
    titleDark: {
      fontFamily: font.bold,
      textAlign: 'left',
      fontSize: 16,
      color: theme.textDark,
      marginBottom: 8,
      lineHeight: 20
    },
    textDark: {
      fontFamily: font.regular,
      fontSize: 12,
      color: theme.textDark,
      textAlign: 'left',
    },
    textHighlightDark: {
      fontFamily: font.bold,
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.textHighlightDark,
    },
    textHighlightSearch: {
      backgroundColor: theme.textHighlightSearch,
      color: 'white',
    },
    centered: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    homePanel: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 0,
      paddingLeft: 32,
      paddingRight: 32,
      paddingBottom: 0,
      marginBottom: 60,
      marginTop: 40,
    },
	fishCardsContainer: {
		flex: 1,
		width: '49%',
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		gap: 10,
	},
	fishCardContainer: {
		position: "relative",
		aspectRatio: 1,
		padding: 16,
		borderRadius: 24,
		backgroundColor: "#fff",
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 10,
	},
    backgroundImage: {
      width: '100%',
      height: '100%',
      transform: [{ scale: 2 }],
      aspectRatio: 1,
    },
    fishCardName: {
      position: 'absolute',
      left: '50%',
      bottom: 0,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.textBoldLight,
      transform: [
        { translateX: '-50%' },
      ],
      textShadowColor: 'black', // Shadow color
      textShadowOffset: { width: 1, height: 1 }, // Shadow direction (x, y)
      textShadowRadius: 6,
    },
    legislationCard: {
      textAlign: 'left',
      marginBottom: 16,
      padding: 16,
      backgroundColor: theme.searchBarBackground,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 10,
    },
    searchBar: {
      top: 40,
      marginHorizontal: 'auto',
      width: "95%",
      flexDirection: 'column',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 32,
      paddingHorizontal: 10,
      height: 'auto',
      backgroundColor: theme.searchBarBackground,
      zIndex: 1,
      maxHeight: '70%',
      overflow: 'hidden',
    },
    searchBarTopItems: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 60,
    },
    searchBarList: {
      // alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
      overflow: 'hidden',
    },
    searchBarListGroup: {
      textAlign: 'left',
      width: '100%',
      height: 'auto',
    },
    searchBarGroupTitle: { // todo: align the text vertically
      borderRadius: 8,
      fontFamily: font.regular,
      fontSize: 12,
      textAlign: 'left',
      justifyContent: 'center',
      backgroundColor: theme.inputPlaceholder,
      height: 30,
      paddingLeft: 10,
      color: theme.body,
    },
    searchBarGroupElement: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      height: 30,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#00000020'
    },
    searchBarGroupElementText: {
      fontFamily: font.regular,
      color: theme.textDark,
    },
    searchBarGroupElementIcon: {
      width: 32,
      height: 32,
    },
    searchBarFocused: {
      backgroundColor: "#EFFDFF",
      borderColor: theme.textHighlightDark,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 10,
    },
    searchBarIconLeft: {
      marginRight: 8,
    },
    searchBarButtonRight: {
      backgroundColor: theme.textHighlightDark,
      borderRadius: "50%",
      padding: 6,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 5,
      shadowOpacity: 0.25,
      elevation: 5,
    },
    input: {
      marginTop: 4,
      flex: 1,
      fontSize: 14
    },
    miniImg: {
      width: '100%',
      aspectRatio: 1,
      height: undefined,
      borderRadius: 24,
    },
	buttonBackModal: {
		width: 48,
		height: 48,
		left: '50%',
		borderRadius: '50%',
		transform: [{ translateX: -24 }],
		backgroundColor: theme.textHighlightDark,
		padding: 6,
	},
	titleModal: {
		marginLeft: 10,
		marginTop: 10,
		textAlign: 'center',
	},
	propertyCardName: {
		bottom: -10,
	},
  list: {
    padding: 10,
		flexDirection: "row",
    gap: 4,
  },
  });

  return styles;
};

export default GlobalStyles;
