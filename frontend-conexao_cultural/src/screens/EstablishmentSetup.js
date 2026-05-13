import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../styles/colors';
import { createNewPlace } from '../service/places';

const VIBE_TAGS = ['Rock', 'Blues', 'Gótico', 'Jazz Noir', 'Acústica', 'Intimista', 'Eletrônico'];

export default function EstablishmentSetup({ navigation, route }) {
  const [establishmentName, setEstablishmentName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('Rock');
  const [callText, setCallText] = useState('');
  const [address, setAddress] = useState('');
  const ownerUserId = route?.params?.ownerUserId || '';
  const transitionMessage = route?.params?.transitionMessage;
  const progressLabel = 'Passo 2 de 2';
  const previewName = establishmentName.trim() || 'Sua Taverna';
  const previewVibe = selectedVibe || 'Vibe não definida';
  const previewAddress = address.trim() || 'Endereço será revelado ao reino';
  const previewCall = callText.trim() || 'O que você busca em um bardo para sua casa?';

  const handleSave = () => {
    const safeName = establishmentName.trim() || 'Sua Taverna';

    createNewPlace({
      ownerUserId,
      name: safeName,
      vibe: selectedVibe,
      address: address.trim() || 'Endereço a definir',
      description: callText.trim(),
      category: 'Taverna',
      type: 'bar',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
    });

    navigation?.dispatch?.(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            params: {
              screen: 'FeedTab',
              params: {
                onboardingMessage: `${safeName} foi consagrado.`,
              },
            },
          },
        ],
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.progressBadge}>
          <Ionicons name="hourglass-outline" size={16} color={THEME.colors.primary} />
          <Text style={styles.progressText}>{progressLabel}</Text>
        </View>
        <Text style={styles.title}>Forja de Locais</Text>
        <Text style={styles.subtitle}>Dê alma, textura e identidade ao seu espaço.</Text>
      </View>

      {transitionMessage ? (
        <View style={styles.transitionCard}>
          <Ionicons name="sparkles-outline" size={20} color={THEME.colors.primary} />
          <Text style={styles.transitionText}>{transitionMessage}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.label}>Alcunha do Lugar</Text>
        <TextInput
          value={establishmentName}
          onChangeText={setEstablishmentName}
          placeholder="Ex: Taverna do Dragão"
          placeholderTextColor="#6E6E6E"
          style={styles.input}
        />

        <Text style={styles.label}>A Vibe (Grimório de Estilos)</Text>
        <View style={styles.chipRow}>
          {VIBE_TAGS.map((vibe, index) => {
            const selected = selectedVibe === vibe;
            return (
              <TouchableOpacity
                key={`${vibe}-${index}`}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setSelectedVibe(vibe)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{vibe}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>O Chamado</Text>
        <TextInput
          value={callText}
          onChangeText={setCallText}
          placeholder="O que você busca em um bardo para sua casa?"
          placeholderTextColor="#6E6E6E"
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Text style={styles.label}>Localização no Reino</Text>
        <View style={styles.addressWrap}>
          <Ionicons name="navigate-outline" size={18} color={THEME.colors.primary} style={styles.addressIcon} />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Detectando via GPS ou digite o endereço do reino"
            placeholderTextColor="#6E6E6E"
            style={styles.addressInput}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSave} activeOpacity={0.92}>
        <Text style={styles.submitButtonText}>Consagrar Taverna e Entrar no Reino</Text>
      </TouchableOpacity>

      <View style={styles.previewSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.previewTitle}>Preview do Oráculo</Text>
          <Text style={styles.previewHint}>Como os Artistas verão o seu local na busca</Text>
        </View>

        <View style={styles.previewCardWrap}>
          <LinearGradient
            colors={['#1B1B1B', '#111111', '#0B0B0B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.previewCard}
          >
            <View style={styles.previewBanner}>
              <View style={styles.previewBadgeRow}>
                <View style={styles.previewBadge}>
                  <Ionicons name="wine-outline" size={14} color="#000" />
                  <Text style={styles.previewBadgeText}>Local</Text>
                </View>
                <View style={[styles.previewBadge, styles.previewBadgeGhost]}>
                  <Ionicons name="musical-notes-outline" size={14} color={THEME.colors.primary} />
                  <Text style={[styles.previewBadgeText, styles.previewBadgeGhostText]}>Em destaque</Text>
                </View>
              </View>

              <Text style={styles.previewName} numberOfLines={1}>{previewName}</Text>
              <Text style={styles.previewVibe} numberOfLines={1}>{previewVibe}</Text>
              <View style={styles.previewMetaRow}>
                <Ionicons name="location-outline" size={12} color="#E4D5A1" />
                <Text style={styles.previewMetaText} numberOfLines={1}>{previewAddress}</Text>
              </View>
            </View>

            <View style={styles.previewBody}>
              <Text style={styles.previewCallLabel}>O Chamado</Text>
              <Text style={styles.previewCallText} numberOfLines={3}>{previewCall}</Text>

              <View style={styles.previewFooter}>
                <View>
                  <Text style={styles.previewFooterLabel}>Busca ativa</Text>
                  <Text style={styles.previewFooterValue}>Artistas e bardos</Text>
                </View>
                <View style={styles.previewFooterChip}>
                  <Ionicons name="sparkles-outline" size={14} color="#000" />
                  <Text style={styles.previewFooterChipText}>Ver no Oráculo</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: THEME.colors.background,
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 30,
  },
  hero: {
    marginBottom: 18,
  },
  progressBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#171410',
    borderWidth: 1,
    borderColor: '#4C3C16',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  progressText: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  transitionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#171410',
    borderWidth: 1,
    borderColor: '#4C3C16',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  transitionText: {
    flex: 1,
    color: THEME.colors.text,
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    color: THEME.colors.primary,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    color: '#A6A6A6',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 14,
    color: THEME.colors.text,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  addressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#2D2D2D',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  addressIcon: {
    marginRight: 10,
  },
  addressInput: {
    flex: 1,
    color: THEME.colors.text,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    paddingVertical: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#3A3220',
    backgroundColor: '#191714',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  chipText: {
    color: '#D6D6D6',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  chipTextSelected: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: THEME.colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7C95E',
    shadowColor: THEME.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  submitButtonText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  previewSection: {
    marginTop: 14,
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  previewTitle: {
    color: THEME.colors.primary,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  previewHint: {
    color: '#9C9C9C',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  previewCardWrap: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  previewCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2B2B2B',
    overflow: 'hidden',
  },
  previewBanner: {
    minHeight: 150,
    padding: 14,
    justifyContent: 'flex-end',
    backgroundColor: '#111',
  },
  previewBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  previewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  previewBadgeGhost: {
    backgroundColor: 'rgba(20,20,20,0.88)',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  previewBadgeText: {
    color: '#000',
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  previewBadgeGhostText: {
    color: THEME.colors.primary,
  },
  previewName: {
    color: '#F4E1A6',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 22,
    marginBottom: 2,
  },
  previewVibe: {
    color: '#EFEFEF',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  previewMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  previewMetaText: {
    flex: 1,
    color: '#D7D0BD',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  previewBody: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#121212',
  },
  previewCallLabel: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  previewCallText: {
    color: '#D4D4D4',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  previewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  previewFooterLabel: {
    color: '#8D8D8D',
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  previewFooterValue: {
    color: '#EFEFEF',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  previewFooterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  previewFooterChipText: {
    color: '#000',
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    textTransform: 'uppercase',
  },
});