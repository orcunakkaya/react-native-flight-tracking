import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TicketCard from '../../components/ticket/TicketCard';
import SegmentedControl from '../../components/ui/SegmentedControl';
import { getActiveTickets, getPastTickets } from '../../utils/storage';

export default function Tickets() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0); // 0: Aktif, 1: Geçmiş
  const [activeTickets, setActiveTickets] = useState([]);
  const [pastTickets, setPastTickets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Biletleri yükle
  const loadTickets = async () => {
    try {
      const active = await getActiveTickets();
      const past = await getPastTickets();
      setActiveTickets(active);
      setPastTickets(past);
    } catch (error) {
      console.error('Biletler yüklenemedi:', error);
    }
  };

  // Sayfa açıldığında biletleri yükle
  useFocusEffect(
    useCallback(() => {
      loadTickets();
    }, [])
  );

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadTickets();
    setRefreshing(false);
  };

  // Bilet detayına git
  const handleTicketPress = (ticket) => {
    router.push({
      pathname: `/ticket/${ticket.ticketId}`,
      params: {
        ticketData: JSON.stringify(ticket),
      },
    });
  };

  // Gösterilecek biletler
  const displayedTickets = selectedTab === 0 ? activeTickets : pastTickets;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Biletlerim</Text>
      </View>

      {/* Segmented Control */}
      <View style={styles.segmentContainer}>
        <SegmentedControl
          options={['Aktif', 'Geçmiş']}
          selectedIndex={selectedTab}
          onChange={setSelectedTab}
        />
      </View>

      {/* Tickets List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {displayedTickets.length > 0 ? (
          displayedTickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              ticket={ticket}
              onPress={() => handleTicketPress(ticket)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>
              {selectedTab === 0 ? '🎫' : '📋'}
            </Text>
            <Text style={styles.emptyStateTitle}>
              {selectedTab === 0 ? 'Aktif Biletiniz Yok' : 'Geçmiş Biletiniz Yok'}
            </Text>
            <Text style={styles.emptyStateDescription}>
              {selectedTab === 0
                ? 'Yeni bir uçuş satın aldığınızda burada görünecek'
                : 'Tamamlanan uçuşlarınız burada görünecek'}
            </Text>
            {selectedTab === 0 && (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.searchButtonText}>Uçuş Ara</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  segmentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});