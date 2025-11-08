import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FlightCard from '../../components/flight/FlightCard';
import { generateFlights, sortFlightsByPrice } from '../../constants/mockFlights';

export default function FlightResults() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price'); // 'price' | 'time'

  useEffect(() => {
    // Mock API çağrısı (2 saniye bekle)
    setTimeout(() => {
      const results = generateFlights(params.from, params.to, params.date);
      setFlights(results);
      setLoading(false);
    }, 1500);
  }, [params.from, params.to, params.date]);

  const handleSelectFlight = (flight) => {
    console.log("selected flight",flight);
    router.push({
      pathname: `/flight/${flight.id}`,
      params: {
        flightData: JSON.stringify(flight),
      },
    });
  };

  const sortedFlights = sortBy === 'price' 
    ? sortFlightsByPrice(flights) 
    : flights;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Uçuşları Arıyoruz...',
            headerBackTitle: 'Geri',
          }}
        />
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>En uygun uçuşları buluyoruz...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${params.fromCity} → ${params.toCity}`,
          headerBackTitle: 'Geri',
        }}
      />

      {/* Filtre Bar */}
      <View style={styles.filterBar}>
        <View style={styles.resultCount}>
          <Text style={styles.resultCountText}>
            {flights.length} uçuş bulundu
          </Text>
          <Text style={styles.resultDate}>{params.dateText}</Text>
        </View>

        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'price' && styles.sortButtonActive]}
            onPress={() => setSortBy('price')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'price' && styles.sortButtonTextActive]}>
              Fiyat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'time' && styles.sortButtonActive]}
            onPress={() => setSortBy('time')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'time' && styles.sortButtonTextActive]}>
              Saat
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Uçuş Listesi */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedFlights.length > 0 ? (
          sortedFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={handleSelectFlight}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>✈️</Text>
            <Text style={styles.emptyStateText}>Uçuş bulunamadı</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  filterBar: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultCount: {
    marginBottom: 12,
  },
  resultCountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  resultDate: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  sortButtonActive: {
    backgroundColor: '#2563EB',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  sortButtonTextActive: {
    color: 'white',
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
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#9CA3AF',
  },
});