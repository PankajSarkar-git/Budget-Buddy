import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import UpCommingBills from '../UpCommingBill';
import MenuButton from '../MenuButton';
import {RootState} from '../../store';
import {colors} from '../../constant/colors';
// import TopBarIcon from '../../assets/svgs/TopBarICon';

const BodyComponent = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <View
      style={tw`rounded-t-[40px] -mt-12  ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
      <View style={tw`flex justify-center items-center py-3`}>
        <View
          style={tw`w-1/3 h-1 bg-[${colors['gray-light']}] rounded-full`}></View>
      </View>
      <ScrollView
        contentContainerStyle={tw``}
        style={tw``}
        showsVerticalScrollIndicator={false}>
        <View style={tw`flex justify-center items-center mt-3`}>
          {/* <TopBarIcon /> */}
        </View>
        <View style={tw`py-3.5 px-12`}>
          <View>
            <Text
              style={tw`text-sm font-normal ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              Upcomings
            </Text>
          </View>
          <View style={tw`mt-6`}>
            <UpCommingBills />
          </View>
          <View style={tw`mt-7 flex flex-row justify-between gap-10 flex-wrap`}>
            <MenuButton />
            <MenuButton />
            <MenuButton />
            <MenuButton />
            <MenuButton />
            <MenuButton />
            <MenuButton />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BodyComponent;
