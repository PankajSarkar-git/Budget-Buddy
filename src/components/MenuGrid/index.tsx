import React from 'react';
import {View, FlatList} from 'react-native';
import tw from 'twrnc';
import MenuButton from '../MenuButton';
import {useNavigation} from '@react-navigation/native';
interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  path?: string | null;
}
const menuData:MenuItem[] = [
  {
    id: '1',
    title: 'Earnings',
    icon: 'arrow-up',
    color: '#32CD32',
    path: 'Earnings',
  },
  {
    id: '2',
    title: 'Expenses',
    icon: 'arrow-down',
    color: 'red',
    path: 'Expenses',
  },
  {
    id: '3',
    title: 'Savings',
    icon: 'dollar-sign',
    color: 'yellow',
    path: 'Savings',
  },
  {id: '4', title: 'Bills', icon: 'credit-card', color: 'blue'},
  {id: '5', title: 'Investments', icon: 'trending-up', color: '#FF00FF'},
  {id: '6', title: 'Loans', icon: 'activity', color: 'red'},
  {id: '7', title: 'More', icon: 'grid', color: 'gray'},
];

const MenuGrid = () => {
  const navigate = useNavigation<any>();
  return (
    <View style={tw`mt-7`}>
      <FlatList
        data={menuData}
        nestedScrollEnabled={true}
        keyExtractor={item => item.id}
        numColumns={3} // Adjust columns as needed
        columnWrapperStyle={tw`justify-between mb-6`} // controls spacing between rows
        renderItem={({item}:{item:MenuItem}) => (
          <MenuButton
            title={item.title}
            icon={item.icon}
            color={item.color}
            onPress={() => (item.path ? navigate.navigate(item.path) : null)}
          />
        )}
        contentContainerStyle={tw`gap-y-4`}
      />
    </View>
  );
};

export default MenuGrid;
