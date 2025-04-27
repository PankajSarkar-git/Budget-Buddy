import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import tw from 'twrnc';
import {useAppSelector} from '../../hooks/reduxHooks';
import {RootState} from '../../store';
import {colors} from '../../constant/colors';
import Input from '../Input';

interface AutoCompleteInputProps {
  placeholder?: string;
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  suggestionTextStyle?: TextStyle;
  label?:string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  placeholder = 'Type here...',
  suggestions,
  value,
  label,
  onChange,
  containerStyle,
  suggestionTextStyle,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    }
  }, [value, suggestions]);

  const handleSelect = (text: string) => {
    onChange(text);
    setShowSuggestions(false);
  };

  const isDarkMode = useAppSelector((state: RootState) => state.ui.isDarkMode);
  const dynamicText = isDarkMode ? colors.white : '#1e293b';
  const dynamicBackground = isDarkMode ? colors.dark : colors.white;
  const borderColor = isDarkMode ? '#444' : colors.border;

  return (
    <View style={[tw`w-full`, containerStyle]}>
      <Input
        label={label}
        placeholder={placeholder}
        type="text"
        isMultiline={false}
        numberOfLines={1}
        value={value}
        onChangeText={(text: string) => {
          onChange(text);
          setShowSuggestions(true);
        }}
        labelStyle={`mb-1 text-sm font-normal text-[${dynamicText}]`}
        height={12}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ScrollView
          style={tw`max-h-48 border border-gray-300 bg-white rounded-md mt-1`}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled">
          {filteredSuggestions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(item)}
              style={tw`p-3 border-b border-gray-200`}>
              <Text style={[tw`text-black`, suggestionTextStyle]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AutoCompleteInput;
