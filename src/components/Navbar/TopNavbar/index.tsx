import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootState} from '../../../store';
import {toggleDarkMode} from '../../../store/ui';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../constant/colors';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {logout} from '../../../store/auth';

function TopNavbar() {
  const {isDarkMode} = useAppSelector((state: RootState) => state.ui);
  const {userData} = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<any>();
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  const logOut = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };
  return (
    <View
      style={tw`flex-row justify-between items-center px-7 bg-[${colors.primary}] py-6`}>
      {/* Profile Section */}
      <View
        style={tw`w-12 h-12 rounded-full bg-white flex justify-center items-center`}>
        <Text style={tw`text-black text-sm font-normal`}>
          {userData?.name
            ?.split(' ')
            ?.map(i => i.charAt(0))
            ?.join('')}
        </Text>
      </View>

      {/* Icons Section */}
      <View style={tw`flex flex-row gap-4`}>
        <TouchableOpacity onPress={() => dispatch(toggleDarkMode())}>
          <Icon
            name={isDarkMode ? 'moon-o' : 'sun-o'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
          <Icon name="bell" size={20} color="white" />
        </TouchableOpacity>   
      </View>
    </View>
  );
}

export default TopNavbar;
