import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constant/colors';
import Input from '../Input';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const EarningsTab = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const dynamicText = isDarkMode ? colors.white : '#1e293b'; // slate-800
  const dynamicBackground = isDarkMode ? colors.dark : colors.white;
  const borderColor = isDarkMode ? '#444' : colors.border;

  return (
    <View>
      <View style={tw`mt-9 gap-6`}>
        <Input
          label="Amount"
          placeholder="Amount"
          height={12}
          type="text"
          labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
        />
        <Input
          label="Description"
          placeholder="Description"
          type="text"
          labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
          height={16}
        />

        <View>
          <Text style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
            Category
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={3000}
            zIndexInverse={1000}
            style={[
              styles.dropdownStyle,
              {
                borderColor: borderColor,
                backgroundColor: dynamicBackground,
              },
            ]}
            containerStyle={styles.dropdownContainer}
            textStyle={[styles.dropdownText, {color: dynamicText}]}
            labelStyle={[styles.labelStyle, {color: colors.primary}]}
            dropDownContainerStyle={{
              borderColor: borderColor,
              backgroundColor: dynamicBackground,
            }}
          />
        </View>

        <View>
          <Text style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
            Date
          </Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={[
              tw`flex-row items-center justify-between rounded-lg px-4 py-3`,
              {
                borderWidth: 1,
                borderColor: borderColor,
                backgroundColor: dynamicBackground,
              },
            ]}>
            <Text style={{color: dynamicText, fontSize: 14}}>
              {date.toDateString()}
            </Text>
            <Icon name="calendar" size={20} color={colors.primary} />
          </Pressable>
          {/* {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {},
  dropdownStyle: {
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

export default EarningsTab;
