import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { THEME } from '../styles/colors';

export default function ContractProposal({ navigation }) {
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [cacheValue, setCacheValue] = useState('');
  const [equipment, setEquipment] = useState('');

  const sendProposal = () => {
    Alert.alert(
      'Proposta enviada',
      'Proposta enviada com sucesso para o grimório do artista!',
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
      <View style={styles.header}>
        <Text style={styles.title}>Pacto de Contrato</Text>
        <Text style={styles.subtitle}>Envie uma proposta ao artista com os detalhes essenciais do chamado.</Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.field}>
          <Text style={styles.label}>Data do evento</Text>
          <TextInput
            value={eventDate}
            onChangeText={setEventDate}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#6F6F6F"
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horário</Text>
          <TextInput
            value={eventTime}
            onChangeText={setEventTime}
            placeholder="HH:MM"
            placeholderTextColor="#6F6F6F"
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Valor do Cachê (R$)</Text>
          <TextInput
            value={cacheValue}
            onChangeText={setCacheValue}
            placeholder="Ex: 1500"
            placeholderTextColor="#6F6F6F"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Equipamentos necessários</Text>
          <TextInput
            value={equipment}
            onChangeText={setEquipment}
            placeholder="Ex: 2 microfones, pedestal, retorno e mesa de som"
            placeholderTextColor="#6F6F6F"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={sendProposal} activeOpacity={0.9}>
          <Text style={styles.submitButtonText}>Selar Pacto (Enviar Proposta)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: THEME.colors.background,
    padding: 20,
    paddingTop: 52,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: THEME.colors.primary,
    fontSize: 28,
    fontFamily: 'Cinzel_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato_400Regular',
  },
  formCard: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#252525',
    borderRadius: 18,
    padding: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: THEME.colors.primary,
    fontSize: 14,
    fontFamily: 'Lato_700Bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    color: THEME.colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: 'Lato_400Regular',
  },
  textArea: {
    minHeight: 108,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 4,
    backgroundColor: THEME.colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: THEME.colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Lato_700Bold',
  },
});