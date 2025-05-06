

import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useRoute} from '@react-navigation/native';
import {formatDateString} from '../../utils/time';
import {useAppSelector} from '../../hooks/reduxHooks';

const ItemDetails = () => {
  const route = useRoute();
  const {item}: any = route.params;
  const {isDarkMode} = useAppSelector(state => state.ui);
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const subTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-[#1f1f1f]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  const Field = ({label = '', value = '', color = textColor}) => (
    <View style={tw`mb-4`}>
      <Text style={tw`${subTextColor} text-sm mb-1`}>{label}</Text>
      <Text style={tw`text-base font-medium ${color}`}>{value}</Text>
    </View>
  );

  return (
    <View style={tw`${bgColor} px-4 py-6 flex-1`}>
      <ScrollView contentContainerStyle={tw`${bgColor} px-4 pt-6 pb-10`}>
        <Text style={tw`text-3xl font-bold ${textColor} mb-6`}>
          Transaction Details
        </Text>

        <View
          style={tw`${cardBg} p-5 rounded-2xl shadow-md border ${borderColor}`}>
          <Field
            label={item.type === 'Expenses' ? 'Category' : 'Source'}
            value={item.category || item.source}
          />
          <Field
            label="Amount"
            value={`₹ ${item.amount}`}
            color={item.type === 'Expenses' ? "text-red-500" : "text-green-500"}
          />
          <Field label="Description" value={item.description || '—'} />
          <Field label="Date" value={formatDateString(item.date)} />
          <Field label="Created At" value={formatDateString(item.createdAt)} />
          <Field
            label="Last Updated"
            value={formatDateString(item.updatedAt)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemDetails;
