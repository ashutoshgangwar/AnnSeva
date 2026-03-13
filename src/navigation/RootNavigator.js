import React from 'react';
import {useAuth} from '../context/AuthContext';
import AuthStack from './AuthStack';
import CustomerStack from './CustomerStack';
import HalwaiStack from './HalwaiStack';
import HalwaiOnboardingStack from './HalwaiOnboardingStack';

const RootNavigator = () => {
  const {role, hasCompletedHalwaiOnboarding} = useAuth();

  if (role === 'customer') {
    return <CustomerStack />;
  }

  if (role === 'halwai') {
    if (!hasCompletedHalwaiOnboarding) {
      return <HalwaiOnboardingStack />;
    }
    return <HalwaiStack />;
  }

  return <AuthStack />;
};

export default RootNavigator;
