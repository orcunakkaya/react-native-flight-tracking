import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AirportPicker from '../../components/ui/AirPortPicker';
import DatePicker from '../../components/ui/DatePicker';
import PassengerPicker from '../../components/ui/PassengerPicker';

const Book = () => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const router = useRouter();
  const [departureDate, setDepartureDate] = useState(null);
  const [passengers, setPassengers] = useState<{ adult: number, child: number, infant: number }>({ adult: 0, child: 0, infant: 0 });

  useEffect(() => {
    setDepartureDate(null);
    setTo(null);
  }, [tripType])

  const handleSearch = () => {
    // Validasyon
    if (!from) {
      Alert.alert('Hata', 'Lütfen kalkış havaalanı seçin');
      return;
    }
    if (!to) {
      Alert.alert('Hata', 'Lütfen varış havaalanı seçin');
      return;
    }
    // if (from.code === to.code) {
    //   Alert.alert('Hata', 'Kalkış ve varış havaalanları aynı olamaz');
    //   return;
    // }

    // Results sayfasına yönlendir
    router.push({
      pathname: '/flight/result',
      params: { id: 'bacon' }
      // params: {
      //   from: from.code,
      //   to: to.code,
      //   fromCity: from.city,
      //   toCity: to.city,
      //   dateText: formatDate(departureDate),
      //   tripType: tripType === 0 ? 'oneWay' : 'roundTrip',
      //   adults: adults,
      //   children: children,
      // },
    });
  };
  
  return (
    <View style={{height: '100%'}}>
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
    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}
          >
          <Text style={styles.searchButtonText}>
            Search Flight
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Book

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 'auto'
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
    marginBottom: 20,
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
  },
  searchButton: {
    backgroundColor: '#e81932',
    color: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    bottom: 20,
    position: 'absolute',
    width: 'auto',
    left: 20,
    right: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});