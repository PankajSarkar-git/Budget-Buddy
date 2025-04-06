// navigation/BottomTabs.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import {View} from 'react-native';
import BottomNavbar from '../Navbar/BottomNavbar';
import TopNavbar from '../Navbar/TopNavbar';

const Stack = createNativeStackNavigator();

const ScreenWithBottomNav = ({Component}: {Component: React.ComponentType}) => (
  <View style={{flex: 1}}>
    <TopNavbar />
    <Component />
    <BottomNavbar />
  </View>
);

const BottomTabs = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home">
        {() => <ScreenWithBottomNav Component={Home} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {() => <ScreenWithBottomNav Component={Profile} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default BottomTabs;
