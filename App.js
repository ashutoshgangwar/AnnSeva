import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {OrdersProvider} from './src/context/OrdersContext';
import {theme} from './src/utils/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <AuthProvider>
        <OrdersProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </OrdersProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
