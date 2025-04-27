import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import BootomNavbarTopBorderSvg from '../../../assets/svgs/BootomNavbarTopBorderSvg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {colors} from '../../../constant/colors';
import AddDataModal from '../../AddDataModal';
import SvgBackground from './SvgBackground';
import {useNavigation, useRoute} from '@react-navigation/native';
const BottomNavbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const navigatton = useNavigation<any>();
  const route = useRoute();
  return (
    <View style={tw`${isDarkMode ? '' : ''}`}>
      <SvgBackground
        bgColor={isDarkMode ? 'black' : 'white'}
        strokeColor={isDarkMode ? colors.pencil : colors['gray-light']}
      />
      {/* <View style={tw`w-full`}>
        <BootomNavbarTopBorderSvg />
      </View> */}
      <View style={tw`px-7 py-2 flex-row justify-between mb-3`}>
        <View style={tw`flex-row gap-14 `}>
          <Pressable onPress={() => navigatton.navigate('Home')}>
            <Icon
              name="home"
              size={24}
              color={route.name === 'Home' ? 'blue' : '#969696'}
            />
          </Pressable>
          <Pressable onPress={() => navigatton.navigate('Analytics')}>
            <Icon
              name="bar-chart-2"
              size={24}
              color={route.name === 'Analytics' ? 'blue' : '#969696'}
            />
          </Pressable>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
          <View
            style={[
              tw`w-16 h-16 rounded-full bg-[${colors.primary}] flex justify-center items-center -mt-10`,
              {elevation: 5},
            ]}>
            <Icon name="plus" size={24} color={'white'} />
          </View>
        </Pressable>
        <View style={tw`flex-row gap-14 `}>
          <Pressable onPress={() => navigatton.navigate('Transaction')}>
            <Icon2
              name="clock-rotate-left"
              size={24}
              color={route.name === 'Transaction' ? 'blue' : '#969696'}
            />
          </Pressable>
          <Pressable onPress={() => navigatton.navigate('Goal')}>
            <Icon3
              name="person-outline"
              size={24}
              color={route.name === 'Goal' ? 'blue' : '#969696'}
            />
          </Pressable>
        </View>
      </View>
      {/* Modal */}
      <AddDataModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default BottomNavbar;
