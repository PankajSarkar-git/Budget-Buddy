import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import ModalComponent from '../ModalComponent';
import tw from 'twrnc';
import Badge from '../Badge';
import ExpensesTab from '../ExpensesTab/Index';
import EarningsTab from '../EarningsTab/Index';

interface AddModalType {
  visible: boolean;
  onClose: () => void;
}

const AddDataModal = ({visible, onClose}: AddModalType) => {
  const [tab, setTab] = useState('earnings');

  return (
    <View>
      <ModalComponent visible={visible} onClose={onClose} title=" ">
        <View style={tw`flex-row gap-3`}>
          <Pressable onPress={() => setTab('expenses')}>
            <Badge
              title="Expenses"
              isActive={tab === 'expenses' ? true : false}
            />
          </Pressable>
          <Pressable onPress={() => setTab('earnings')}>
            <Badge
              title="Earnings"
              isActive={tab === 'earnings' ? true : false}
            />
          </Pressable>
          <Pressable>
            <Badge
              title="Transfer"
              isActive={tab === 'transfer' ? true : false}
            />
          </Pressable>
        </View>
        {tab === 'expenses' && <ExpensesTab onClose={onClose} />}
        {tab === 'earnings' && <EarningsTab onClose={onClose} />}
      </ModalComponent>
    </View>
  );
};

export default AddDataModal;
