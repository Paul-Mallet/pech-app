import React from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

export default function HitArea() {
	const { theme } = useTheme();

	return (
		<Pressable 
			style={{ 
			paddingVertical: 20,
			paddingHorizontal: '30%',
			justifyContent: 'center',
			}}
		>
			<View
				style={{
					width: 40,
					height: 5,
					borderRadius: 4,
					backgroundColor: theme.textDark,
					opacity: 0.7,
					alignSelf: 'center',
				}}
			/>
		</Pressable>
	);
};