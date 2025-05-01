import React from 'react';
import { View, Pressable } from 'react-native';
import HitAreaStyles from "../../styles/atoms/hitAreaStyles.tsx";

export default function HitArea() {
	const styles = HitAreaStyles();

	return (
		<Pressable style={styles.hitContainer}>
			<View style={styles.hitBar} />
		</Pressable>
	);
};