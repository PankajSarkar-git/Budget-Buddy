import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import UpCommingBills from '../UpCommingBill';
import MenuButton from '../MenuButton';
import {RootState} from '../../store';
// import TopBarIcon from '../../assets/svgs/TopBarICon';

const BodyComponent = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <View
      style={tw`rounded-t-[36px] -mt-12 h-full ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
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
    </View>
  );
};

export default BodyComponent;
