import { deleteTicket } from '@/utils/storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TicketDetail = () => {
  const params = useLocalSearchParams<any>();
  const router = useRouter();
  const ticket = JSON.parse(params.ticketData);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  const handleDeleteTicket = () => {
    Alert.alert(
      'Bileti Sil',
      'Bu bileti silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteTicket(ticket.ticketId);
            if (result.success) {
              router.back();
            } else {
              Alert.alert('Hata', 'Bilet silinemedi');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Biletim',
          headerBackTitle: 'Geri',
        }}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.boardingPass}>
          <View style={styles.passHeader}>
            <Text style={styles.passTitle}>BİNİŞ KARTI</Text>
            <Text style={styles.passSubtitle}>BOARDING PASS</Text>
          </View>

          <View style={styles.airlineSection}>
            <Text style={styles.airlineLogo}>{ticket.airlineInfo?.logo || '✈️'}</Text>
            <Text style={styles.airlineName}>{ticket.airlineInfo?.name || 'Havayolu'}</Text>
          </View>

          <View style={styles.routeSection}>
            <View style={styles.cityBlock}>
              <Text style={styles.cityCode}>{ticket.from}</Text>
              <Text style={styles.cityTime}>{ticket.departureTime}</Text>
            </View>

            <View style={styles.planeIndicator}>
              <View style={styles.planeLine} />
              <Text style={styles.planeEmoji}>✈️</Text>
              <View style={styles.planeLine} />
            </View>

            <View style={styles.cityBlock}>
              <Text style={styles.cityCode}>{ticket.to}</Text>
              <Text style={styles.cityTime}>{ticket.arrivalTime}</Text>
            </View>
          </View>

          <View style={styles.dottedDivider}>
            <View style={styles.leftCircle} />
            <View style={styles.dots} />
            <View style={styles.rightCircle} />
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Yolcu</Text>
                <Text style={styles.detailValue}>PASSENGER</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Uçuş No</Text>
                <Text style={styles.detailValue}>{ticket.flightNumber}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Tarih</Text>
                <Text style={styles.detailValue}>{ticket.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Kalkış</Text>
                <Text style={styles.detailValue}>{ticket.departureTime}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Gate</Text>
                <Text style={styles.detailValue}>A12</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Koltuk</Text>
                <Text style={styles.detailValue}>12A</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Sınıf</Text>
                <Text style={styles.detailValue}>{ticket.seatClass}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Bagaj</Text>
                <Text style={styles.detailValue}>{ticket.baggage}</Text>
              </View>
            </View>
          </View>

          <View style={styles.qrSection}>
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrIcon}>📱</Text>
              <Text style={styles.qrText}>QR Kod</Text>
              <Text style={styles.qrSubtext}>{ticket.ticketId}</Text>
            </View>
          </View>

          <Text style={styles.ticketId}>PNR: {ticket.ticketId}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 Bilet Bilgileri</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Satın Alma:</Text>
            <Text style={styles.infoValue}>{formatDate(ticket.purchaseDate)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Durum:</Text>
            <Text style={[styles.infoValue, styles.statusValue]}>
              {ticket.status === 'active' ? '✅ Aktif' : '✔️ Tamamlandı'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fiyat:</Text>
            <Text style={[styles.infoValue, styles.priceValue]}>{ticket.price} ₺</Text>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTicket}
        >
          <Text style={styles.deleteButtonText}>Bileti Sil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default TicketDetail;

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
  },
  boardingPass: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  passHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  passTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 2,
  },
  passSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    letterSpacing: 1,
  },
  airlineSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  airlineLogo: {
    fontSize: 40,
    marginBottom: 8,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  routeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cityBlock: {
    alignItems: 'center',
    flex: 1,
  },
  cityCode: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cityTime: {
    fontSize: 16,
    color: '#6B7280',
  },
  planeIndicator: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  planeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  planeEmoji: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  dottedDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  leftCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    marginLeft: -34,
  },
  dots: {
    flex: 1,
    height: 1,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
  },
  rightCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    marginRight: -34,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrPlaceholder: {
    width: 140,
    height: 140,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  qrIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  qrText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  qrSubtext: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  ticketId: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusValue: {
    color: '#059669',
  },
  priceValue: {
    color: '#2563EB',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});