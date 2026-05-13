import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const VIBE_TAGS = ['Rock', 'Jazz', 'Open Mic', 'Intimista', 'MPB', 'Acústico'];

const GALLERY_SLOTS = [1, 2, 3, 4];

export default function EstablishmentSetup({ navigation }) {
  const [establishmentName, setEstablishmentName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [selectedVibes, setSelectedVibes] = useState(['Rock']);
  const [galleryCount, setGalleryCount] = useState(1);

  const galleryItems = useMemo(
    () => GALLERY_SLOTS.map((slot) => ({ id: `slot_${slot}`, filled: slot <= galleryCount })),
    [galleryCount]
  );

  const toggleVibe = (vibe) => {
    setSelectedVibes((prev) => {
      if (prev.includes(vibe)) {
        return prev.filter((item) => item !== vibe);
      }

      return [...prev, vibe];
    });
  };

  const addGallerySlot = () => {
    setGalleryCount((prev) => Math.min(prev + 1, GALLERY_SLOTS.length));
  };

  const handleSave = () => {
    const safeName = establishmentName.trim() || 'Sua Taverna';

    Alert.alert(
      'Taverna consagrada',
      `${safeName} foi configurada com sucesso.`,
      [
        {
          text: 'OK',
          onPress: () => navigation?.goBack?.(),
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.title}>Forja do Estabelecimento</Text>
        <Text style={styles.subtitle}>Dê alma, textura e identidade à sua taverna.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome do Estabelecimento</Text>
        <TextInput
          value={establishmentName}
          onChangeText={setEstablishmentName}
          placeholder="Ex: Taverna do Dragão"
          placeholderTextColor="#6E6E6E"
          style={styles.input}
        />

        <Text style={styles.label}>Biografia / Descrição do Lugar</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Conte a vibe, a energia e o que faz sua casa especial."
          placeholderTextColor="#6E6E6E"
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Text style={styles.label}>Endereço Completo</Text>
        <View style={styles.addressWrap}>
          <Ionicons name="location-outline" size={18} color={THEME.colors.primary} style={styles.addressIcon} />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Rua, número, bairro, cidade"
            placeholderTextColor="#6E6E6E"
            style={styles.addressInput}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Vibes da Casa</Text>
        <View style={styles.tagRow}>
          {VIBE_TAGS.map((tag, index) => {
            const selected = selectedVibes.includes(tag);
            return (
              <TouchableOpacity
                key={`${tag}-${index}`}
                style={[styles.tag, selected && styles.tagSelected]}
                onPress={() => toggleVibe(tag)}
                activeOpacity={0.85}
              >
                <Text style={[styles.tagText, selected && styles.tagTextSelected]}>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Galeria de Fotos</Text>
        <Text style={styles.helperText}>Toque no botão de adicionar para simular o upload de imagens.</Text>

        <View style={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <View key={item.id} style={styles.gallerySlot}>
              {item.filled ? (
                <>
                  <Ionicons name="image" size={30} color={THEME.colors.primary} />
                  <Text style={styles.gallerySlotText}>Foto</Text>
                </>
              ) : (
                <TouchableOpacity style={styles.galleryEmptyAction} onPress={addGallerySlot} activeOpacity={0.85}>
                  <Ionicons name="add" size={26} color="#1B1B1B" />
                  <Text style={styles.gallerySlotTextDark}>Adicionar</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSave} activeOpacity={0.92}>
        <Text style={styles.submitButtonText}>Consagrar Taverna</Text>
      </TouchableOpacity>
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
  sectionTitle: {
    color: THEME.colors.primary,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  helperText: {
    color: '#A6A6A6',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  tagSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  tagText: {
    color: '#D6D6D6',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  tagTextSelected: {
    color: '#111111',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gallerySlot: {
    width: '47%',
    aspectRatio: 1.15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3A3220',
    backgroundColor: '#171511',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  galleryEmptyAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#E7C95E',
  },
  gallerySlotText: {
    marginTop: 8,
    color: '#E7C95E',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  gallerySlotTextDark: {
    marginTop: 8,
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
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
});