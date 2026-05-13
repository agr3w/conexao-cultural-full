import React, { useMemo } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const APPLICANTS = [
  {
    id: 'app_1',
    name: 'O Bardo Misterioso',
    artistProfileId: 'applicant_artist_1',
    vibe: 'Acústico / Folk',
    repertoire: 'Cover 80s / Baladas de taverna',
    instrumentation: 'Voz e Violão',
    bio: 'Entrega atmosfera íntima, repertório afetivo e conduz a noite com presença suave.',
    rating: 4.8,
    xp: 'XP 920',
  },
  {
    id: 'app_2',
    name: 'Lira de Aço',
    artistProfileId: 'applicant_artist_2',
    vibe: 'Rock / Alternativo',
    repertoire: 'Autoral Indie / Rock de garagem',
    instrumentation: 'Banda Completa',
    bio: 'Mistura energia de palco com letras autorais e mantém o público em alta rotação.',
    rating: 4.5,
    xp: 'XP 870',
  },
  {
    id: 'app_3',
    name: 'Coro da Madrugada',
    artistProfileId: 'applicant_artist_3',
    vibe: 'MPB / Atmosférico',
    repertoire: 'MPB contemporânea / versões elegantes',
    instrumentation: 'Voz, teclado e percussão leve',
    bio: 'Ideal para casas que buscam sofisticação e um clima envolvente sem perder movimento.',
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

function ApplicantCard({ item, navigation, eventLabel }) {
  const handleHire = () => {
    Alert.alert(
      'Confirmação de contratação',
      `Deseja contratar ${item.name} para o dia ${eventLabel}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Selar Pacto',
          onPress: () => {
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
          },
        },
      ]
    );
  };

  const handleOpenPortfolio = () => {
    navigation?.navigate?.('ArtistProfile', {
      artistProfileId: item.artistProfileId,
      artistPreviewName: item.name,
    });
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

      <View style={styles.detailRow}>
        <Ionicons name="library-outline" size={16} color={THEME.colors.primary} />
        <Text style={styles.detailText}>Repertório: {item.repertoire}</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="musical-notes-outline" size={16} color={THEME.colors.primary} />
        <Text style={styles.detailText}>Instrumentação: {item.instrumentation}</Text>
      </View>

      <Text style={styles.bio}>{item.bio}</Text>

      <TouchableOpacity style={styles.portfolioButton} onPress={handleOpenPortfolio} activeOpacity={0.9}>
        <Text style={styles.portfolioButtonText}>Ver Portfólio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.hireButton} onPress={handleHire} activeOpacity={0.92}>
        <Text style={styles.hireButtonText}>Selar Pacto (Contratar)</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ApplicantList({ navigation, route }) {
  const eventLabel = useMemo(() => {
    const day = route?.params?.day;
    const date = route?.params?.date;
    if (day && date) return `${day} (${date})`;
    if (date) return date;
    return 'a data selecionada';
  }, [route?.params?.day, route?.params?.date]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mural de Candidatos</Text>
        <Text style={styles.subtitle}>Escolha o bardo que vai assumir o palco desta data.</Text>
        <Text style={styles.eventLabel}>Agenda: {eventLabel}</Text>
      </View>

      <FlatList
        data={APPLICANTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ApplicantCard item={item} navigation={navigation} eventLabel={eventLabel} />}
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
  eventLabel: {
    marginTop: 10,
    color: '#E7C95E',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailText: {
    flex: 1,
    marginLeft: 8,
    color: '#DADADA',
    fontFamily: 'Lato_400Regular',
    lineHeight: 19,
  },
  bio: {
    color: '#B8B8B8',
    fontFamily: 'Lato_400Regular',
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 14,
  },
  portfolioButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#323232',
    marginBottom: 10,
  },
  portfolioButtonText: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
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