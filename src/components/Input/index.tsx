import React from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {RootState} from '../../store';
import {textStyle} from '../../constant/textStyle';
import {colors} from '../../constant/colors';

type InputProps = {
  label: string;
  placeholder: string;
  leftIcon?: any;
  rightIcon?: any;
  iconSize?: number;
  type?: 'text' | 'password' | 'number';
  labelStyle?: string;
  height?: number;
  isMultiline?: true | false;
  numberOfLines?: number;
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
  height = 12,
  isMultiline = false,
  numberOfLines = 1,
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

      <View style={tw`relative flex items-center`}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={type === 'password'}
          keyboardType={type === 'number' ? 'number-pad' : 'default'}
          style={[
            tw`border  ${
              isDarkMode
                ? `border-[${colors.pencil}]`
                : `border-[${colors['gray-light']}]`
            } rounded-lg  ${
              isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-700'
            } py-2 w-full min-h-${height}`,
            inputPaddingStyle,
            textStyle.fsrobo_16_400,
          ]}
          multiline={isMultiline}
          numberOfLines={numberOfLines}
          onChangeText={onChangeTextCustom}
          {...rest}
        />

        {leftIcon && (
          <View style={[tw`absolute top-3 left-3`]}>
            {React.cloneElement(leftIcon, {size: iconSize})}
          </View>
        )}

        {rightIcon && (
          <View style={[tw`absolute top-3 right-3`]}>
            {React.cloneElement(rightIcon, {size: iconSize})}
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;
