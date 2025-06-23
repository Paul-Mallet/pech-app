import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import {
	View,
	Linking,
	Text,
	Button,
	ActivityIndicator,
	BackHandler,
	TouchableOpacity,
	Modal,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { getLegislationById } from '../../services/fish.service.tsx';
import { Legislation, LegislationSheetProps } from '../../models/legislation.model.tsx';
import { useFocusEffect } from '@react-navigation/native';

const LegislationSheet = ({ legislationId, visible, onClose }: LegislationSheetProps) => {
	const [stats, setStats] = useState<Legislation | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { theme } = useTheme();
	const styles = GlobalStyles();

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if (visible) {
					onClose();
					return true;
				}
				return false;
			};
			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [visible])
	);

	const fetchLegislation = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const legislation = await getLegislationById(legislationId);
			setStats(legislation);
		} catch {
			setError("Impossible de charger les infos de la legislation.");
			setStats(null);
		} finally {
			setLoading(false);
		}
	}, [legislationId]);

	useEffect(() => {
		if (visible) fetchLegislation();
	}, [visible, fetchLegislation]);

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.modalBackdrop} />
			</TouchableWithoutFeedback>

			<View style={styles.modalContainer}>
				<TouchableOpacity onPress={onClose} style={styles.closeIcon} hitSlop={{ top: 10, bottom: 10, left: 150, right: 150 }}>
					<Ionicons name="chevron-down" size={32} color={theme.textDark} />
				</TouchableOpacity>

				{loading ? (
					<View style={styles.modalContent}>
						<ActivityIndicator size="large" color={theme.textDark} />
						<Text style={styles.h2}>Chargement...</Text>
					</View>
				) : error || !stats ? (
					<View style={styles.modalContent}>
						<Text style={styles.h2}>Erreur</Text>
						<Text>{error || "Données non disponibles"}</Text>
						<Button title="Réessayer" onPress={fetchLegislation} color={theme.textDark} />
					</View>
				) : (
					<ScrollView
						style={styles.modalContent}
						contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
						showsVerticalScrollIndicator
						keyboardShouldPersistTaps="handled"
					>
						<View style={styles.headerContainerBottomSheet}>
							<View>
								<Text style={[styles.h2, { fontSize: 16, lineHeight: 24 }]}>{stats.title}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Ionicons name="calendar" size={16} color={theme.textDark} style={{ marginRight: 8, marginTop: -4, marginBottom: 16 }} />
									<Text style={[styles.hScientific, { marginTop: 0, marginBottom: 20 }]}>{stats.date}</Text>
								</View>
							</View>
						</View>
						<Text style={[styles.textDescriptionBottomSheet, {marginBottom: 16}]}>{stats.article}</Text>
						<TouchableOpacity onPress={() => Linking.openURL(`${stats.link}`)}>
							<Text style={[styles.textDescriptionBottomSheet, { color: theme.textHighlightDark, textDecorationLine: 'underline' }]}>
								Réglementation complète
							</Text>
						</TouchableOpacity>
					</ScrollView>
				)}
			</View>
		</Modal>
	);
};

export default LegislationSheet;
