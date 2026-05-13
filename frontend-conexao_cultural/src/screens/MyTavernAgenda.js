import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const WEEK_AGENDA = [
  { id: 'mon', day: 'Segunda', date: '13/05', status: 'vazio', candidateCount: 0, confirmedCount: 0, health: 5 },
  { id: 'tue', day: 'Terça', date: '14/05', status: 'aberto', candidateCount: 3, confirmedCount: 0, health: 28 },
  { id: 'wed', day: 'Quarta', date: '15/05', status: 'confirmado', artistName: 'O Bardo Misterioso', time: '22:00', candidateCount: 1, confirmedCount: 42, health: 92 },
  { id: 'thu', day: 'Quinta', date: '16/05', status: 'vazio', candidateCount: 0, confirmedCount: 0, health: 10 },
  { id: 'fri', day: 'Sexta', date: '17/05', status: 'aberto', candidateCount: 7, confirmedCount: 0, health: 45 },
  { id: 'sat', day: 'Sábado', date: '18/05', status: 'confirmado', artistName: 'Cavaleiro do Som', time: '23:30', candidateCount: 2, confirmedCount: 87, health: 100 },
  { id: 'sun', day: 'Domingo', date: '19/05', status: 'vazio', candidateCount: 0, confirmedCount: 0, health: 8 },
];

function getHealthMeta(health = 0) {
  if (health >= 80) return { label: 'Saúde alta', color: '#29D97D' };
  if (health >= 45) return { label: 'Saúde estável', color: '#E7C95E' };
  return { label: 'Saúde baixa', color: '#E36A1F' };
}

function getStatusMeta(status) {
  if (status === 'confirmado') return { label: 'Confirmado', color: '#29D97D', textColor: '#07110A', icon: 'shield-checkmark' };
  if (status === 'aberto') return { label: 'Chamado Aberto', color: '#E7C95E', textColor: '#111111', icon: 'time-outline' };
  return { label: 'Vazio', color: '#343434', textColor: '#EAEAEA', icon: 'ellipse-outline' };
}

function AgendaCard({ item, navigation, onCreateEvent, onConfirmArtist }) {
  const healthMeta = getHealthMeta(item.health);
  const statusMeta = getStatusMeta(item.status);
  const isEmpty = item.status === 'vazio';
  const isOpen = item.status === 'aberto';
  const isConfirmed = item.status === 'confirmado';
  const healthWidth = `${Math.max(8, Math.min(item.health || 0, 100))}%`;

  const handleManageDetails = () => {
    navigation?.navigate?.('EventDetails', { eventId: item.id });
  };

  return (
    <View style={[styles.card, isOpen && styles.cardOpen, isConfirmed && styles.cardConfirmed]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusMeta.color }]}>
          <Ionicons name={statusMeta.icon} size={14} color={statusMeta.textColor} />
          <Text style={[styles.statusBadgeText, { color: statusMeta.textColor }]}>{statusMeta.label}</Text>
        </View>
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

      {isEmpty && (
        <>
          <Text style={styles.emptyText}>Nenhum chamado mapeado para este dia.</Text>
          <Text style={styles.metricText}>Sugestão: crie um evento para começar a atrair presença.</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => navigation?.navigate?.('ComposeRitual', { onComplete: () => onCreateEvent?.(item.id) })}
          >
            <Text style={styles.actionButtonPrimaryText}>Abrir Chamado</Text>
          </TouchableOpacity>
        </>
      )}

      {isOpen && (
        <>
          <Text style={styles.openText}>Chamado aberto para candidatos</Text>
          <Text style={styles.metricText}>{item.candidateCount} Bardos Candidatados</Text>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonYellow]}
            onPress={() => navigation?.navigate?.('ApplicantList', {
              eventId: item.id,
              eventLabel: `${item.day} (${item.date})`,
              onConfirm: (name) => onConfirmArtist?.(item.id, name),
            })}
          >
            <Text style={styles.actionButtonYellowText}>Ver Candidatos</Text>
          </TouchableOpacity>
        </>
      )}

      {isConfirmed && (
        <>
          <View style={styles.confirmHeader}>
            <View style={styles.confirmRow}>
              <View style={styles.confirmIconWrap}>
                <Ionicons name="wine-outline" size={18} color="#E7C95E" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.confirmText}>{item.artistName}</Text>
                <Text style={styles.confirmSubtext}>Pacto Selado: {item.artistName} - {item.time}</Text>
              </View>
            </View>
            <View style={styles.confirmSeal}>
              <Ionicons name="shield-checkmark" size={14} color="#0F1A11" />
              <Text style={styles.confirmSealText}>Confirmado</Text>
            </View>
          </View>
          <Text style={styles.metricText}>{item.confirmedCount} seguidores confirmaram presença</Text>
          <Text style={styles.confirmHelper}>Show confirmado e pronto para o ritual.</Text>
          <TouchableOpacity style={styles.manageButton} onPress={handleManageDetails} activeOpacity={0.92}>
            <Ionicons name="chevron-forward" size={14} color="#E7C95E" />
            <Text style={styles.manageButtonText}>Gerenciar Detalhes</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default function MyTavernAgenda({ navigation }) {
  const [agenda, setAgenda] = useState(() => WEEK_AGENDA);

  const handleCreateEvent = (dayId) => {
    setAgenda((current) => current.map((item) => (
      item.id === dayId
        ? { ...item, status: 'aberto', candidateCount: item.candidateCount || 0, confirmedCount: 0, artistName: undefined, time: undefined }
        : item
    )));
  };

  const handleConfirmArtist = (dayId, artistName) => {
    setAgenda((current) => current.map((item) => (
      item.id === dayId
        ? { ...item, status: 'confirmado', artistName, candidateCount: item.candidateCount || 0, confirmedCount: Math.max(item.confirmedCount || 0, 1), time: item.time || '22:00' }
        : item
    )));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grimório da Taverna</Text>
        <Text style={styles.subtitle}>Agenda semanal do anfitrião para administrar chamados e pactos.</Text>
      </View>

      <FlatList
        data={agenda}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AgendaCard
            item={item}
            navigation={navigation}
            onCreateEvent={handleCreateEvent}
            onConfirmArtist={handleConfirmArtist}
          />
        )}
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  statusBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
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
  confirmHeader: {
    borderWidth: 1,
    borderColor: '#C8A94B',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(231, 201, 94, 0.06)',
  },
  confirmIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(231, 201, 94, 0.12)',
    marginRight: 10,
  },
  confirmText: {
    color: '#D8F8E4',
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  confirmSubtext: {
    marginTop: 4,
    color: '#E7C95E',
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  confirmSeal: {
    alignSelf: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E7C95E',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  confirmSealText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 0.4,
  },
  confirmHelper: {
    color: '#9FD6B6',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginBottom: 12,
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    gap: 6,
  },
  manageButtonText: {
    color: '#E7C95E',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
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