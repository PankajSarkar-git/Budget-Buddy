import React from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {RootState} from '../../store';

type InputProps = {
  label: string;
  placeholder: string;
  leftIcon?: any;
  rightIcon?: any;
  iconSize?: number;
  type?: 'text' | 'password';
  labelStyle?: string;
  height?: number;
  onChangeTextCustom?: (value: string) => void;
} & TextInputProps;

const Input = ({
  label,
  placeholder,
  leftIcon,
  rightIcon,
  iconSize = 20,
  type = 'text',
  onChangeTextCustom,
  height = 10,
  labelStyle = 'mb-1 text-white font-medium text-xl',
  ...rest
}: InputProps) => {
  const inputPaddingStyle = {
    paddingLeft: leftIcon ? iconSize + 16 : 12,
    paddingRight: rightIcon ? iconSize + 16 : 12,
  };
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  return (
    <View style={tw`w-full`}>
      <Text style={tw`${labelStyle}`}>{label}</Text>

      <View style={tw`relative`}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={type === 'password'}
          style={[
            tw`text-base text-gray-700 border border-gray-300 rounded-lg ${
              isDarkMode ? 'bg-black' : 'bg-white'
            } py-2 w-full h-${height}`,
            inputPaddingStyle,
          ]}
          onChangeText={onChangeTextCustom}
          {...rest}
        />

        {leftIcon && (
          <View style={[tw`absolute top-2.5 left-3`]}>
            {React.cloneElement(leftIcon, {size: iconSize})}
          </View>
        )}

        {rightIcon && (
          <View style={[tw`absolute top-2.5 right-3`]}>
            {React.cloneElement(rightIcon, {size: iconSize})}
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;
