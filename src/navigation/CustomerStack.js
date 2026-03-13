import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomerHome from '../screens/customer/CustomerHome/CustomerHome';
import CreateBhandara from '../screens/customer/CreateBhandara/CreateBhandara';
import NearbyHalwai from '../screens/customer/NearbyHalwai/NearbyHalwai';
import MyOrders from '../screens/customer/MyOrders/MyOrders';
import OrderSummary from '../screens/customer/OrderSummary/OrderSummary';
import ProfileScreen from '../screens/shared/ProfileScreen';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator
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
        name="CustomerHome"
        component={CustomerHome}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateBhandara" component={CreateBhandara} options={{title: 'Create Bhandara'}} />
      <Stack.Screen name="NearbyHalwai" component={NearbyHalwai} options={{title: 'Nearby Halwai'}} />
      <Stack.Screen name="MyOrders" component={MyOrders} options={{title: 'My Orders'}} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} options={{title: 'Order Summary'}} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'My Profile'}} />
    </Stack.Navigator>
  );
};

export default CustomerStack;
