import { StyleSheet } from 'react-native';

const LegislationStyles = StyleSheet.create({

	legislationPanel: {
		display: "flex",
		flexDirection: "column",
		paddingTop: 0,
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 0,
		marginBottom: 60,
		marginTop: 110,
	  },
	legislationParagraph: {
		position: "relative",
		width: '100%',
		padding: 8,
		borderRadius: 8,
		// overflow: 'hidden',
		shadowColor: '#00000010',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	  },
});

export default LegislationStyles;