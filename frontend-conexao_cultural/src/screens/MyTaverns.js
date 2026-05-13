import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../styles/colors';

const MY_TAVERNS = [
  {
    id: 'tavern_1',
    name: 'Pizzaria Noturna',
    vibe: 'Gótica',
    type: 'Pizzaria',
    address: 'Rua das Sombras, 1313 - Centro',
    status: 'Ativa',
  },
  {
    id: 'tavern_2',
    name: 'Rock & Beer',
    vibe: 'Pub',
    type: 'Bar',
    address: 'Av. do Amplificador, 45 - Distrito Musical',
    status: 'Chamados abertos',
  },
];

function TavernCard({ item, navigation }) {
  const handleManage = () => {
    Alert.alert('Gestão do local', `Abrindo painel de gestão para ${item.name}.`);
  };

  const handleOpenMap = () => {
    navigation?.navigate?.('PlaceProfile', {
      place: {
        name: item.name,
        vibe: item.vibe,
        category: item.type,
        address: item.address,
        description: `Local cadastrado com vibe ${item.vibe}.`,
      },
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.type} • Vibe {item.vibe}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>

        <View style={styles.statusPill}>
          <Ionicons name="wine" size={14} color="#111" />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleManage} activeOpacity={0.9}>
          <Text style={styles.secondaryButtonText}>Gerenciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleOpenMap} activeOpacity={0.9}>
          <Text style={styles.secondaryButtonText}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MyTaverns({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Locais</Text>
        <Text style={styles.subtitle}>Gerencie múltiplos pontos da sua rede de taverna.</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation?.navigate?.('EstablishmentSetup')} activeOpacity={0.92}>
          <Ionicons name="add-circle-outline" size={18} color="#111" />
          <Text style={styles.addButtonText}>+ Adicionar Novo Local</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_TAVERNS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TavernCard item={item} navigation={navigation} />}
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
    color: '#111',
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
    borderColor: '#262626',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  name: {
    color: '#F2F2F2',
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
    color: '#111',
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3220',
    backgroundColor: '#171714',
  },
  secondaryButtonText: {
    color: THEME.colors.primary,
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
});