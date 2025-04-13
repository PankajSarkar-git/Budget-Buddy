import {View, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import TopBanner from '../../components/TopBanner';
import BodyComponent from '../../components/Body';
const Home = () => {
  return (
    <View style={tw`flex flex-1`}>
      <View style={tw``}>
        <TopBanner />
      </View>
      <View style={tw`flex-1`}>
        <BodyComponent />
      </View>
    </View>
  );
};

export default Home;
