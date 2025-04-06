import React, {useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import LoginBgIcon from '../../assets/svgs/LoginBgIcon';
import {colors} from '../../constant/colors';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button';
import Icon2 from 'react-native-vector-icons/AntDesign';

type UserData = {
  name: string;
  email: string;
  password: string;
};

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

const Signup = () => {
  const navigation = useNavigation<any>();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (key: keyof UserData, value: string) => {
    setUserData(prev => ({...prev, [key]: value}));
    setErrors(prev => ({...prev, [key]: undefined})); // clear error on change
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    const {name, email, password} = userData;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log(userData);
      navigation.replace('MainApp');
    }, 1500);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View style={tw`h-full justify-center items-center bg-[${colors.primary}]`}>
      <View style={tw`absolute top-0 right-0 z-0`}>
        <LoginBgIcon />
      </View>

      <View style={tw`w-full px-6 flex gap-4 z-10`}>
        <Input
          label="Name"
          placeholder="Enter your name"
          leftIcon={<Icon name="user" color={colors.primary} size={20} />}
          iconSize={20}
          type="text"
          onChangeTextCustom={value => handleInputChange('name', value)}
          value={userData.name}
        />
        {errors.name && (
          <Text style={tw`text-red-500 ml-2`}>{errors.name}</Text>
        )}

        <Input
          label="Email"
          placeholder="Enter your email"
          leftIcon={<Icon name="mail" color={colors.primary} size={20} />}
          iconSize={20}
          type="text"
          onChangeTextCustom={value => handleInputChange('email', value)}
          value={userData.email}
        />
        {errors.email && (
          <Text style={tw`text-red-500 ml-2`}>{errors.email}</Text>
        )}

        <Input
          label="Password"
          placeholder="Enter your password"
          leftIcon={<Icon name="lock" color={colors.primary} size={20} />}
          rightIcon={
            <Pressable onPress={handleShowPasswordToggle}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                color={colors.primary}
                size={20}
              />
            </Pressable>
          }
          iconSize={20}
          type={showPassword ? 'text' : 'password'}
          onChangeTextCustom={value => handleInputChange('password', value)}
          value={userData.password}
        />
        {errors.password && (
          <Text style={tw`text-red-500 ml-2`}>{errors.password}</Text>
        )}

        <Button
          onPress={handleSignup}
          title={loading ? 'Signing Up...' : 'Signup'}
          style="bg-black rounded-lg w-full py-3"
          textStyle="text-white text-center font-medium text-xl"
          disabled={loading}
        />
        <Button
          onPress={() => {}}
          title="Log In With Google"
          style="bg-white rounded-lg w-full py-3"
          textStyle="text-black text-center font-medium text-xl"
          leftIcon={<Icon2 name="google" size={20} />}
        />

        {loading && <ActivityIndicator color="#fff" size="small" />}
      </View>

      <Text style={tw`text-base font-semibold text-center mt-36 text-white`}>
        Terms & conditions
      </Text>
    </View>
  );
};

export default Signup;
