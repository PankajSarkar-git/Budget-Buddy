import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../constant/colors';

const TopBanner = () => {
  return (
    <View style={tw`px-12 bg-[${colors.primary}]`}>
      <View style={tw`pb-6`}>
        <Text style={tw`text-white text-2xl font-normal text-center`}>
          Hii Pankaj 👋
        </Text>
      </View>

      <View style={tw`mb-12`}>
        <LinearGradient
          colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)']}
          useAngle={true}
          angle={145} // Top to bottom fade
          angleCenter={{x: 0.5, y: 0.5}}
          style={tw`rounded-3xl border-white/40 border py-6 w-full mb-12`}>
          <View style={tw`flex justify-center items-center`}>
            <Text style={tw`text-sm text-white font-medium`}>
              Current Balance
            </Text>
            <Text style={tw`text-2xl text-white font-medium`}>₹ 2000</Text>
          </View>
          <View
            style={tw` flex flex-row justify-between items-baseline mt-6 px-6 `}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <View
                style={tw`w-8 h-8 rounded-full bg-white flex justify-center items-center`}>
                <Icon name="arrow-up" size={20} color={colors['green-light']} />
              </View>
              <View style={tw`ml-2`}>
                <Text style={tw`text-xs text-white font-normal`}>Earnings</Text>
                <Text style={tw`text-base text-white font-medium`}>₹ 2000</Text>
              </View>
            </View>
            <View style={tw`flex flex-row items-center justify-center`}>
              <View
                style={tw`w-8 h-8 rounded-full bg-white flex justify-center items-center`}>
                <Icon name="arrow-down" size={20} color={'red'} />
              </View>
              <View style={tw`ml-2`}>
                <Text style={tw`text-xs text-white font-normal`}>Expenses</Text>
                <Text style={tw`text-base text-white font-medium`}>₹ 4000</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TopBanner;
