
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import {View} from 'react-native';
import BottomNavbar from '../components/Navbar/BottomNavbar';
import TopNavbar from '../components/Navbar/TopNavbar';
import tw from 'twrnc';
import Analytics from '../screens/Analytics/Analytics';
import Transaction from '../screens/Transaction/Transaction';
import Goal from '../screens/Goal/Goal';
import {useRoute} from '@react-navigation/native';
import Savings from '../screens/Savings/Savings';
import Expenses from '../screens/Expenses/Expenses';
import Earnings from '../screens/Earnings/Earnings';
import TopHeader from '../components/Header/TopHeader';
import EarningDetails from '../screens/EarningDetails/EarningDetails';
import ExpensesDetails from '../screens/ExpensesDetails/ExpensesDetails';
import ItemDetails from '../screens/ItemDetails/ItemDetails';

const Stack = createNativeStackNavigator();

const ScreenWithBottomNav = ({Component}: {Component: React.ComponentType}) => {
  const route = useRoute();

  return (
    <View style={tw`h-full`}>
      <View style={tw`flex-1`}>
        {route.name === 'Home' && <TopNavbar />}
        {route.name !== 'Home' && route.name !== 'Transaction' && (
          <TopHeader title={route.name} />
        )}
        <Component />
      </View>
      <BottomNavbar />
    </View>
  );
};

const AppRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home">
        {() => <ScreenWithBottomNav Component={Home} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {() => <ScreenWithBottomNav Component={Profile} />}
      </Stack.Screen>
      <Stack.Screen name="Analytics">
        {() => <ScreenWithBottomNav Component={Analytics} />}
      </Stack.Screen>
      <Stack.Screen name="Transaction">
        {() => <ScreenWithBottomNav Component={Transaction} />}
      </Stack.Screen>
      <Stack.Screen name="Goal">
        {() => <ScreenWithBottomNav Component={Goal} />}
      </Stack.Screen>
      <Stack.Screen name="Savings">
        {() => <ScreenWithBottomNav Component={Savings} />}
      </Stack.Screen>
      <Stack.Screen name="Expenses">
        {() => <ScreenWithBottomNav Component={Expenses} />}
      </Stack.Screen>
      <Stack.Screen name="Earnings">
        {() => <ScreenWithBottomNav Component={Earnings} />}
      </Stack.Screen>
      <Stack.Screen name="Earning Details">
        {() => <ScreenWithBottomNav Component={EarningDetails} />}
      </Stack.Screen>
      <Stack.Screen name="Expenses Details">
        {() => <ScreenWithBottomNav Component={ExpensesDetails} />}
      </Stack.Screen>
      <Stack.Screen name="Item Details">
        {() => <ScreenWithBottomNav Component={ItemDetails} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppRoute;
