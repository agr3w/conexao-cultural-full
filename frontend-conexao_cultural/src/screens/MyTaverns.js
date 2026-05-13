import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const INITIAL_TAVERNS = [
  {
    id: 'tavern_1',
    name: 'Pizzaria Gótica',
    vibe: 'Sombras, neon e guitarras lamacentas',
    type: 'Pizzaria',
    address: 'Rua das Sombras, 1313 - Centro',
    status: 'Ativa',
    hiredBards: 12,
    ritualConfirmations: 5,
  },
  {
    id: 'tavern_2',
    name: 'Taverna do Rock',
    vibe: 'Pub elétrico com palco vibrante',
    type: 'Bar',
    address: 'Av. do Amplificador, 45 - Distrito Musical',
    status: 'Chamados abertos',
    hiredBards: 7,
    ritualConfirmations: 3,
  },
  {
    id: 'tavern_3',
    name: 'Luar do Jazz',
    vibe: 'Clima elegante, fumaça e improviso',
    type: 'Casa de Shows',
    address: 'Alameda dos Improvisos, 88 - Bairro Antigo',
    status: 'Ativa',
    hiredBards: 19,
    ritualConfirmations: 11,
  },
];

function TavernCard({ item, navigation, onEdit, onRemove }) {
  const handleManageAgenda = () => {
    navigation?.navigate?.('MyTavernAgenda');
  };

  const handleEdit = () => {
    onEdit?.(item);
  };

  const handleDelete = () => {
    Alert.alert(
      'Encerrar Atividades',
      'Deseja realmente abandonar esta Taverna?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Encerrar',
          style: 'destructive',
          onPress: () => onRemove?.(item.id),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>Vibe: {item.vibe}</Text>
          <Text style={styles.address}>{item.type} • {item.address}</Text>
        </View>

        <View style={styles.statusPill}>
          <Ionicons name="wine-outline" size={14} color="#111111" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.actionGrid}>
        <View style={styles.prestigeRow}>
          <View style={styles.prestigeItem}>
            <Ionicons name="star-outline" size={14} color="#E7C95E" />
            <Text style={styles.prestigeText}>Bardos Contratados: {item.hiredBards}</Text>
          </View>
          <View style={styles.prestigeItem}>
            <Ionicons name="wine-outline" size={14} color="#E7C95E" />
            <Text style={styles.prestigeText}>Confirmados p/ Ritual: {item.ritualConfirmations}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryAction} onPress={handleManageAgenda} activeOpacity={0.92}>
          <Ionicons name="calendar-outline" size={16} color="#111111" />
          <Text style={styles.primaryActionText}>Gerenciar Agenda</Text>
        </TouchableOpacity>

        <View style={styles.secondaryRow}>
          <TouchableOpacity style={styles.secondaryAction} onPress={handleEdit} activeOpacity={0.92}>
            <Ionicons name="create-outline" size={16} color={THEME.colors.primary} />
            <Text style={styles.secondaryActionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerAction} onPress={handleDelete} activeOpacity={0.92}>
            <Ionicons name="close-circle-outline" size={16} color="#F0B4A4" />
            <Text style={styles.dangerActionText}>Encerrar Atividades</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function MyTaverns({ navigation }) {
  const [taverns, setTaverns] = useState(INITIAL_TAVERNS);

  const handleCreateNew = () => {
    navigation?.navigate?.('EstablishmentSetup', {
      mode: 'create',
    });
  };

  const handleEditTavern = (tavern) => {
    navigation?.navigate?.('EstablishmentSetup', {
      mode: 'edit',
      place: tavern,
    });
  };

  const handleRemoveTavern = (tavernId) => {
    setTaverns((current) => current.filter((tavern) => tavern.id !== tavernId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel das Taverns</Text>
        <Text style={styles.subtitle}>Gerencie seus locais, ajuste a agenda e prepare novas noites de caos.</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleCreateNew} activeOpacity={0.92}>
          <Ionicons name="add-circle-outline" size={18} color="#111111" />
          <Text style={styles.addButtonText}>+ Erguir Nova Taverna</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taverns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TavernCard
            item={item}
            navigation={navigation}
            onEdit={handleEditTavern}
            onRemove={handleRemoveTavern}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={(
          <View style={styles.emptyState}>
            <Ionicons name="storefront-outline" size={40} color="#6D6D6D" />
            <Text style={styles.emptyTitle}>Nenhuma taverna ativa</Text>
            <Text style={styles.emptyText}>Use o botão acima para erguer um novo local.</Text>
          </View>
        )}
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
    marginBottom: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
  },
  addButtonText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  name: {
    color: '#F5F1E6',
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  meta: {
    color: '#D8D8D8',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginBottom: 4,
  },
  address: {
    color: '#9E9E9E',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 19,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  statusText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  actionGrid: {
    gap: 10,
  },
  prestigeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  prestigeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#171714',
    borderWidth: 1,
    borderColor: '#3D3524',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  prestigeText: {
    color: '#E9D89A',
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 13,
    backgroundColor: THEME.colors.primary,
  },
  primaryActionText: {
    color: '#111111',
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#3D3524',
    backgroundColor: '#181714',
  },
  secondaryActionText: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  dangerAction: {
    flex: 1.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#5A2E25',
    backgroundColor: '#231512',
  },
  dangerActionText: {
    color: '#F0B4A4',
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    gap: 8,
  },
  emptyTitle: {
    color: '#F2F2F2',
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#A7A7A7',
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
});
