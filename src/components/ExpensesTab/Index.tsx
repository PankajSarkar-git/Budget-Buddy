import {View, Text, StyleSheet, Pressable, Modal, Platform} from 'react-native';
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
  const [openIcon, setOpenIcon] = useState<boolean>(false);
  const [items, setItems] = useState<DropdownItem[]>([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleSave = () => {
    console.log(
      'logggggggggggg',
      formData.date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    );

    const formattedDate = formData.date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    console.log('Expense Data:', {
      ...formData,
      date: formattedDate,
    });
  };

  const dynamicText = isDarkMode ? colors.white : '#1e293b';
  const dynamicBackground = isDarkMode ? colors.dark : colors.white;
  const borderColor = isDarkMode ? '#444' : colors.border;

  const formattedDisplayDate = formData.date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View>
      <View style={tw`mt-9 gap-6`}>
        <Input
          label="Amount"
          placeholder="Amount"
          height={12}
          type="text"
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
          value={formData.description}
          onChangeTextCustom={text =>
            setFormData(prev => ({...prev, description: text}))
          }
          labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
          height={16}
        />

        <View style={tw`flex-row gap-4`}>
          <View style={tw`w-[75%]`}>
            <Text
              style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
              Category
            </Text>
            <DropDownPicker
              open={open}
              value={formData.category}
              items={items}
              setOpen={setOpen}
              setValue={(callback: any) =>
                setFormData(prev => ({
                  ...prev,
                  category:
                    typeof callback === 'function'
                      ? callback(prev.category)
                      : callback,
                }))
              }
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
                maxHeight: 250,
              }}
            />
          </View>
          <View style={tw`w-[15%]`}>
            <Text
              style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
              Icon
            </Text>
            <DropDownPicker
              open={openIcon}
              value={formData.icon}
              items={items}
              setOpen={setOpenIcon}
              setValue={(callback: any) =>
                setFormData(prev => ({
                  ...prev,
                  icon:
                    typeof callback === 'function'
                      ? callback(prev.icon)
                      : callback,
                }))
              }
              setItems={setItems}
              zIndex={3000}
              zIndexInverse={1000}
              showArrowIcon={false}
              placeholder="icon"
              style={[
                styles.iconDropdownStyle,
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
                maxHeight: 250,
              }}
            />
          </View>
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
              {formattedDisplayDate}
            </Text>
            <Icon name="calendar" size={20} color={colors.primary} />
          </Pressable>

          {/* Date Picker Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}>
            <View
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
              <View
                style={tw`bg-white rounded-xl p-4 w-11/12 max-w-md items-center`}>
                <DatePicker
                  mode="date"
                  date={formData.date}
                  onDateChange={(selectedDate: Date) =>
                    setFormData(prev => ({...prev, date: selectedDate}))
                  }
                />
                <Pressable
                  style={tw`mt-4 bg-[#613AAD] px-5 py-2 rounded-full`}
                  onPress={() => setShowDatePicker(false)}>
                  <Text style={tw`text-white text-base`}>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

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
    borderRadius: 100,
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
