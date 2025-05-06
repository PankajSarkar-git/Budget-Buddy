

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/LogIn/Login';
import Signup from '../screens/Signup/Signup';
import AppRoute from './AppRoute';
import AsyncStorage from '@react-native-async-storage/async-storage'; // for token storage check
import {useAppSelector} from '../hooks/reduxHooks';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {token} = useAppSelector(store => store.auth);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'MainApp' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainApp" component={AppRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
