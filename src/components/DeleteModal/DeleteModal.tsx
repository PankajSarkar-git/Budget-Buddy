import {TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import ModalComponent from '../ModalComponent';
import tw from 'twrnc';
import {AllEarning, AllExpense} from '../../utils/types';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {deleteEarning} from '../../store/earning';
import {
  afterDeletEarningUpadate,
  afterDeletExpenseUpadate,
} from '../../store/auth';
import {deleteExpense} from '../../store/expense';

interface AddModalType {
  visible: boolean;
  onClose: () => void;
  title?: string;
  data?: AllExpense | AllEarning;
  onSuccess?: (item: AllExpense | AllEarning) => void;
  isEarning?: boolean;
}

const DeleteModal = ({
  visible,
  onClose,
  title = 'Confirm Delete',
  data,
  isEarning = true,
  onSuccess = () => {},
}: AddModalType) => {
  const {isDarkMode} = useAppSelector(store => store.ui);
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    if (data) {
      if (isEarning) {
        try {
          const {payload}: any = await dispatch(deleteEarning(data?.id));
          if (payload?.data?.success) {
            onClose();
            const amount = payload?.data?.earning?.amount;
            await dispatch(afterDeletEarningUpadate(Number(amount)));
            onSuccess(data);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const {payload}: any = await dispatch(deleteExpense(data?.id));
          //   console.log(payload);
          if (payload?.data?.success) {
            onClose();
            const amount = payload?.data?.expense?.amount;
            await dispatch(afterDeletExpenseUpadate(Number(amount)));
            onSuccess(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <View>
      <ModalComponent visible={visible} onClose={onClose} title={title}>
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-semibold text-center mb-4`}>
            Are you sure you want to delete this item?
          </Text>
          <View style={tw`flex-row justify-between mt-4`}>
            <TouchableOpacity
              onPress={handleDelete}
              style={tw`bg-red-500 px-4 py-2 rounded w-[48%]`}>
              <Text style={tw`text-white text-center font-medium`}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={tw`bg-gray-300 px-4 py-2 rounded w-[48%]`}>
              <Text style={tw`text-black text-center font-medium`}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
    </View>
  );
};

export default DeleteModal;
