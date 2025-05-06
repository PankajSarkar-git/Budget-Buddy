import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import tw from 'twrnc';

type ButtonProps = {
  title: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: string;
  textStyle?: string;
  disabled?: boolean;
  textType?: any;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  leftIcon,
  rightIcon,
  style = 'bg-blue-500 py-3 px-4 rounded-full',
  textStyle = 'text-white text-base font-semibold',
  disabled = false,
  textType,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={tw`${style} ${disabled || loading ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}>
      <View style={tw`flex-row items-center justify-center`}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            {leftIcon && <View style={tw`mr-2`}>{leftIcon}</View>}
            <Text style={[tw`${textStyle}`, textType]}>{title}</Text>
            {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

