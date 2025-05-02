import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import {textStyle} from '../../constant/textStyle';

interface EarningsCategoryItemProps {
  source: string;
  totalEarning: string;
}
const EarningsCategoryItem = ({
  source,
  totalEarning,
}: EarningsCategoryItemProps) => {
  return (
    <LinearGradient
      colors={['#613AAD', '#7250B3']}
      style={tw` w-full flex flex-row items-center justify-between rounded-3xl p-2`}>
      <View style={tw`bg-white px-11 py-2.5 rounded-2xl`}>
        <Text style={[tw`text-black`, textStyle.fsrobo_14_500]}>{source}</Text>
      </View>
      <View>
        <Text style={[tw`text-white mr-6`, textStyle.fsrobo_24_500]}>
          ₹ {new Intl.NumberFormat('en-IN').format(+totalEarning)}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default EarningsCategoryItem;
