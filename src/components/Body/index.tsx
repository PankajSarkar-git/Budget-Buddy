

import {View, Text, FlatList} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {RootState} from '../../store';
import {colors} from '../../constant/colors';
import {useAppSelector} from '../../hooks/reduxHooks';
import MenuGrid from '../MenuGrid';
import UpCommingBillsContainer from '../UpCommingBillsContainer';

const BodyComponent = () => {
  const {isDarkMode} = useAppSelector((state: RootState) => state.ui);

  // Data for FlatList (no need for conditionals, just list components directly)
  const data = [
    // {id: '1', component: <UpCommingBillsContainer />},
    {id: '2', component: <MenuGrid />},
  ];

  return (
    <View
      style={tw`rounded-t-[40px] -mt-12  ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
      <View style={tw`flex justify-center items-center py-3`}>
        <View style={tw`w-1/3 h-1 bg-[${colors.grayLight}] rounded-full`} />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`py-3.5 px-12 pb-10`}
        renderItem={({item}) => item.component}
      />
    </View>
  );
};

export default BodyComponent;
