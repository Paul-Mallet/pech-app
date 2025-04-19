import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from './ThemeContext.tsx'; // Adjust if path differs
import GlobalStyles from '../../styles/base/globalStyles.tsx';

type Props = {
	activeTab: string;
	switchTab: (target: string) => void;
	tabs: { key: string; label: string }[];
};

const TabSwitcher = ({ activeTab, switchTab, tabs }: Props) => {
	const styles = GlobalStyles();
	const { theme } = useTheme();

	return (
		<View>
			<View style={styles.homePanelTabs}>
				{tabs.map(({ key, label }) => (
					<TouchableOpacity
						key={key}
						onPress={() => switchTab(key)}
						style={{
							flex: 1 / tabs.length,
							borderBottomWidth: 2,
							borderBottomColor: activeTab === key ? theme.navBarBackground : 'transparent',
						}}
					>
						<Text
							style={[
								styles.textDark,
								{
									textAlign: 'center',
									fontSize: 16,
									color: activeTab === key ? theme.textHighlightDark : theme.textDark,
								},
							]}
						>
							{label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default TabSwitcher;
