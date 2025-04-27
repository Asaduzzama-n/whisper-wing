import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const Layout = () => {
  return (
  <Stack
  screenOptions={{
    animation:'slide_from_right',
    headerShown:false
  }}
  >
    <Stack.Screen name='welcome' options={{ headerShown: false }}/>
    <Stack.Screen name="sign-in" options={{ headerShown: false }}/>
    <Stack.Screen name="sign-up" options={{ headerShown: false }}/>
  </Stack>
  )
}

export default Layout