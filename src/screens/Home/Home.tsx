import {View, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import TopBanner from '../../components/TopBanner';
import BodyComponent from '../../components/Body';
const Home = () => {
  return (
    <ScrollView>
      <View style={tw``}>
        <TopBanner />
        <BodyComponent />
      </View>
    </ScrollView>
  );
};

export default Home;
