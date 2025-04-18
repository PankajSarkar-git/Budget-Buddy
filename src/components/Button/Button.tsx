import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';

type ButtonProps = {
  title: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: string;
  textStyle?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  leftIcon,
  rightIcon,
  style = 'bg-blue-500 py-3 px-4 rounded-full',
  textStyle = 'text-white text-base font-semibold',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={tw`${style} ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}>
      <View style={tw`flex-row items-center justify-center`}>
        {leftIcon && <View style={tw`mr-2`}>{leftIcon}</View>}
        <Text style={tw`${textStyle}`}>{title}</Text>
        {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
