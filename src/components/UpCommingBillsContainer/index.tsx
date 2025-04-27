import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../hooks/reduxHooks';
import {RootState} from '../../store';
import tw from 'twrnc';
import UpCommingBill from '../UpCommingBill';

const UpCommingBillsContainer = () => {
  const {isDarkMode} = useAppSelector((state: RootState) => state.ui);
  return (
    <View>
      <View>
        <View>
          <Text
            style={tw`text-sm font-normal ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
            Upcomings
          </Text>
        </View>
        <View style={tw`mt-6`}>
          <UpCommingBill />
        </View>
      </View>
    </View>
  );
};

export default UpCommingBillsContainer;
