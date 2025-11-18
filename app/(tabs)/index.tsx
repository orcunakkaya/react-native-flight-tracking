import AirportPicker from '@/components/ui/AirPortPicker';
import DatePicker from '@/components/ui/DatePicker';
import PassengerPicker from '@/components/ui/PassengerPicker';
import SegmentedControl from '@/components/ui/SegmentedControl';
import { airpotType } from '@/types/flightTypes';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Book = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [from, setFrom] = useState<airpotType | null>();
  const [to, setTo] = useState<airpotType | null>();
  const [departureDate, setDepartureDate] = useState<{endDate: string, startDate: string}>();
  const [passengers, setPassengers] = useState<{ adult: number, child: number, infant: number }>({ adult: 0, child: 0, infant: 0 });

  useEffect(() => {
    setDepartureDate(undefined);
    setTo(null);
  }, [tripType])

  const handleSearch = () => {
    if (!from) {
      Alert.alert('Hata', 'Lütfen kalkış havaalanı seçin');
      return;
    }
    if (!to) {
      Alert.alert('Hata', 'Lütfen varış havaalanı seçin');
      return;
    }
    if (from.code === to.code) {
      Alert.alert('Hata', 'Kalkış ve varış havaalanları aynı olamaz');
      return;
    }

    if (!departureDate || !departureDate.startDate) {
      Alert.alert('Hata', 'Lütfen gidiş tarihini seçin');
      return;
    }
    if (passengers.adult + passengers.child + passengers.infant === 0) {
      Alert.alert('Hata', 'Lütfen en az bir yolcu seçin');
      return;
    }

    router.push({
      pathname: '/flight/result',
      params: {
        from: from.code,
        to: to.code,
        fromCity: from.city,
        toCity: to.city,
        date: departureDate?.startDate,
        tripType: tripType,
        passengers: JSON.stringify(passengers),
      },
    });
  };

  const handleChangeSegmented = (index: number) => {
    setSelectedTab(index);
    setTripType(index === 0 ? 'oneWay' : 'roundTrip');
  }
  
  return (
    <View style={{height: '100%'}}>
    <View style={styles.container}>
      
      <SegmentedControl
          options={['One Way', 'Round Trip']}
          selectedIndex={selectedTab}
          onChange={handleChangeSegmented}
          componentStyle={'primary'}
        />

      <AirportPicker
          label="Nereden"
          value={from}
          setValue={setFrom}
          placeholder="Seçiniz"
        />
        <AirportPicker
          label="Nereye"
          value={to}
          setValue={setTo}
          placeholder="Seçiniz"
        />
        <DatePicker label={tripType === 'oneWay' ? "Gidiş tarihi" : "Gidiş dönüş tarihi"} value={departureDate} setValue={setDepartureDate} tripType={tripType} />
          <PassengerPicker
          label="Yolcular"
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