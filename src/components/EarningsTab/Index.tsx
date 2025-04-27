import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constant/colors';
import Input from '../Input';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../store';
import Button from '../Button/Button';
import {textStyle} from '../../constant/textStyle';
import DatePickerModal from '../Calendar';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {addEarning} from '../../store/earning';
import {updateEarning} from '../../store/auth';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';

type DropdownItem = {
  label: string;
  value: string;
};

type FormData = {
  amount: string;
  description: string;
  source: string | null;
  date: Date;
};

const EarningsTab = ({onClose}: {onClose: () => void}) => {
  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);

  const [formData, setFormData] = useState<FormData>({
    amount: '',
    description: '',
    source: null,
    date: new Date(),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [formattedDisplayDate, setFormattedDisplayDate] =
    useState<string>('Select Date');

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handelAddEarningApiCall = async (data: any) => {
    try {
      const {payload}: any = await dispatch(addEarning(data));
      console.log(payload, 'res');
      if (payload?.data?.success) {
        onClose();
        setFormData({
          amount: '',
          description: '',
          source: null,
          date: new Date(),
        });
        const amount = payload?.data?.eraning?.amount;
        await dispatch(updateEarning(amount));
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleSave = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount))) {
      newErrors.amount = 'Amount must be a number';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.source) {
      newErrors.source = 'source is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    const formattedDate = formData.date.toISOString();
    console.log('Earning Data:', {
      ...formData,
      date: formattedDate,
    });
    handelAddEarningApiCall({
      ...formData,
      date: formattedDate,
    });
  };

  const earningsCategories: DropdownItem[] = [
    {label: 'Salary', value: 'salary'},
    {label: 'Freelancing', value: 'freelancing'},
    {label: 'Investments', value: 'investments'},
    {label: 'Rental Income', value: 'rental_income'},
    {label: 'Dividends', value: 'dividends'},
    {label: 'Interest', value: 'interest'},
    {label: 'Business', value: 'business'},
    {label: 'Bonus', value: 'bonus'},
    {label: 'Consulting', value: 'consulting'},
    {label: 'Royalties', value: 'royalties'},
    {label: 'Grants', value: 'grants'},
    {label: 'Pension', value: 'pension'},
    {label: 'Social Security', value: 'social_security'},
    {label: 'Affiliate Income', value: 'affiliate_income'},
    {label: 'Online Sales', value: 'online_sales'},
    {label: 'Part-time Job', value: 'part_time_job'},
    {label: 'Crowdfunding', value: 'crowdfunding'},
    {label: 'Scholarships', value: 'scholarships'},
    {label: 'Cashback', value: 'cashback'},
    {label: 'Other Income', value: 'other_income'},
  ];

  const categoryLabels = earningsCategories.map(c => c.label);
  const dynamicText = isDarkMode ? colors.white : '#1e293b';
  const dynamicBackground = isDarkMode ? colors.dark : colors.white;
  const borderColor = isDarkMode ? '#444' : colors.border;

  return (
    <KeyboardAvoidingView>
      <View>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={tw`h-[440px]`}>
          <View style={tw`mt-9 gap-6 `}>
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
              error={errors.amount}
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
              error={errors.description}
            />
            <View style={tw``}>
              <AutoCompleteInput
                placeholder="Select source..."
                suggestions={categoryLabels}
                label="Source"
                value={formData.source ? formData.source : ''}
                onChange={value =>
                  setFormData(prev => ({...prev, source: value}))
                }
              />
              {errors.source && (
                <Text style={[tw`text-red-500 text-sm mt-1`]}>
                  {errors.source}
                </Text>
              )}
            </View>
            <View>
              <Text
                style={[tw`mb-1 text-base font-normal`, {color: dynamicText}]}>
                Date
              </Text>
              <Pressable
                onPress={() => setShowDatePicker(!showDatePicker)}
                style={[
                  tw`flex-row items-center justify-between rounded-lg px-4 py-3 mb-6`,
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
              {errors.date && (
                <Text style={[tw`text-red-500 text-sm mt-1`]}>
                  {errors.date}
                </Text>
              )}
              <DatePickerModal
                visible={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                selectedDate={formData.date}
                isDarkMode={isDarkMode}
                onSelectDate={(date: Date) => {
                  setFormData(prev => ({...prev, date}));
                  setFormattedDisplayDate(
                    date.toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }),
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={tw``}>
          <Button
            onPress={handleSave}
            title="Save"
            style="bg-[#613AAD] rounded-lg w-full py-3 mb-4"
            textStyle="text-white text-center font-medium text-xl"
          />
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

export default EarningsTab;
