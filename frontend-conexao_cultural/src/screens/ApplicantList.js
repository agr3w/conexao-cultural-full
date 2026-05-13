import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const APPLICANTS = [
  {
    id: 'app_1',
    name: 'O Bardo Misterioso',
    vibe: 'Acústico / Folk',
    rating: 4.8,
    xp: 'XP 920',
  },
  {
    id: 'app_2',
    name: 'Lira de Aço',
    vibe: 'Rock / Alternativo',
    rating: 4.5,
    xp: 'XP 870',
  },
  {
    id: 'app_3',
    name: 'Coro da Madrugada',
    vibe: 'MPB / Atmosférico',
    rating: 4.9,
    xp: 'XP 1.040',
  },
];

function getStarFill(index, rating) {
  const threshold = index + 1;
  if (rating >= threshold) return 'star';
  if (rating >= threshold - 0.5) return 'star-half';
  return 'star-outline';
}

function ApplicantCard({ item, navigation }) {
  const handleHire = () => {
    Alert.alert(
      'Pacto selado',
      'O pacto foi selado! A crônica da sua taverna foi atualizada.',
      [
        {
          text: 'OK',
          onPress: () => navigation?.goBack?.(),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.vibe}>{item.vibe}</Text>
        </View>

        <View style={styles.ratingPill}>
          <Ionicons name="sparkles" size={14} color="#131313" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}/5</Text>
        </View>
      </View>

      <View style={styles.starsRow}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Ionicons key={`${item.id}_star_${index}`} name={getStarFill(index, item.rating)} size={16} color="#E7C95E" />
        ))}
        <Text style={styles.xpText}>{item.xp}</Text>
      </View>

      <TouchableOpacity style={styles.hireButton} onPress={handleHire} activeOpacity={0.92}>
        <Text style={styles.hireButtonText}>Selar Pacto (Contratar)</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ApplicantList({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mural de Candidatos</Text>
        <Text style={styles.subtitle}>Escolha o bardo que vai assumir o palco desta data.</Text>
      </View>

      <FlatList
        data={APPLICANTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ApplicantCard item={item} navigation={navigation} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    paddingTop: 52,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    color: THEME.colors.primary,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    color: '#A7A7A7',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  name: {
    color: '#F2F2F2',
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  vibe: {
    color: '#B0B0B0',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7C95E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  ratingText: {
    color: '#131313',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  xpText: {
    marginLeft: 8,
    color: '#9EDBB8',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  hireButton: {
    backgroundColor: '#D4B23A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7C95E',
  },
  hireButtonText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
});