import React from 'react';
import {useAuth} from '../context/AuthContext';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';
import HalwaiStack from './HalwaiStack';

const RootNavigator = () => {
  const {role} = useAuth();

  if (role === 'customer') {
    return <CustomerStack />;
  }

  if (role === 'halwai') {
    return <HalwaiStack />;
  }

  return <AuthStack />;
};

export default RootNavigator;
