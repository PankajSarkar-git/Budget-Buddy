// IconPicker.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const iconOptions = [
  { label: 'Airplane', value: 'airplane-outline' },
  { label: 'Alarm', value: 'alarm-outline' },
  { label: 'Battery Full', value: 'battery-full-outline' },
  { label: 'Camera', value: 'camera-outline' },
  { label: 'Chatbubble', value: 'chatbubble-ellipses-outline' },
  { label: 'Cloud', value: 'cloud-outline' },
  { label: 'Heart', value: 'heart-outline' },
  { label: 'Home', value: 'home-outline' },
  { label: 'Lock', value: 'lock-closed-outline' },
  { label: 'Notifications', value: 'notifications-outline' },
  { label: 'Person', value: 'person-outline' },
  { label: 'Search', value: 'search-outline' },
  { label: 'Settings', value: 'settings-outline' },
  { label: 'Star', value: 'star-outline' },
  { label: 'Trash', value: 'trash-outline' },
];

const IconPicker = () => {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState<string | null>(null);
  const [items, setItems] = useState(iconOptions);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Icon</Text>
      <DropDownPicker
        open={open}
        value={icon}
        items={items}
        setOpen={setOpen}
        setValue={setIcon}
        setItems={setItems}
        placeholder="Choose an icon"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        listItemLabelStyle={styles.itemLabel}
        renderListItem={(props) => (
          <View style={styles.itemContainer}>
            <Ionicons
              name={props.label.toLowerCase().replace(' ', '-') + '-outline'}
              size={18}
              style={styles.icon}
            />
            <Text style={styles.itemText}>{props.label}</Text>
          </View>
        )}
      />
      {icon && (
        <View style={styles.selectedIcon}>
          <Text style={styles.label}>Selected Icon:</Text>
          <Ionicons name={icon} size={40} color="#007aff" />
        </View>
      )}
    </View>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    borderColor: '#ccc',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    maxHeight: 200,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
  },
  itemLabel: {
    fontSize: 14,
  },
  selectedIcon: {
    marginTop: 20,
    alignItems: 'center',
  },
});
