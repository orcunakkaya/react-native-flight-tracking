import { Icons } from '@/constants/icons';
import { airpotType } from '@/types/flightTypes';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const AirportPicker = ({ label, value, setValue, placeholder = 'Seçiniz' }: {label: string, value: any, setValue: React.Dispatch<React.SetStateAction<any>>, placeholder?: string}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const airports: airpotType[] = [
    { code: 'IST', city: 'İstanbul', name: 'İstanbul Havalimanı' },
    { code: 'SAW', city: 'İstanbul', name: 'Sabiha Gökçen' },
    { code: 'ADB', city: 'İzmir', name: 'Adnan Menderes' },
    { code: 'ESB', city: 'Ankara', name: 'Esenboğa' },
    { code: 'AYT', city: 'Antalya', name: 'Antalya Havalimanı' },
    { code: 'DLM', city: 'Dalaman', name: 'Dalaman Havalimanı' },
    { code: 'BJV', city: 'Bodrum', name: 'Milas-Bodrum' },
    { code: 'GZT', city: 'Gaziantep', name: 'Gaziantep Havalimanı' },
    { code: 'TZX', city: 'Trabzon', name: 'Trabzon Havalimanı' },
    { code: 'ASR', city: 'Kayseri', name: 'Kayseri Havalimanı' },
  ];

  const filteredAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Input Button */}
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.inputContent}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Icons.airplaneDep} style={{ width: 16, height: 16, resizeMode: "contain", marginRight: 6 }} />
<Text style={styles.inputLabel}>{label}</Text>
            </View>
          
          <Text style={[styles.inputValue, !value && styles.placeholder]}>
            {value ? `${value.city} (${value.code})` : placeholder}
          </Text>
        </View>
        <Text><Ionicons name="chevron-forward-outline" size={18} color="#9CA3AF" /></Text>
      </TouchableOpacity>

      {/* Full Screen Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Havaalanı Seçin</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSearchQuery('');
              }}
            >
              <Text style={styles.closeButtonText}><Ionicons name="close-outline" size={24} color="#6B7280" /></Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}><Ionicons name="search" size={20} color="#9CA3AF" /></Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Şehir veya havaalanı ara..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            //   autoFocus
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text><Ionicons name="close-outline" size={20} color="#9CA3AF" /></Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Airport List */}
          <ScrollView style={styles.listContainer}>
            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport, index) => (
                <TouchableOpacity
                  key={airport.code}
                  style={[
                    styles.listItem,
                    index === filteredAirports.length - 1 && styles.lastItem,
                  ]}
                  onPress={() => {
                    setValue(airport);
                    setModalVisible(false);
                    setSearchQuery('');
                  }}
                  activeOpacity={0.6}
                >
                  <View style={styles.airportIcon}>
                    <Text style={styles.airportIconText}><Image source={Icons.airplane} style={{ width: 20, height: 20, resizeMode: "contain" }} /></Text>
                  </View>
                  <View style={styles.airportInfo}>
                    <Text style={styles.airportCity}>{airport.city}</Text>
                    <Text style={styles.airportName}>{airport.name}</Text>
                  </View>
                  <Text style={styles.airportCode}>{airport.code}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Havaalanı bulunamadı</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  inputValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  placeholder: {
    color: '#9CA3AF',
    fontWeight: '400',
  },


  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '300',
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  // List Styles
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  airportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  airportIconText: {
    fontSize: 20,
  },
  airportInfo: {
    flex: 1,
  },
  airportCity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  airportName: {
    fontSize: 13,
    color: '#6B7280',
  },
  airportCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});

export default AirportPicker;