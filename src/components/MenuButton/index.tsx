import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const MenuButton = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <View style={tw`w-16`}>
      {/* Button Container */}
      <View
        style={[
          tw`size-16 justify-center items-center rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`,
          {
            elevation: 2,
          },
        ]}>
        <Icon
          name="credit-card"
          size={30}
          color={isDarkMode ? 'white' : 'black'}
        />
      </View>

      {/* Text */}
      <Text
        style={tw`text-center mt-2 text-sm font-medium ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        Card
      </Text>
    </View>
  );
};

export default MenuButton;
