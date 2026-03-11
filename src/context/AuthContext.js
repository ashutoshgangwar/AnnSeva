import React, {createContext, useContext, useMemo, useState} from 'react';
import {loginWithPhoneNumber} from '../services/mockAuth';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [hasCompletedHalwaiOnboarding, setHasCompletedHalwaiOnboarding] = useState(false);

  const loginWithPhone = (phoneNumber, expectedRole) => {
    const matchedUser = loginWithPhoneNumber(phoneNumber);

    if (!matchedUser) {
      setAuthError('Invalid phone number');
      return false;
    }

    if (expectedRole && matchedUser.role !== expectedRole) {
      setAuthError('Selected role does not match this number');
      return false;
    }

    setUser(matchedUser);
    setRole(matchedUser.role);
    setHasCompletedHalwaiOnboarding(matchedUser.role !== 'halwai');
    setAuthError(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setAuthError(null);
    setHasCompletedHalwaiOnboarding(false);
  };

  const value = useMemo(
    () => ({
      user,
      role,
      authError,
      hasCompletedHalwaiOnboarding,
      setHalwaiOnboardingComplete: setHasCompletedHalwaiOnboarding,
      loginWithPhone,
      logout,
    }),
    [user, role, authError, hasCompletedHalwaiOnboarding],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
