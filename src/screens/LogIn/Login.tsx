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
import {login} from '../../store/auth';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {Toast} from 'toastify-react-native';

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
  const dispatch = useAppDispatch();
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

  const loginApiCallHandel = async () => {
    setLoading(true);
    try {
      const {payload}: any = await dispatch(login(userData));
      console.log('payload', payload);
      if (payload?.data?.success) {
        setError('');
        Toast.success(payload?.data?.msg);
        navigation.replace('MainApp');
      } else {
        Toast.error(payload?.data?.msg || 'Please try again after sometimes');
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'LogIn error');
      Toast.error('Please try again after sometimes');
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!validate()) return;
    loginApiCallHandel();
  };
  const handleLoginWithGoogle = () => {
    navigation.replace('MainApp');
  };

  return (
    <View style={tw`h-full justify-center pt-20 bg-[${colors.primary}]`}>
      <View style={tw`absolute top-0 right-0 z-0`}>
        <LoginBgIcon />
      </View>

      <View style={tw`w-full px-6 flex gap-6 z-10`}>
        <View style={tw`flex items-center`}>
          {/* <View style={tw`h-16 w-16 mt-20`}></View> */}
          <Text style={[tw`text-white mr-10`, textStyle.fsrobo_36_600]}>
            Budget
          </Text>
          <Text
            style={[tw`text-4xl text-white ml-10`, textStyle.fsrobo_36_600]}>
            Buddy
          </Text>
        </View>
        <Input
          label="Email"
          height={12}
          placeholder="Enter your email"
          leftIcon={<Icon name="user" color={colors.primary} size={20} />}
          iconSize={20}
          type="text"
          onChangeTextCustom={value =>
            handleInputChange('email', value.toLowerCase())
          }
          value={userData.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          height={12}
          leftIcon={<Icon name="lock" color={colors.primary} size={20} />}
          rightIcon={
            <Pressable onPress={() => setShowPassword(prev => !prev)}>
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

        <View style={tw`flex-row items-center justify-between `}>
          <Text style={[tw`text-white`, textStyle.fsrobo_16_500]}>
            Forgot password?
          </Text>
          <Pressable onPress={() => {}}>
            <Text style={[tw`text-white`, textStyle.fsrobo_16_500]}>
              Click here
            </Text>
          </Pressable>
        </View>

        <Button
          onPress={handleLogin}
          title={loading ? 'Logging In...' : 'Login'}
          style="bg-black rounded-lg w-full py-3"
          textStyle={'text-white text-center'}
          textType={textStyle.fsrobo_20_600}
          disabled={loading}
        />
        <View style={tw`justify-center items-center my-5 flex-row gap-1`}>
          <Text
            style={[
              tw` text-center justify-center items-center text-white`,
              textStyle.fsrobo_16_500,
            ]}>
            Don’t have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={[tw`text-black underline`, textStyle.fsrobo_16_500]}>
              Signup
            </Text>
          </Pressable>
        </View>

        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`w-40 h-[1px] bg-white`}></View>
          <View style={tw`w-40 h-[1px] bg-white`}></View>
        </View>

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

      <Text style={tw`text-base font-semibold text-center mt-10 text-white`}>
        Terms & conditions
      </Text>
    </View>
  );
};

export default Login;
