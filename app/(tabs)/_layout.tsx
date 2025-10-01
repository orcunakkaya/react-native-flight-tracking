import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: "Book"}}/>
      <Tabs.Screen name="flights" options={{title: "Flights"}}/>
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})