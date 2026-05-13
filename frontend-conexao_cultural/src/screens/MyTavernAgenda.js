import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const WEEK_AGENDA = [
  { id: 'mon', day: 'Segunda', date: '13/05', status: 'empty', candidateCount: 0, confirmedCount: 0, health: 5 },
  { id: 'tue', day: 'Terça', date: '14/05', status: 'open', candidateCount: 3, confirmedCount: 0, health: 28 },
  { id: 'wed', day: 'Quarta', date: '15/05', status: 'confirmed', artistName: 'O Bardo Misterioso', time: '22:00', candidateCount: 1, confirmedCount: 42, health: 92 },
  { id: 'thu', day: 'Quinta', date: '16/05', status: 'empty', candidateCount: 0, confirmedCount: 0, health: 10 },
  { id: 'fri', day: 'Sexta', date: '17/05', status: 'open', candidateCount: 7, confirmedCount: 0, health: 45 },
  { id: 'sat', day: 'Sábado', date: '18/05', status: 'confirmed', artistName: 'Cavaleiro do Som', time: '23:30', candidateCount: 2, confirmedCount: 87, health: 100 },
  { id: 'sun', day: 'Domingo', date: '19/05', status: 'empty', candidateCount: 0, confirmedCount: 0, health: 8 },
];

function getHealthMeta(health = 0) {
  if (health >= 80) {
    return { label: 'Saúde alta', color: '#29D97D' };
  }

  if (health >= 45) {
    return { label: 'Saúde estável', color: '#E7C95E' };
  }

  return { label: 'Saúde baixa', color: '#E36A1F' };
}

function AgendaCard({ item, navigation }) {
  const isOpen = item.status === 'open';
  const isConfirmed = item.status === 'confirmed';
  const healthMeta = getHealthMeta(item.health);
  const healthWidth = `${Math.max(8, Math.min(item.health || 0, 100))}%`;

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

      <View style={styles.healthBlock}>
        <View style={styles.healthRow}>
          <View style={[styles.healthDot, { backgroundColor: healthMeta.color }]} />
          <Text style={styles.healthLabel}>Saúde do Evento</Text>
          <Text style={styles.healthMeta}>{healthMeta.label}</Text>
        </View>
        <View style={styles.healthTrack}>
          <View style={[styles.healthFill, { width: healthWidth, backgroundColor: healthMeta.color }]} />
        </View>
      </View>

      {item.status === 'empty' && (
        <>
          <Text style={styles.emptyText}>Nenhum chamado mapeado para este dia.</Text>
          <Text style={styles.metricText}>Sugestão: crie um evento para começar a atrair presença.</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => Alert.alert('Novo ciclo', 'Criar evento ou chamado foi acionado no grimório da taverna.')}
          >
            <Text style={styles.actionButtonPrimaryText}>Criar Evento ou Chamado</Text>
          </TouchableOpacity>
        </>
      )}

      {item.status === 'open' && (
        <>
          <Text style={styles.openText}>Aguardando Candidatos</Text>
          <Text style={styles.metricText}>{item.candidateCount} Bardos Candidatados</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonYellow]}
            onPress={() => navigation?.navigate?.('ApplicantList', { day: item.day, date: item.date })}
          >
            <Text style={styles.actionButtonYellowText}>Gerenciar Candidatos</Text>
          </TouchableOpacity>
        </>
      )}

      {item.status === 'confirmed' && (
        <>
          <View style={styles.confirmRow}>
            <Ionicons name="checkmark-circle" size={20} color="#29D97D" />
            <Text style={styles.confirmText}>{item.artistName}</Text>
          </View>
          <Text style={styles.metricText}>{item.time} • {item.confirmedCount} seguidores confirmaram presença</Text>
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
  healthBlock: {
    marginBottom: 14,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    marginRight: 8,
  },
  healthLabel: {
    color: '#EAEAEA',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  healthMeta: {
    marginLeft: 8,
    color: '#A0A0A0',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  healthTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#222',
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 999,
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
  metricText: {
    color: '#D8D8D8',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
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