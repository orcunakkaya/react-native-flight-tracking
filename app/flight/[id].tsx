import { Icons } from '@/constants/icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { saveTicket } from '../../utils/storage';

export default function FlightDetail() {
  const params = useLocalSearchParams<any>();
  const router = useRouter();
  const [purchasing, setPurchasing] = useState<boolean>(false);

  // Flight data'yı parse et
  const flight = JSON.parse(params.flightData);

  const handlePurchase = async () => {
    setPurchasing(true);

    // Mock satın alma işlemi (2 saniye)
    setTimeout(async () => {
      const result = await saveTicket(flight);
      setPurchasing(false);
      
      if (result.success) {
        // Başarı Alert'i
        Alert.alert(
          '✅ Rezervasyon Başarılı!',
          'Biletiniz My Tickets sekmesine eklendi.',
          [
            {
              text: 'Biletlerime Git',
              onPress: () => {
                router.push('/(tabs)/flights');
              },
            },
            {
              text: 'Tamam',
              style: 'cancel',
            },
          ]
        );
      } else {
        Alert.alert('Hata', 'Bilet kaydedilemedi. Lütfen tekrar deneyin.');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Uçuş Detayı',
          headerBackTitle: 'Geri',
        }}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Havayolu Card */}
        <View style={styles.card}>
          <View style={styles.airlineHeader}>
            <View style={styles.airlineInfo}>
              <Text style={styles.airlineLogo}>{flight.airlineInfo.logo}</Text>
              <View>
                <Text style={styles.airlineName}>{flight.airlineInfo.name}</Text>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
              </View>
            </View>
            <View style={styles.classTag}>
              <Text style={styles.classText}>{flight.seatClass}</Text>
            </View>
          </View>
        </View>

        {/* Uçuş Rotası */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Uçuş Rotası</Text>
          
          <View style={styles.routeContainer}>
            {/* Kalkış */}
            <View style={styles.routePoint}>
              <View style={styles.routeDot} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeTime}>{flight.departureTime}</Text>
                <Text style={styles.routeAirport}>{flight.from}</Text>
                <Text style={styles.routeCity}>Kalkış</Text>
              </View>
            </View>

            {/* Uçuş Çizgisi */}
            <View style={styles.flightPath}>
              <View style={styles.verticalLine} />
              <View style={styles.planeIconContainer}>
                <Image source={Icons.airplane} style={{ width: 20, height: 20, resizeMode: "contain"}} />
                <Text style={styles.durationText}>{flight.duration}</Text>
              </View>
            </View>

            {/* Varış */}
            <View style={styles.routePoint}>
              <View style={styles.routeDot} />
              <View style={styles.routeInfo}>
                <Text style={styles.routeTime}>{flight.arrivalTime}</Text>
                <Text style={styles.routeAirport}>{flight.to}</Text>
                <Text style={styles.routeCity}>Varış</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Uçuş Bilgileri */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Uçuş Bilgileri</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Image source={Icons.calendar} style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 10 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Tarih</Text>
                <Text style={styles.infoValue}>{flight.date}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Image source={Icons.clock} style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 10 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Süre</Text>
                <Text style={styles.infoValue}>{flight.duration}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Image source={Icons.bag} style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 10 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Bagaj</Text>
                <Text style={styles.infoValue}>{flight.baggage}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Image source={Icons.seat} style={{ width: 24, height: 24, resizeMode: "contain", marginRight: 10 }} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Aktarma</Text>
                <Text style={styles.infoValue}>
                  {flight.stops === 0 ? 'Direkt' : `${flight.stops} Aktarma`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Fiyat Özeti */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fiyat Özeti</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Yolcu Ücreti</Text>
            <Text style={styles.priceValue}>{flight.price} ₺</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Vergiler ve Ücretler</Text>
            <Text style={styles.priceValue}>Dahil</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Toplam Tutar</Text>
            <Text style={styles.totalPrice}>{flight.price} ₺</Text>
          </View>
        </View>
      </ScrollView>

      {/* Satın Al Butonu */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Toplam</Text>
          <Text style={styles.footerPriceValue}>{flight.price} ₺</Text>
        </View>
        <TouchableOpacity
          style={[styles.purchaseButton, purchasing && styles.purchaseButtonDisabled]}
          onPress={handlePurchase}
          disabled={purchasing}
          activeOpacity={0.8}
        >
          <Text style={styles.purchaseButtonText}>
            {purchasing ? 'İşleniyor...' : 'SATIN AL'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  airlineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  airlineLogo: {
    fontSize: 32,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  flightNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  classTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  classText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  routeContainer: {
    paddingLeft: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    marginTop: 4,
  },
  routeInfo: {
    marginLeft: 16,
  },
  routeTime: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  routeAirport: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
  },
  routeCity: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    paddingVertical: 12,
  },
  verticalLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  planeIconContainer: {
    marginLeft: 16,
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerPrice: {
    flex: 1,
  },
  footerPriceLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  footerPriceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  purchaseButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});