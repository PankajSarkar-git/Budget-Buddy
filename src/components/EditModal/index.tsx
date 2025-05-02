import { View} from 'react-native';
import React from 'react';
import ModalComponent from '../ModalComponent';
import ExpensesTab from '../ExpensesTab/Index';
import EarningsTab from '../EarningsTab/Index';
import {AllEarning, AllExpense} from '../../utils/types';

interface AddModalType {
  visible: boolean;
  onClose: () => void;
  title?: string;
  data?: any;
  onSuccess?: (item: AllExpense | AllEarning) => void;
  isEarning?: boolean;
}

const EditModal = ({
  visible,
  onClose,
  title,
  data,
  isEarning = true,
  onSuccess = () => {},
}: AddModalType) => {
  return (
    <View>
      <ModalComponent visible={visible} onClose={onClose} title={title}>
        {isEarning ? (
          <EarningsTab
            onSuccess={onSuccess}
            id={data.id}
            amount={data?.amount}
            date={data?.date}
            description={data?.description}
            fromType="Edit"
            source={data?.source}
            onClose={onClose}
          />
        ) : (
          <ExpensesTab
          onSuccess={onSuccess}
          id={data.id}
          amount={data?.amount}
          date={data?.date}
          description={data?.description}
          fromType="Edit"
          category={data?.category}
          onClose={onClose} />
        )}
      </ModalComponent>
    </View>
  );
};

export default EditModal;
