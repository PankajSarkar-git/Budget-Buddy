import React from 'react';
import MainRoute from './src/routes';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store';
import {injectStore} from './src/apis/createApiInstance';
injectStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={tw`flex flex-1`}>
          <MainRoute />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
