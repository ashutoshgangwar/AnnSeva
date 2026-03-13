import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CustomerHome from '../screens/customer/CustomerHome/CustomerHome';
import CreateBhandara from '../screens/customer/CreateBhandara/CreateBhandara';
import NearbyHalwai from '../screens/customer/NearbyHalwai/NearbyHalwai';
import MyOrders from '../screens/customer/MyOrders/MyOrders';
import OrderSummary from '../screens/customer/OrderSummary/OrderSummary';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CustomerHome" component={CustomerHome} options={{title: 'AnnSeva'}} />
      <Stack.Screen name="CreateBhandara" component={CreateBhandara} options={{title: 'Create Bhandara'}} />
      <Stack.Screen name="NearbyHalwai" component={NearbyHalwai} options={{title: 'Nearby Halwai'}} />
      <Stack.Screen name="MyOrders" component={MyOrders} options={{title: 'My Orders'}} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} options={{title: 'Order Summary'}} />
    </Stack.Navigator>
  );
};

export default CustomerStack;
