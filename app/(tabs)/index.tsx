import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Book = () => {
  const [tripType, setTripType] = useState('oneWay');
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