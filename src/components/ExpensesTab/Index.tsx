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
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Button from '../Button/Button';
import {useAppDispatch} from '../../hooks/reduxHooks';
import DatePickerModal from '../Calendar';
import {addExpense, editExpense} from '../../store/expense';
import {afterEditExpencesUpdate, updateExpense} from '../../store/auth';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
import {AllEarning, AllExpense, DropdownItem} from '../../utils/types';
import {formatedDate} from '../../utils/time';
import {
  capitalizeEachWord,
  capitalizeFirstLetterOnly,
  removeDotsAndZero,
} from '../../utils/textFromate';
import {categories} from '../../utils/staticData';
import {Toast} from 'toastify-react-native';

type FormData = {
  amount: string;
  description: string;
  category: string | null;
  date: Date;
};
interface ExpensesTab {
  onClose: () => void;
  category?: string;
  description?: string;
  amount?: string;
  date?: Date;
  fromType?: 'Edit' | 'Add';
  id?: string;
  onSuccess?: (item: AllExpense | AllEarning) => void;
}

const ExpensesTab = ({
  onClose,
  fromType = 'Add',
  amount,
  date,
  description,
  category,
  id = '',
  onSuccess = () => {},
}: ExpensesTab) => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  const [formData, setFormData] = useState<FormData>({
    amount: amount ? amount.toString() : '',
    description: description ? description : '',
    category: category ? category : null,
    date: date ? new Date(date) : new Date(),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [formattedDisplayDate, setFormattedDisplayDate] = useState<string>(
    date ? formatedDate(formData.date) : 'Select Date',
  );

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handelAddExpensesApiCall = async (data: any) => {
    setLoading(true);
    if (fromType === 'Add') {
      try {
        const {payload}: any = await dispatch(addExpense(data));
        //(payload, 'res');
        if (payload?.data?.success) {
          onClose();
          setFormData({
            amount: '',
            description: '',
            category: null,
            date: new Date(),
          });
          const amount = payload?.data?.expense?.amount;
          await dispatch(updateExpense(amount));
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
        console.log({data, id});

        const {payload}: any = await dispatch(editExpense({data, id}));
        console.log(payload, 'res');
        if (payload?.data?.success) {
          onClose();
          setFormData({
            amount: '',
            description: '',
            category: null,
            date: new Date(),
          });
          const resAmount = payload?.data?.expense?.amount;
          if (amount) {
            if (resAmount < amount) {
              console.log(Number(Number(amount) - resAmount));

              await dispatch(
                afterEditExpencesUpdate(Number(Number(amount) - resAmount)),
              );
            } else {
              console.log(Number(resAmount - Number(amount)));

              await dispatch(
                afterEditExpencesUpdate(Number(resAmount - Number(amount))),
              );
            }
          }
          onSuccess(payload?.data?.expense as AllExpense);
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

    if (!formData.category) {
      newErrors.category = 'category is required';
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
    // console.log('Expense Data:', {
    //   ...formData,
    //   date: formattedDate,
    // });
    handelAddExpensesApiCall({
      ...formData,
      date: formattedDate,
    });
  };
  const categoryLabels = categories.map(c => c.label);
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
          <View style={tw`mt-9 gap-6`}>
            <Input
              label="Amount"
              placeholder="Amount"
              height={12}
              type="number"
              value={formData.amount}
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
                placeholder="Select categories..."
                suggestions={categoryLabels}
                label="Category"
                value={formData.category ? formData.category : ''}
                onChange={value =>
                  setFormData(prev => ({
                    ...prev,
                    category: capitalizeEachWord(value),
                  }))
                }
              />
              {errors.category && (
                <Text style={[tw`text-red-500 text-sm mt-1`]}>
                  {errors.category}
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
                    borderColor: isDarkMode ? colors.pencil : colors.grayLight,
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
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ExpensesTab;
