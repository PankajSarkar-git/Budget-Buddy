import {View} from 'react-native';
import React from 'react';
import MainRoute from './routes';
import {useAppSelector} from './hooks/reduxHooks';
import ToastContainer from 'toastify-react-native';
const MainApp = () => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  return (
    <View style={{flex: 1}}>
      <MainRoute />
      <ToastContainer theme={isDarkMode ? 'dark' : 'light'} position={'top'} />
    </View>
  );
};

export default MainApp;
