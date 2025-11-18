import { Icons } from '@/constants/icons';
import { flightType } from '@/types/flightTypes';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FlightCard = ({ flight, onSelect }: { flight: flightType, onSelect: (flight: flightType) => void}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(flight)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
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

      <View style={styles.flightTimes}>
        <View style={styles.timeBlock}>
          <Text style={styles.time}>{flight.departureTime}</Text>
          <Text style={styles.airport}>{flight.from}</Text>
        </View>

        <View style={styles.durationBlock}>
          <Text style={styles.duration}>{flight.duration}</Text>
          <View style={styles.flightLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <Image source={Icons.airplane} style={{ width: 20, height: 20, resizeMode: "contain", marginHorizontal: 12}} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.stops}>
            {flight.stops === 0 ? 'Direkt' : `${flight.stops} Aktarma`}
          </Text>
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.time}>{flight.arrivalTime}</Text>
          <Text style={styles.airport}>{flight.to}</Text>
        </View>
      </View>

      {/* Alt Bilgiler */}
      <View style={styles.footer}>
        <View style={styles.baggageInfo}>
          <Image source={Icons.bag} style={{ width: 22, height: 22, resizeMode: "contain"}} />
          <Text style={styles.baggageText}>{flight.baggage}</Text>
        </View>
        
        <View style={styles.priceSection}>
          <Text style={styles.price}>{flight.price} ₺</Text>
          <View style={styles.selectButton}>
            <Text style={styles.selectButtonText}>SEÇ</Text>
          </View>
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
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  airlineLogo: {
    fontSize: 28,
  },
  airlineName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  flightNumber: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  classTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  classText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  flightTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeBlock: {
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  airport: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  durationBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
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
  stops: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  baggageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  baggageText: {
    fontSize: 13,
    color: '#6B7280',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
  },
  selectButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white',
  },
});

export default FlightCard;