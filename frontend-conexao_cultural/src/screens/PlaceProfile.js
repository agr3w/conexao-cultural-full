import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const PLACE_GALLERY = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
  'https://images.unsplash.com/photo-1521337581100-8ca9a73a5aeb?q=80&w=800',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800',
];

const PLACE_VIBES = ['Rock', 'Jazz', 'Open Mic', 'Intimista'];

function formatAddress(address) {
  return String(address || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' • ');
}

export default function PlaceProfile({ place, onBack, onOpenMap, userProfile = 'viewer' }) {
  const isArtist = userProfile === 'artist';

  const PLACE = useMemo(() => ({
    name: place?.name || 'Santuário Desconhecido',
    vibe: place?.vibe || 'Sem vibe definida',
    image: place?.image || 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800',
    type: place?.category || 'Local / Santuário',
    address: place?.address || 'Centro Histórico, Curitiba - PR',
    description:
      place?.description ||
      'Um ponto de encontro para noites intensas, som autoral e experiências fora do comum.',
    nextEvent: place?.nextEvent || 'Sexta-feira • 22:00',
    capacity: place?.capacity || 180,
  }), [place]);

  const actionLabel = isArtist ? 'Oferecer Show' : 'Ver Próximos Eventos';

  const handlePrimaryAction = () => {
    if (isArtist) {
      alert('Sua oferta de show foi preparada para o estabelecimento.');
      return;
    }

    alert('Abrindo os próximos eventos desta taverna.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerWrap}>
          <Image source={{ uri: PLACE.image }} style={styles.banner} />
          <View style={styles.bannerOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.bannerTextWrap}>
            <Text style={styles.name}>{PLACE.name}</Text>
            <Text style={styles.type}>{PLACE.type}</Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Ionicons name="flame" size={14} color="#000" />
          <Text style={styles.badgeText}>{PLACE.vibe}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sobre a Taverna</Text>
          <Text style={styles.description}>{PLACE.description}</Text>

          <View style={styles.tagRow}>
            {PLACE_VIBES.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Galeria de Fotos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRow}>
            {PLACE_GALLERY.map((image, index) => (
              <View key={`${PLACE.name}_gallery_${index}`} style={styles.galleryItem}>
                <Image source={{ uri: image }} style={styles.galleryImage} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={THEME.colors.primary} />
            <Text style={styles.infoText}>{formatAddress(PLACE.address)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={THEME.colors.primary} />
            <Text style={styles.infoText}>Próximo ritual: {PLACE.nextEvent}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={16} color={THEME.colors.primary} />
            <Text style={styles.infoText}>Capacidade: {PLACE.capacity} pessoas</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryAction} onPress={handlePrimaryAction} activeOpacity={0.9}>
          <Text style={styles.primaryActionText}>{actionLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} onPress={onOpenMap} activeOpacity={0.9}>
          <Text style={styles.secondaryActionText}>Ver no Mapa</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.background },
  content: { padding: 20, paddingBottom: 40 },
  bannerWrap: {
    marginBottom: 14,
    borderRadius: 20,
    overflow: 'hidden',
    height: 260,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#262626',
  },
  banner: { width: '100%', height: '100%' },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 8,
  },
  bannerTextWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 18,
  },
  name: {
    fontFamily: 'Cinzel_700Bold',
    color: '#F4E1A6',
    fontSize: 30,
  },
  type: {
    marginTop: 4,
    color: '#E3E3E3',
    fontFamily: 'Lato_400Regular',
  },
  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    marginLeft: 6,
    color: '#000',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  sectionCard: {
    marginTop: 14,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 18,
    padding: 16,
  },
  sectionTitle: {
    color: THEME.colors.primary,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  infoText: { color: '#DDD', marginLeft: 8, fontFamily: 'Lato_400Regular', flex: 1, lineHeight: 20 },
  description: {
    color: '#B8B8B8',
    fontFamily: 'Lato_400Regular',
    lineHeight: 22,
    marginBottom: 14,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#3A3220',
    backgroundColor: '#191714',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: '#E7C95E',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  galleryRow: {
    paddingRight: 6,
    gap: 12,
  },
  galleryItem: {
    width: 170,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  primaryAction: {
    marginTop: 16,
    backgroundColor: THEME.colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#111',
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  secondaryAction: {
    marginTop: 12,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
});