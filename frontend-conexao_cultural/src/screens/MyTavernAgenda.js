import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const WEEK_AGENDA = [
  { id: 'mon', day: 'Segunda', date: '13/05', status: 'empty' },
  { id: 'tue', day: 'Terça', date: '14/05', status: 'open' },
  { id: 'wed', day: 'Quarta', date: '15/05', status: 'confirmed', artistName: 'O Bardo Misterioso' },
  { id: 'thu', day: 'Quinta', date: '16/05', status: 'empty' },
  { id: 'fri', day: 'Sexta', date: '17/05', status: 'open' },
  { id: 'sat', day: 'Sábado', date: '18/05', status: 'confirmed', artistName: 'Cavaleiro do Som' },
  { id: 'sun', day: 'Domingo', date: '19/05', status: 'empty' },
];

function AgendaCard({ item, navigation }) {
  const isOpen = item.status === 'open';
  const isConfirmed = item.status === 'confirmed';

  return (
    <View style={[styles.card, isOpen && styles.cardOpen, isConfirmed && styles.cardConfirmed]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {isConfirmed && (
          <View style={styles.confirmBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#07110A" />
            <Text style={styles.confirmBadgeText}>Selo</Text>
          </View>
        )}
      </View>

      {item.status === 'empty' && (
        <>
          <Text style={styles.emptyText}>Nenhum chamado mapeado para este dia.</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => Alert.alert('Chamado aberto', 'O chamado para este dia foi preparado no grimório da taverna.')}
          >
            <Text style={styles.actionButtonPrimaryText}>Abrir Chamado para Bardo</Text>
          </TouchableOpacity>
        </>
      )}

      {item.status === 'open' && (
        <>
          <Text style={styles.openText}>Aguardando Candidatos</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonYellow]}
            onPress={() => navigation?.navigate?.('ApplicantList')}
          >
            <Text style={styles.actionButtonYellowText}>Ver Candidatos</Text>
          </TouchableOpacity>
        </>
      )}

      {item.status === 'confirmed' && (
        <>
          <View style={styles.confirmRow}>
            <Ionicons name="checkmark-circle" size={20} color="#29D97D" />
            <Text style={styles.confirmText}>{item.artistName}</Text>
          </View>
          <Text style={styles.confirmHelper}>Show confirmado e pronto para o ritual.</Text>
        </>
      )}
    </View>
  );
}

export default function MyTavernAgenda({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grimório da Taverna</Text>
        <Text style={styles.subtitle}>Agenda semanal do anfitrião para administrar chamados e pactos.</Text>
      </View>

      <FlatList
        data={WEEK_AGENDA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AgendaCard item={item} navigation={navigation} />}
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
  cardOpen: {
    borderColor: '#B58B1E',
    backgroundColor: '#1A1609',
  },
  cardConfirmed: {
    borderColor: '#214C2E',
    backgroundColor: '#0F1A11',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dayText: {
    color: '#F2F2F2',
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
  },
  dateText: {
    color: '#A0A0A0',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginTop: 3,
  },
  confirmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4B23A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  confirmBadgeText: {
    color: '#07110A',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  emptyText: {
    color: '#C9C9C9',
    fontFamily: 'Lato_400Regular',
    marginBottom: 12,
  },
  openText: {
    color: '#F0D76E',
    fontFamily: 'Lato_700Bold',
    marginBottom: 12,
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  confirmText: {
    color: '#D8F8E4',
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  confirmHelper: {
    color: '#9FD6B6',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
  },
  actionButton: {
    marginTop: 2,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
  },
  actionButtonPrimary: {
    backgroundColor: '#D4B23A',
    borderColor: '#E7C95E',
  },
  actionButtonPrimaryText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
  actionButtonYellow: {
    backgroundColor: '#2A2208',
    borderColor: '#B58B1E',
  },
  actionButtonYellowText: {
    color: '#F0D76E',
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
});