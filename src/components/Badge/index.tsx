import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {colors} from '../../constant/colors';

interface BadgeType {
  title: string;
  isActive: boolean;
}
const Badge = ({title, isActive = false}: BadgeType) => {
  return (
    <View>
      <View style={tw``}>
        <View
          style={tw`bg-[${
            isActive ? colors.primary : colors.notActiveTab
          }] py-2 px-5 rounded-2xl `}>
          <Text style={tw`text-sm font-normal text-white`}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Badge;
