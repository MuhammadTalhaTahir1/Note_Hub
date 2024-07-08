import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Notes from '../screens/Notes';
import COLOUR from '../styles/colors';

const Routes = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='Notes' component={Notes} options={{ title: 'ADD TODO', headerTintColor: 'white', headerStyle: { backgroundColor: COLOUR.header, elevation: 0 } }} />
    </Stack.Navigator>

  )
}

export default Routes

const styles = StyleSheet.create({})