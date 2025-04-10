import { StyleSheet } from 'react-native';
import Colors from './colors.tsx';

const GlobalStyles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: Colors.body,
	},
	h2: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 16, // previously marginVertical
		color: Colors.textDark,
	},
	titleDark: {
		fontFamily: 'BoldFont',
		textAlign: 'left',
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.textDark,
		marginBottom: 8,
	},
	textDark: {
		fontFamily: 'RegularFont',
		fontSize: 12,
		fontWeight: '400',
		color: Colors.textDark,
		textAlign: 'left',
	},
	textHighlightDark: {
		fontFamily: 'BoldFont',
		fontSize: 14,
		fontWeight: 'bold',
		color: Colors.textHighlightDark,
	},
	textHighlightSearch: {
		backgroundColor: '#0070ff',
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
		color: Colors.textBoldLight,
		transform: [
		{ translateX: '-50%' },
		],
		textShadowColor: 'black', // Shadow color
		textShadowOffset: { width: 1, height: 1 }, // Shadow direction (x, y)
		textShadowRadius: 6,
	},
	propertyCardName: {
		bottom: -10,
	},
	legislationCard: {
		textAlign: 'left',
		marginBottom: 16,
		padding: 16,
		backgroundColor: Colors.searchBarBackground,
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
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 32,
		paddingHorizontal: 10,
		height: 60,
		backgroundColor: Colors.searchBarBackground,
		zIndex: 1,
	  },
	searchBarFocused: {
		backgroundColor: "#EFFDFF",
		borderColor: Colors.textHighlightDark,
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
		backgroundColor: Colors.textHighlightDark,
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
});

export default GlobalStyles;