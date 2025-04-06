import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../store';
import {toggleDarkMode} from '../../../store/ui';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../../constant/colors';

function TopNavbar() {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  const navigation = useNavigation<any>();
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <View
      style={tw`flex-row justify-between items-center px-7 bg-[${colors.primary}] py-6`}>
      {/* Profile Section */}
      <View
        style={tw`w-12 h-12 rounded-full bg-green-100 flex justify-center items-center`}>
        <Text style={tw`text-black text-sm font-normal`}>Sk</Text>
      </View>
      <TouchableOpacity
        onPress={goToProfile}
        style={tw`bg-green-600 px-6 py-3 rounded-lg`}>
        <Text style={tw`text-white text-base`}>Go to Profile</Text>
      </TouchableOpacity>
      {/* Icons Section */}
      <View style={tw`flex flex-row gap-4`}>
        <TouchableOpacity onPress={() => dispatch(toggleDarkMode())}>
          <Icon
            name={isDarkMode ? 'moon-o' : 'sun-o'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <Icon name="bell" size={20} color="white" />
      </View>
    </View>
  );
}

export default TopNavbar;
