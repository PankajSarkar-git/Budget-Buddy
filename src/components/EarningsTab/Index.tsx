import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constant/colors';
import Input from '../Input';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import {RootState} from '../../store';
import Button from '../Button/Button';
import DatePickerModal from '../Calendar';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {addEarning, editEarning} from '../../store/earning';
import {updateEarning} from '../../store/auth';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
import {AllEarning, AllExpense, DropdownItem} from '../../utils/types';
import {formatedDate} from '../../utils/time';
import {
  capitalizeEachWord,
  capitalizeFirstLetterOnly,
  removeDotsAndZero,
} from '../../utils/textFromate';
import {EarningSource} from '../../utils/staticData';
import {Toast} from 'toastify-react-native';

type FormData = {
  amount: string;
  description: string;
  source: string | null;
  date: Date;
};
interface EarningsTab {
  onClose: () => void;
  source?: string;
  description?: string;
  amount?: string;
  date?: Date;
  fromType?: 'Edit' | 'Add';
  id?: string;
  onSuccess?: (item: AllExpense | AllEarning) => void;
}

const EarningsTab = ({
  onClose,
  fromType = 'Add',
  amount,
  date,
  description,
  source,
  id = '',
  onSuccess = () => {},
}: EarningsTab) => {
  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);

  const [formData, setFormData] = useState<FormData>({
    amount: amount ? amount.toString() : '',
    description: description ? description : '',
    source: source ? source : null,
    date: date ? new Date(date) : new Date(),
  });
  const [formattedDisplayDate, setFormattedDisplayDate] = useState<string>(
    date ? formatedDate(formData.date) : 'Select Date',
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handelAddEarningApiCall = async (data: any) => {
    setLoading(true);
    if (fromType === 'Add') {
      try {
        const {payload}: any = await dispatch(addEarning(data));
        //console.log(payload, 'res');
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
          Toast.success(payload?.data?.msg);
        } else {
          Toast.error(payload?.data?.msg || 'Please try again after sometimes');
        }
      } catch (error: any) {
        console.log(error, 'error');
        Toast.error('Please try again after sometimes');
      } finally {
        setLoading(false);
      }
    } else if (fromType === 'Edit') {
      try {
        const {payload}: any = await dispatch(editEarning({data, id}));
        if (payload?.data?.success) {
          onClose();
          setFormData({
            amount: '',
            description: '',
            source: null,
            date: new Date(),
          });
          const resAmount = payload?.data?.earning?.amount;
          if (amount) {
            if (resAmount < amount) {
              await dispatch(updateEarning(Number(Number(amount) - resAmount)));
            } else {
              await dispatch(updateEarning(Number(resAmount - Number(amount))));
            }
          }
          onSuccess(payload?.data?.earning as AllEarning);
          Toast.success(payload?.data?.msg);
        } else {
          Toast.error(payload?.data?.msg || 'Please try again after sometimes');
        }
      } catch (error: any) {
        console.log(error, 'error');
        Toast.error('Please try again after sometimes');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSave = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if ((formData.amount.match(/\./g) || []).length > 1) {
      newErrors.amount = 'Amount cannot contain more than one decimal point';
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
    handelAddEarningApiCall({
      ...formData,
      date: formattedDate,
    });
  };

  const categoryLabels = EarningSource.map(c => c.label);
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
              value={formData?.amount}
              onChangeTextCustom={text =>
                setFormData(prev => ({
                  ...prev,
                  amount: removeDotsAndZero(text),
                }))
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
                setFormData(prev => ({
                  ...prev,
                  description: capitalizeFirstLetterOnly(text),
                }))
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
                  setFormData(prev => ({
                    ...prev,
                    source: capitalizeEachWord(value),
                  }))
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
                  setFormattedDisplayDate(formatedDate(date));
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
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EarningsTab;
