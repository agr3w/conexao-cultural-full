import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const TYPE_OPTIONS = ['Pizzaria', 'Bar', 'Casa de Shows', 'Café', 'Clube'];
const VIBE_TAGS = ['Gótica', 'Rock Clássico', 'Underground', 'Jazz Noir', 'Acústica', 'Intimista'];

export default function EstablishmentSetup({ navigation }) {
  const [establishmentName, setEstablishmentName] = useState('');
  const [establishmentType, setEstablishmentType] = useState('Bar');
  const [establishmentVibe, setEstablishmentVibe] = useState('Rock Clássico');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    const safeName = establishmentName.trim() || 'Sua Taverna';

    Alert.alert(
      'Local consagrado',
      `${safeName} foi cadastrado com sucesso.`,
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
        <Text style={styles.title}>Forja de Locais</Text>
        <Text style={styles.subtitle}>Dê alma, textura e identidade ao seu espaço.</Text>
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

        <Text style={styles.label}>Tipo de Estabelecimento</Text>
        <View style={styles.chipRow}>
          {TYPE_OPTIONS.map((type, index) => {
            const selected = establishmentType === type;
            return (
              <TouchableOpacity
                key={`${type}-${index}`}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setEstablishmentType(type)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{type}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Vibe da Casa</Text>
        <View style={styles.chipRow}>
          {VIBE_TAGS.map((vibe, index) => {
            const selected = establishmentVibe === vibe;
            return (
              <TouchableOpacity
                key={`${vibe}-${index}`}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setEstablishmentVibe(vibe)}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{vibe}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Descrição do que o local procura</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Procuramos bandas de Doom Metal e Jazz experimental."
          placeholderTextColor="#6E6E6E"
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Text style={styles.label}>Endereço</Text>
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSave} activeOpacity={0.92}>
        <Text style={styles.submitButtonText}>Consagrar Local</Text>
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
});