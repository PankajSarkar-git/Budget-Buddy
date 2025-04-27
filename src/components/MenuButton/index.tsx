import {View, Text, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

interface MenuButtonProps {
  title: string;
  icon: string;
  color?: string;
  onPress?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  icon,
  color,
  onPress,
}) => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <Pressable style={tw`w-20 items-center`} onPress={onPress}>
      <View
        style={[
          tw`size-16 justify-center items-center rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`,
          {elevation: 2},
        ]}>
        <Icon name={icon} size={24} color={color} />
      </View>

      <Text
        style={tw`text-center mt-2 text-xs font-medium ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default MenuButton;
