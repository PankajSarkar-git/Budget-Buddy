import {View, Text, Pressable, ActivityIndicator, Image} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import LoginBgIcon from '../../assets/svgs/LoginBgIcon';
import {colors} from '../../constant/colors';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button';
import {textStyle} from '../../constant/textStyle';

type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({email: '', password: ''});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (key: keyof UserData, value: string) => {
    setUserData(prev => ({...prev, [key]: value}));
    setError('');
  };

  const validate = (): boolean => {
    const {email, password} = userData;

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address (e.g. user@example.com).');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setError('');
    setLoading(true);
    navigation.replace('MainApp');

    // setTimeout(() => {
    //   setLoading(false);

    //   if (
    //     userData.email.trim().toLowerCase() === 'user@example.com' &&
    //     userData.password === 'password123'
    //   ) {
    //     navigation.replace('MainApp');
    //   } else {
    //     setError('Invalid email or password. Please try again.');
    //   }
    // }, 1500);
  };
  const handleLoginWithGoogle = () => {
    navigation.replace('MainApp');
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View style={tw`h-full justify-center items-center bg-[${colors.primary}]`}>
      <View style={tw`absolute top-0 right-0 z-0`}>
        <LoginBgIcon />
      </View>

      <View style={tw`w-full px-6 flex gap-6 z-10`}>
        <View style={tw`flex items-center`}>
          {/* <View style={tw`h-16 w-16 mt-20`}></View> */}
          <Text style={[tw`text-white mr-10`, textStyle.fsrobo_36_600]}>
            Expense
          </Text>
          <Text style={[tw`text-4xl text-white ml-10`]}>Tracker</Text>
        </View>
        <Input
          label="Email"
          height={12}
          placeholder="Enter your email"
          leftIcon={<Icon name="user" color={colors.primary} size={20} />}
          iconSize={20}
          type="text"
          onChangeTextCustom={value => handleInputChange('email', value)}
          value={userData.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          height={12}
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

        {error && <Text style={tw`text-red-500`}>{error}</Text>}

        <Button
          onPress={handleLogin}
          title={loading ? 'Logging In...' : 'Login'}
          style="bg-black rounded-lg w-full py-3"
          textStyle={'text-white text-center'}
          textType={textStyle.fsrobo_20_600}
          disabled={loading}
        />

        <Button
          onPress={handleLoginWithGoogle}
          title="Log In With Google"
          style="bg-white rounded-lg w-full py-3"
          textStyle="text-black text-center font-medium text-xl"
          leftIcon={
            <Image
              source={require('../../assets/imgs/GoogleIcon.png')}
              style={tw`h-4 w-4`}
            />
          }
          disabled={loading}
        />

        {loading && <ActivityIndicator color="#fff" size="small" />}
      </View>

      <Text style={tw`text-base font-semibold text-center mt-20 text-white`}>
        Terms & conditions
      </Text>
    </View>
  );
};

export default Login;
