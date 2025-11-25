import Ionicons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Bilet Al", tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="airplane-takeoff" size={size} color={color} />, tabBarActiveTintColor: '#2563EB'}}  />
      <Tabs.Screen name="flights" options={{title: "Uçuşlarım", tabBarIcon: ({ color, size }) => <FontAwesome name="ticket" size={size} color={color} />, tabBarActiveTintColor: '#2563EB'}}/>
      <Tabs.Screen name="profile" options={{title: "Profil", tabBarIcon: ({ color, size }) => <Ionicons name="user" size={size} color={color} />, tabBarActiveTintColor: '#2563EB'}}/>
    </Tabs>
  )
}

export default TabLayout