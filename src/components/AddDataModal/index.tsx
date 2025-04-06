import {View} from 'react-native';
import React, {useState} from 'react';
import ModalComponent from '../ModalComponent';
import tw from 'twrnc';
import Badge from '../Badge';
import ExpensesTab from '../ExpensesTab/Index';

interface AddModalType {
  visible: boolean;
  onClose: () => void;
}

const AddDataModal = ({visible, onClose}: AddModalType) => {
  const [tab, setTab] = useState('earnings');

  return (
    <View>
      <ModalComponent
        visible={visible}
        onClose={onClose}
        title="Hello Modal 👋">
        <View style={tw`flex-row gap-3`}>
          <Badge title="Expenses" isActive={true} />
          <Badge title="Earnings" isActive={false} />
          <Badge title="Expenses" isActive={false} />
        </View>
        {tab === 'expenses' && <ExpensesTab />}
        {tab === 'earnings' && <ExpensesTab />}
      </ModalComponent>
    </View>
  );
};

export default AddDataModal;
