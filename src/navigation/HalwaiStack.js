import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth} from '../context/AuthContext';
import HalwaiDashboard from '../screens/halwai/HalwaiDashboard/HalwaiDashboard';
import IncomingOrders from '../screens/halwai/IncomingOrders/IncomingOrders';
import ActiveOrders from '../screens/halwai/ActiveOrders/ActiveOrders';
import HalwaiProfile from '../screens/halwai/HalwaiProfile/HalwaiProfile';
import HalwaiOnboarding from '../screens/halwai/HalwaiOnboarding/HalwaiOnboarding';

const Stack = createNativeStackNavigator();

const HalwaiStack = () => {
  const {hasCompletedHalwaiOnboarding} = useAuth();

  return (
    <Stack.Navigator initialRouteName={hasCompletedHalwaiOnboarding ? 'HalwaiDashboard' : 'HalwaiOnboarding'}>
      <Stack.Screen
        name="HalwaiOnboarding"
        component={HalwaiOnboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen name="HalwaiDashboard" component={HalwaiDashboard} options={{title: 'Halwai Dashboard'}} />
      <Stack.Screen name="IncomingOrders" component={IncomingOrders} options={{title: 'Incoming Orders'}} />
      <Stack.Screen name="ActiveOrders" component={ActiveOrders} options={{title: 'Active Orders'}} />
      <Stack.Screen name="HalwaiProfile" component={HalwaiProfile} options={{title: 'Profile'}} />
    </Stack.Navigator>
  );
};

export default HalwaiStack;
