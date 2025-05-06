import {View, Text, ScrollView, Pressable} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import AddDataModal from '../../components/AddDataModal';

const Profile  = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={tw`bg-blue-600 px-6 py-3 rounded-xl`}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Open Modal</Text>
      </Pressable>

      <AddDataModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};


export default Profile;
