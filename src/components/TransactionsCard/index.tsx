import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import {textStyle} from '../../constant/textStyle';
import {useAppSelector} from '../../hooks/reduxHooks';
import {RootState} from '../../store';
import {colors} from '../../constant/colors';
const TransactionsCard = () => {
  const {isDarkMode} = useAppSelector((state: RootState) => state.ui);

  return (
    <View
      style={tw`flex-row px-5 ${isDarkMode ? 'bg-black' : 'bg-white'}  gap-4`}>
      <View style={tw`py-4`}>
        <View
          style={tw`flex justify-center items-center w-9 h-9 rounded-xl bg-white`}>
          <View style={{transform: [{rotate: '45deg'}]}}>
            <Icon name="arrow-up" size={20} color={'red'} />
          </View>
        </View>
      </View>
      <View
        style={tw`flex-1 flex-row justify-between items-center py-4 border-b border-[${colors.lightBorder}]`}>
        <View style={tw`gap-1`}>
          <Text
            style={[
              tw`${isDarkMode ? 'text-white' : 'text-black'}`,
              textStyle.fsrobo_10_400,
            ]}>
            Expense
          </Text>
          <Text
            style={[
              tw`${isDarkMode ? 'text-white' : 'text-black'}`,
              textStyle.fsrobo_16_500,
            ]}>
            Rent
          </Text>
          <Text
            style={[
              tw`${isDarkMode ? 'text-white' : 'text-black'}`,
              textStyle.fsrobo_14_400,
            ]}>
            Bill for rent
          </Text>
          <Text style={[tw`text-[#969696]`, textStyle.fsrobo_10_400]}>
            04 March 2025
          </Text>
        </View>
        <View>
          <Text style={[tw`text-red-600`, textStyle.fsrobo_16_500]}> - 40</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionsCard;
