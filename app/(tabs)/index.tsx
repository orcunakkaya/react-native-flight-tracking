import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AirportPicker from '../components/ui/AirPortPicker';
import DatePicker from '../components/ui/DatePicker';
import PassengerPicker from '../components/ui/PassengerPicker';

const Book = () => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [departureDate, setDepartureDate] = useState(null);
  const [passengers, setPassengers] = useState<{ adult: number, child: number, infant: number }>({ adult: 0, child: 0, infant: 0 });

  useEffect(() => {
    setDepartureDate(null);
    setTo(null);
  }, [tripType])
  
  return (
    <>
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        <TouchableOpacity 
          style={[
            styles.segment, 
            tripType === 'oneWay' && styles.segmentActive
          ]}
          onPress={() => setTripType('oneWay')}
        >
          <Text style={[
            styles.segmentText,
            tripType === 'oneWay' && styles.segmentTextActive
          ]}>
            One Way
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.segment,
            tripType === 'roundTrip' && styles.segmentActive
          ]}
          onPress={() => setTripType('roundTrip')}
        >
          <Text style={[
            styles.segmentText,
            tripType === 'roundTrip' && styles.segmentTextActive
          ]}>
            Round Trip
          </Text>
        </TouchableOpacity>
      </View>

      <AirportPicker
          label="🛫 Nereden"
          value={from}
          onSelect={setFrom}
          placeholder="Seçiniz"
        />
        <AirportPicker
          label="🛫 Nereye"
          value={to}
          onSelect={setTo}
          placeholder="Seçiniz"
        />
        <DatePicker label={tripType === 'oneWay' ? "🛫 Gidiş tarihi" : "🛫 Gidiş dönüş tarihi"} value={departureDate} setValue={setDepartureDate} tripType={tripType} />
          <PassengerPicker
          label="👨‍👩‍👧‍👦 Yolcular"
          value={passengers}
          setValue={setPassengers}
        />
    </View>
    </>
  )
}

export default Book

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  segmentText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 15,
  },
  segmentTextActive: {
    color: 'white',
  }
});