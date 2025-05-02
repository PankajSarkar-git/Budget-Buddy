import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useAppSelector} from '../../hooks/reduxHooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {textStyle} from '../../constant/textStyle';
import {colors} from '../../constant/colors';
import {useNavigation} from '@react-navigation/native';

interface TopHeaderItem {
  title: string;
}
const TopHeader = ({title}: TopHeaderItem) => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  const navigation = useNavigation();
  return (
    <View
      style={tw`px-4 py-10 flex-row gap-7 items-center border-b border-[${
        colors.lightBorder
      }] ${isDarkMode ? `bg-black` : `bg-white`}`}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name={'left'} size={20} color={isDarkMode ? 'white' : 'black'} />
      </Pressable>
      <Text
        style={[
          tw`${isDarkMode ? 'text-white' : 'text-black'}`,
          textStyle.fsrobo_20_500,
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default TopHeader;
