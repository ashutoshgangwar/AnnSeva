import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HalwaiDashboard from '../screens/halwai/HalwaiDashboard/HalwaiDashboard';
import IncomingOrders from '../screens/halwai/IncomingOrders/IncomingOrders';
import ActiveOrders from '../screens/halwai/ActiveOrders/ActiveOrders';
import ProfileScreen from '../screens/shared/ProfileScreen';
import HalwaiServiceProgress from '../screens/halwai/HalwaiServiceProgress/HalwaiServiceProgress';
import HalwaiPayment from '../screens/halwai/HalwaiPayment/HalwaiPayment';

const Stack = createNativeStackNavigator();

const HalwaiStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HalwaiDashboard"
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: '#2E7D32'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: '700', fontSize: 17},
        headerBackVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center', gap: 4, paddingRight: 8}}>
            <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '300'}}>‹</Text>
            <Text style={{fontSize: 14, color: '#FFFFFF', fontWeight: '600'}}>Back</Text>
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen
        name="HalwaiDashboard"
        component={HalwaiDashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="IncomingOrders" component={IncomingOrders} options={{title: 'Incoming Orders'}} />
      <Stack.Screen name="ActiveOrders" component={ActiveOrders} options={{title: 'Active Orders'}} />
      <Stack.Screen
        name="HalwaiServiceProgress"
        component={HalwaiServiceProgress}
        options={{title: 'At Location'}}
      />
      <Stack.Screen name="HalwaiPayment" component={HalwaiPayment} options={{title: 'Payment'}} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'My Profile'}} />
    </Stack.Navigator>
  );
};

export default HalwaiStack;
