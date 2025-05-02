import {View, Text, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {textStyle} from '../../constant/textStyle';
import {colors} from '../../constant/colors';

interface BodyCard {
  title: string;
  amount: number;
}
const BodyCard = ({title, amount}: BodyCard) => {
  return (
    <View
      style={tw`flex-row gap-6 rounded-3xl px-7 border border-[${colors.lightBorder}] bg-white`}>
      <View style={tw`pl-3 mt-5`}>
        <Text style={[tw`text-black`, textStyle.fsrobo_16_500]}>{title}</Text>
        <Text
          style={[tw`text-[${colors.textPrimary}] mt-3`, textStyle.fsrobo_24_500]}>
          ₹ {new Intl.NumberFormat('en-IN').format(amount)}
        </Text>
      </View>
      <View style={tw``}>
        <Image
          source={require('../../assets/imgs/card.png')}
          style={tw`h-[108px] w-52 mt-7`}
        />
      </View>
    </View>
  );
};

export default BodyCard;
