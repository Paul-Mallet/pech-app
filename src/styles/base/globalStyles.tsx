import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

const GlobalStyles = () => {
	const { theme, font } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.body,
    },
    h2: {
      position: 'relative',
      fontSize: 24,
      marginBottom: 8,
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
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 0,
      marginBottom: 60,
      marginTop: 0,
    },
    homePanelTabs: {
      marginTop: 100,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'ffffff10',
      flexDirection: "row",
      width: '100%',
      height: 40,
    },
    fishCardsContainer: {
      flex: 1,
      width: '100%',
      height: 160,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    boxShadow: {
      backgroundColor: 'red',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 10,
    },
    backgroundImage: {
			backgroundColor: theme.navBarBackground,
      width: '100%',
      height: '100%',
      aspectRatio: 1,
      borderRadius: 16,
    },
    fishCardName: {
      width: "90%",
      alignSelf: 'center',
      position: 'absolute',
      bottom: 5,
      fontFamily: font.bold,
      fontSize: 16,
      textAlign: 'center',
      color: theme.textBoldLight,
      textShadowColor: 'black', // Shadow color
      textShadowOffset: { width: 1, height: 1 }, // Shadow direction (x, y)
      textShadowRadius: 6,
      pointerEvents: 'none'
    },
    legislationCard: {
      textAlign: 'left',
      marginBottom: 16,
      padding: 16,
      backgroundColor: theme.cardBackground,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 10,
    },
    searchBar: {
      position: 'absolute',
      alignSelf: 'center',
      top: 40,
      marginHorizontal: 'auto',
      width: "95%",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 32,
      paddingHorizontal: 12,
      height: 'auto',
      backgroundColor: theme.searchBarBackground,
      maxHeight: '70%',
      overflow: 'hidden',
    },
    searchBarTopItems: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
    },
    searchBarList: {
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
      overflow: 'hidden',
    },
    searchBarListGroup: {
      textAlign: 'left',
      width: '100%',
      height: 'auto',
      paddingBottom: 6
    },
    searchBarGroupTitle: {
      borderRadius: 8,
      fontFamily: font.regular,
      fontSize: 12,
      textAlign: 'left',
      textAlignVertical: 'center',
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
      borderBottomWidth: 1,
      borderBottomColor: '#00000020'
    },
    searchBarGroupElementText: {
      marginLeft: 10,
      fontFamily: font.regular,
      color: theme.textDark,
    },
    searchBarGroupElementIcon: {
      width: 32,
      height: 32,
    },
    searchBarFocused: {
      backgroundColor: theme.searchBarBackgroundFocused,
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      padding: 8,
      borderRadius: 32,
      backgroundColor: theme.textHighlightDark
    },
    quizzButton: {
      position: 'absolute',
      top: 60,
      right: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      padding: 8,
      borderRadius: 32,
      backgroundColor: theme.textHighlightDark,
      zIndex: 10
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
    hscientific: {
      fontSize: 16,
      fontWeight: '300',
      fontFamily: font.italic,
      color: theme.textDark,
    },
    fishCardContainer: {
			backgroundColor: theme.navBarBackground,
      position: "relative",
      aspectRatio: 1,
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4
    },
    fishListContainer: {
      flexDirection: "row",
      aspectRatio: 1,
      padding: 16,
      borderRadius: 24,
      gap: 16,
      width: '100%',
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
    containerBottomSheet: {
      backgroundColor: theme.body,
      borderTopStartRadius: 32,
      borderTopEndRadius: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      // elevation: 10,
    },
    contentContainerBottomSheet: {
      flex: 1,
      position:'relative',
      width: '100%',
      padding: 36,
      alignItems: 'center',
      backgroundColor: theme.body,
    },
    contentContainerBottomSheetLegislation: {
      flex: 1,
      position:'relative',
      width: '100%',
      paddingVertical: 36,
      paddingHorizontal: 16,
      alignItems: 'center',
      backgroundColor: theme.body,
    },
    headerContainerBottomSheet: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 16,
    },
    headerContainerTitles: {
      display: 'flex',
      flexDirection: 'column',
    },
    sizeContainerBottomSheet: {
      display: 'flex',
      alignItems: 'center',
    },
    hScientific: {
      marginTop: -12,
      fontSize: 16,
      fontFamily: font.italic,
      color: theme.textDark,
    },
    hSize: {
      marginTop: -8,
      fontSize: 12,
      fontFamily: font.bold,
      color: theme.textDark,
      backgroundColor: theme.body,
    },
    sliderImagesBottomSheet: {
      width: '100%',
      height: '40%',
      borderRadius: 32,
    },
    textDescriptionBottomSheet: {
      marginTop: 16,
      marginBottom: 16,
      fontFamily: font.regular,
      color: theme.textDark,
    },
    researchItem: {
      fontSize: 16,
      padding: 6,
      borderColor: '#00000010',
      borderBottomWidth: 2,
      borderRadius: 8,
      color: theme.textHighlightDark, // If you're using theme, otherwise use a color code
    },
	}), [theme, font]);

	return styles;
};

export default GlobalStyles;
