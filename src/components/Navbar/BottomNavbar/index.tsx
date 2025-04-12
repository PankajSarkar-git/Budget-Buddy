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
const BottomNavbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  return (
    <View style={tw`${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <View style={tw`w-full`}>
        <BootomNavbarTopBorderSvg />
      </View>
      <View style={tw`px-7 py-2 flex-row justify-between mb-3`}>
        <View style={tw`flex-row gap-14 `}>
          <Pressable>
            <Icon name="home" size={24} color={'blue'} />
          </Pressable>
          <Pressable>
            <Icon name="bar-chart-2" size={24} color={'#969696'} />
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
          <Pressable>
            <Icon2 name="clock-rotate-left" size={24} color={'#969696'} />
          </Pressable>
          <Pressable>
            <Icon3 name="person-outline" size={24} color={'#969696'} />
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
