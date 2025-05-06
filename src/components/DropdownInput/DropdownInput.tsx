import React, {useState, useEffect} from 'react';
import {View, Text, TextStyle, ViewStyle} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import tw from 'twrnc';

interface DropdownInputProps {
  label: string;
  items: {label: string; value: string}[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isDarkMode?: boolean;
  dynamicTextColor?: string;
  dynamicBackgroundColor?: string;
  borderColor?: string;
  labelTextStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  items,
  value,
  onChange,
  error,
  isDarkMode = false,
  dynamicTextColor = '#000',
  dynamicBackgroundColor = '#fff',
  borderColor = '#ccc',
  labelTextStyle,
  dropdownStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchText === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [searchText, items]);

  return (
    <View style={tw`w-full`}>
      <Text style={[tw`mb-1`, {color: dynamicTextColor}, labelTextStyle]}>
        {label}
      </Text>
      <DropDownPicker
        open={open}
        value={value}
        items={filteredItems}
        setOpen={setOpen}
        searchable={true}
        searchPlaceholder="Type to search or create..."
        placeholder="Select or create"
        onChangeSearchText={text => setSearchText(text)}
        setValue={callback => {
          if (typeof callback === 'function') {
            const result = callback(value);
            onChange(result);
          } else {
            onChange(callback);
          }
        }}
        onSelectItem={(item: any) => {
          if (item) {
            onChange(item.value);
          }
        }}
        style={[
          {
            borderColor: isDarkMode ? '#fff' : borderColor,
            backgroundColor: dynamicBackgroundColor,
          },
          dropdownStyle,
        ]}
        containerStyle={{marginBottom: open ? 250 : 0}}
        textStyle={{color: dynamicTextColor}}
        dropDownContainerStyle={{
          borderColor: borderColor,
          backgroundColor: dynamicBackgroundColor,
          maxHeight: 250,
        }}
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
      />
      {error && <Text style={tw`text-red-500 text-sm mt-1`}>{error}</Text>}
    </View>
  );
};

export default DropdownInput;
