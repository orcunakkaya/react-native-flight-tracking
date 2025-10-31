import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TicketCard = ({ ticket, onPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
      'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header - Havayolu */}
      <View style={styles.header}>
        <View style={styles.airlineInfo}>
          <Text style={styles.airlineLogo}>{ticket.airlineInfo?.logo || '✈️'}</Text>
          <View>
            <Text style={styles.airlineName}>{ticket.airlineInfo?.name || 'Havayolu'}</Text>
            <Text style={styles.flightNumber}>{ticket.flightNumber}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, ticket.status === 'active' ? styles.activeBadge : styles.completedBadge]}>
          <Text style={styles.statusText}>
            {ticket.status === 'active' ? 'Aktif' : 'Tamamlandı'}
          </Text>
        </View>
      </View>

      {/* Route */}
      <View style={styles.route}>
        <View style={styles.locationBlock}>
          <Text style={styles.airportCode}>{ticket.from}</Text>
          <Text style={styles.time}>{ticket.departureTime}</Text>
        </View>

        <View style={styles.routeLine}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <Text style={styles.planeIcon}>✈️</Text>
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>

        <View style={styles.locationBlock}>
          <Text style={styles.airportCode}>{ticket.to}</Text>
          <Text style={styles.time}>{ticket.arrivalTime}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>📅</Text>
          <Text style={styles.infoText}>{formatDate(ticket.date)}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>⏱️</Text>
          <Text style={styles.infoText}>{ticket.duration}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>💺</Text>
          <Text style={styles.infoText}>{ticket.seatClass}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>{ticket.price} ₺</Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Bileti Göster</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  airlineLogo: {
    fontSize: 24,
  },
  airlineName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  flightNumber: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  completedBadge: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationBlock: {
    alignItems: 'center',
  },
  airportCode: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#6B7280',
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  planeIcon: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: {
    fontSize: 14,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  arrow: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: '300',
  },
});

export default TicketCard;