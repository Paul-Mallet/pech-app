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
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 0,
      marginBottom: 60,
      marginTop: 0,
    },
    homePanelTabs: {
      marginTop: 60,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'ffffff10',
      flexDirection: "row",
      width: '100%',
      height: 40,
    },
    fishCardsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: '100%',
      height: 160,
      marginBottom: 20,
      // flex: 1,
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
      backgroundColor: theme.cardBackground,
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
      paddingBottom: 6,
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
      color: theme.textHighlightDark,
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
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      padding: 8,
      borderRadius: '50%',
      backgroundColor: theme.textHighlightDark,
      
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
    viewContainerBottomSheet: {
      position: 'absolute', 
      height: '85%', 
      width: "100%", 
      bottom: 0,
      zIndex: 999, 
      elevation: 999
    },
    containerBottomSheet: {
      backgroundColor: theme.body,
      borderTopStartRadius: 32,
      borderTopEndRadius: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      paddingTop: 10,
      // elevation: 10,
    },
    contentContainerBottomSheet: {
      flex: 1,
      position:'relative',
      width: '100%',
      alignItems: 'center',
      backgroundColor: theme.body,
      paddingTop: 0,
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
    },
    headerContainerTitles: {
      display: 'flex',
      flexDirection: 'column',
    },
    sizeContainerBottomSheet: {
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
    },
    hScientific: {
      fontSize: 16,
      fontFamily: font.italic,
      color: theme.textDark,
    },
    hSize: {
      marginTop: -8,
      fontSize: 12,
      fontFamily: font.regular,
      color: theme.textDark,
      backgroundColor: theme.body,
    },
    sliderImagesBottomSheet: {
      width: '100%',
      height: '40%',
      borderRadius: 32,
    },
    textDescriptionBottomSheet: {
      fontFamily: font.regular,
      color: theme.textDark,
    },
    researchItem: {
      fontSize: 16,
      padding: 6,
      paddingLeft: 16,
      borderColor: '#00000010',
      borderBottomWidth: 1,
      borderRadius: 8,
      color: theme.textHighlightDark, // If you're using theme, otherwise use a color code
    },
    expandableSection:
    {
      marginBottom: 12,
      borderRadius: 24,
      backgroundColor: theme.cardBackground,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			elevation: 2,
      overflow: 'hidden',
    },
    expandableSectionButton:
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 12,
    },
    expandableSectionList:
    {},
    topButtonsFishScreen:
    {
      zIndex: 10,
      position: 'absolute',
      top: 10,
      right: 20,
      flexDirection: 'row',
      gap: 6
    },
    modalBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.body,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
      maxHeight: '75%',
      overflow: 'hidden',
    },
    modalContent: {
      flex: 1,
    },
    closeIcon: {
      alignSelf: 'center',
      width: '100%',
      alignItems: 'center',
      transform: [{ scaleX: 2 }]
    },
	}), [theme, font]);

	return styles;
};

export default GlobalStyles;
