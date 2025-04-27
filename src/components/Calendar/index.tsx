import React from 'react';
import {Modal, View, Text, Pressable} from 'react-native';
import {Calendar} from 'react-native-calendars';
import tw from 'twrnc';
import { colors } from '../../constant/colors';


type DatePickerModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  isDarkMode?: boolean;
};

const DatePickerModal = ({
  visible,
  onClose,
  selectedDate,
  onSelectDate,
  isDarkMode = false,
}: DatePickerModalProps) => {
  const dynamicText = isDarkMode ? colors.white : '#1e293b';
  const dynamicBg = isDarkMode ? colors.dark : colors.white;

  const selectedDateStr = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={tw`flex-1 bg-black/40 justify-center items-center`}>
        <View
          style={[
            tw`rounded-xl w-[90%] p-5`,
            {backgroundColor: dynamicBg},
          ]}>
          <Text
            style={[
              tw`text-center text-lg mb-4 font-bold`,
              {color: dynamicText},
            ]}>
            Select a Date
          </Text>

          <Calendar
            onDayPress={day => {
              const newDate = new Date(day.dateString);
              onSelectDate(newDate);
              onClose();
            }}
            markedDates={{
              [selectedDateStr]: {
                selected: true,
                selectedColor: colors.primary,
                selectedTextColor: '#fff',
              },
            }}
            maxDate={new Date().toISOString().split('T')[0]}
            theme={{
              backgroundColor: dynamicBg,
              calendarBackground: dynamicBg,
              dayTextColor: dynamicText,
              textDisabledColor: isDarkMode ? '#555' : '#ccc',
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: '#fff',
              todayTextColor: colors.primary,
              arrowColor: colors.primary,
              textSectionTitleColor: dynamicText,
              monthTextColor: colors.primary,
            }}
          />

          <Pressable
            onPress={onClose}
            style={tw`mt-4 py-3 rounded-lg bg-[${colors.primary}]`}>
            <Text style={tw`text-white text-center font-medium text-base`}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
