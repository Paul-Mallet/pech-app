import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import LegislationStyles from '../../styles/pages/LegislationStyles.tsx';

interface LegislationCardProps {
  	children?: ReactNode;
	onPress: () => void;
}

const LegislationPanel = ({ children, onPress }: LegislationCardProps) => {
	const legislationStyles = LegislationStyles();

	return (
		<ScrollView style={legislationStyles.legislationPanel}>
			{children}
		</ScrollView>
	);
};

export default LegislationPanel;