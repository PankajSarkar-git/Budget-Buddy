import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Pressable} from 'react-native';
import {colors} from '../../constant/colors';

const UpCommingBill = () => {
  return (
    <View>
      <View
        style={tw`p-4 bg-[${colors.primary}] flex flex-row justify-between rounded-xl w-full gap-6`}>
        <View style={tw`flex flex-row items-center gap-3 flex-1`}>
          <View
            style={tw`size-12 flex justify-center items-center bg-[#D9D9D9] rounded-full`}>
            <Text style={tw`text-sm font-medium text-black`}>E</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-normal text-white`}>
              Electricity Bill
            </Text>
            <Text style={tw`text-xs font-semibold text-[#FF8954] flex-wrap`}>
              Electricity Bill of ₹3,000 is due in 2 days
            </Text>
          </View>
        </View>
        <View style={tw`justify-center`}>
          <Pressable style={tw`bg-white px-3 py-1 rounded-xl`}>
            <Text style={tw`text-black font-medium`}>Pay</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UpCommingBill;
