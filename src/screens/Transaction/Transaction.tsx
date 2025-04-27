import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {textStyle} from '../../constant/textStyle';
import {colors} from '../../constant/colors';
import TransactionsCard from '../../components/TransactionsCard';
import {useAppSelector} from '../../hooks/reduxHooks';
import {RootState} from '../../store';

const Transaction = () => {
  const {isDarkMode} = useAppSelector((state: RootState) => state.ui);

  return (
    <View style={tw`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'} pt-9 px-6`}>
      <View style={tw` border-b border-[${colors.lightBorder}] w-full`}>
        <Text
          style={[
            tw`${isDarkMode ? 'text-white' : 'text-black'} pb-6`,
            textStyle.fsrobo_20_500,
          ]}>
          Transactions
        </Text>
      </View>
      <ScrollView style={tw`flex-1 mb-12`} showsVerticalScrollIndicator={false}>
        <View>
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default Transaction;
