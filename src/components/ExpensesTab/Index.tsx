import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constant/colors';
import Input from '../Input';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Button from '../Button/Button';
import DatePicker from 'react-native-date-picker';

type DropdownItem = {
  label: string;
  value: string;
};

type FormData = {
  amount: string;
  description: string;
  category: string | null;
  icon: string | null;
  date: Date;
};

const ExpensesTab = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  const [formData, setFormData] = useState<FormData>({
    amount: '',
    description: '',
    category: null,
    icon: null,
    date: new Date(),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [formattedDisplayDate, setFormattedDisplayDate] =
    useState<string>('Select Date');

  const items: DropdownItem[] = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ];

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleSave = () => {
    console.log('logggggggggggg', formData.date);

    const formattedDate = formData.date.toISOString();

    console.log('Expense Data:', {
      ...formData,
      date: formattedDate,
    });
  };

  const dynamicText = isDarkMode ? colors.white : '#1e293b';
  const dynamicBackground = isDarkMode ? colors.dark : colors.white;
  const borderColor = isDarkMode ? '#444' : colors.border;

  return (
    <KeyboardAvoidingView>
      <View>
        <View style={tw`mt-9 gap-6`}>
          <Input
            label="Amount"
            placeholder="Amount"
            height={12}
            type="number"
            value={formData.amount}
            onChangeTextCustom={text =>
              setFormData(prev => ({...prev, amount: text}))
            }
            labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
          />
          <Input
            label="Description"
            placeholder="Description"
            type="text"
            isMultiline={true}
            numberOfLines={5}
            value={formData.description}
            onChangeTextCustom={text =>
              setFormData(prev => ({...prev, description: text}))
            }
            labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
            height={12}
          />

          <View style={tw`w-full`}>
            <Text
              style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
              category 
            </Text>
            <DropDownPicker
              open={open}
              value={formData.category}
              items={items}
              setOpen={setOpen}
              placeholder="Select category"
              placeholderStyle={tw`${
                isDarkMode ? 'text-white/70' : 'text-black/50'
              }`}
              setValue={callback =>
                setFormData(prev => ({
                  ...prev,
                  category:
                    typeof callback === 'function'
                      ? callback(prev.category)
                      : callback,
                }))
              }
              zIndex={3000}
              zIndexInverse={1000}
              style={[
                styles.dropdownStyle,
                {
                  borderColor: isDarkMode ? '#fff' : borderColor,
                  backgroundColor: dynamicBackground,
                },
              ]}
              containerStyle={styles.dropdownContainer}
              textStyle={[styles.dropdownText, {color: dynamicText}]}
              labelStyle={[styles.labelStyle, {color: colors.primary}]}
              dropDownContainerStyle={{
                borderColor: borderColor,
                backgroundColor: dynamicBackground,
                maxHeight: 250,
              }}
            />
          </View>
          <View>
            <Text
              style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
              Date
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={[
                tw`flex-row items-center justify-between rounded-lg px-4 py-3`,
                {
                  borderWidth: 1,
                  borderColor: isDarkMode ? '#fff' : borderColor,
                  backgroundColor: dynamicBackground,
                },
              ]}>
              <Text
                style={[
                  tw`text-sm ${
                    formattedDisplayDate === 'Select Date'
                      ? isDarkMode
                        ? 'text-white/70'
                        : 'text-black/50'
                      : isDarkMode
                      ? 'text-white'
                      : 'text-black'
                  }`,
                ]}>
                {formattedDisplayDate}
              </Text>
              <Icon name="calendar" size={20} color={colors.primary} />
            </Pressable>
            <DatePicker
              mode="date"
              modal
              maximumDate={new Date()}
              date={formData.date}
              onConfirm={(selectedDate: Date) => {
                setFormData(prev => ({...prev, date: selectedDate}));
                setFormattedDisplayDate(
                  formData.date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }),
                );
              }}
              open={showDatePicker}
              onCancel={() => setShowDatePicker(false)}
              confirmText="Save"
            />
            <View style={tw`mt-6`}>
              <Button
                onPress={handleSave}
                title="Save"
                style="bg-[#613AAD] rounded-lg w-full py-3"
                textStyle="text-white text-center font-medium text-xl"
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {},
  dropdownStyle: {
    borderWidth: 1,
    borderRadius: 8,
  },
  iconDropdownStyle: {
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 14,
  },
  labelStyle: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ExpensesTab;
