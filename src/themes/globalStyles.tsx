import { StyleSheet } from 'react-native';
import Colors from './colors.tsx'; // assuming you already created this

const GlobalStyles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#F6F4EB',
	},
	h2: {
		fontSize: 24,
		fontWeight: '700',
		marginVertical: 16,
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
		// textShadowColor: '#00000088',
		// textShadowOffset: { width: 0.5, height: 0.5 },
		// textShadowRadius: 1,
	},
	centered: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeCard: {
		display: "flex",
		flexDirection: "column",
		padding: 32,
		width: "100%"
	},
	fishCardsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	fishCardContainer: {
		position: "relative",
		width: '47.5%',
		aspectRatio: 1,
		padding: 16,
		borderRadius: 24,
		backgroundColor: "#fff",
		overflow: 'hidden',
		// iOS shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		// Android elevation
		elevation: 10,
	},
	backgroundImage: {
		// position: 'absolute',
		width: '100%',
		height: '100%',
		transform: [{ scale: 2 }],
		top: -16,
		left: -16,
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
	legislationCard: {
		textAlign: 'left',
		marginBottom: 16,
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