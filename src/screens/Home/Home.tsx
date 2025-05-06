import {Alert, BackHandler, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import TopBanner from '../../components/TopBanner';
import BodyComponent from '../../components/Body';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {getUserDetails} from '../../store/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const checkUserDetails = async () => {
    try {
      const {payload}: any = await dispatch(getUserDetails());
      //console.log(payload, 'userDetails');
      if (!payload?.data?.success) {
        Alert.alert('Your session has expired. Please login!');
        navigation.replace('Login');
      }
    } catch (error) {
      console.log(error);
      navigation.replace('Login');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Exit the app
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );
  useEffect(() => {
    checkUserDetails();
  }, []);

  return (
    <View style={tw`flex flex-1`}>
      <View style={tw``}>
        <TopBanner />
      </View>
      <View style={tw`flex-1`}>
        <BodyComponent />
      </View>
    </View>
  );
};

export default Home;
