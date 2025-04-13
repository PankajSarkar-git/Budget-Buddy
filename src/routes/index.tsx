// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../screens/Home/Home';
// import Profile from '../screens/Profile/Profile';
// import Login from '../screens/LogIn/Login';

// const MainRoute = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Home"
//           component={Home}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Login"
//           component={Login}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Profile"
//           component={Profile}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default MainRoute;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/LogIn/Login';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import Signup from '../screens/Signup/Signup';
import AppRoute from './AppRoute';

const Stack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainApp" component={AppRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
