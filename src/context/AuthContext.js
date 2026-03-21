import React, {createContext, useContext, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser, signupUser} from '../services/authApi';

const AuthContext = createContext(null);
const STORAGE_USER_ID_KEY = 'annseva_user_id';
const STORAGE_USER_NAME_KEY = 'annseva_user_name';
const HALWAI_ONBOARDING_PREFIX = 'annseva_halwai_onboarded_';

const getHalwaiOnboardingKey = identity => {
  if (!identity) {
    return null;
  }
  return `${HALWAI_ONBOARDING_PREFIX}${String(identity)}`;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authSession, setAuthSession] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [hasCompletedHalwaiOnboarding, setHasCompletedHalwaiOnboarding] = useState(false);

  const applyAuthState = async authResult => {
    const nextUserId = authResult.user.userId || '';
    const nextUserName = authResult.user.name || '';
    const onboardingIdentity =
      authResult.user.userId || authResult.user.email || authResult.user.phoneNumber || '';
    const onboardingKey = getHalwaiOnboardingKey(onboardingIdentity);

    let hasCompletedOnboarding = authResult.user.role !== 'halwai';

    if (authResult.user.role === 'halwai') {
      const hasProfileIdFromApi = authResult.user.hasProfileId;

      if (typeof hasProfileIdFromApi === 'boolean') {
        hasCompletedOnboarding = hasProfileIdFromApi;
      } else if (onboardingKey) {
        const storedStatus = await AsyncStorage.getItem(onboardingKey).catch(() => null);
        hasCompletedOnboarding = storedStatus === 'true';
      }
    }

    setAccessToken(authResult.token);
    setUser(authResult.user);
    setRole(authResult.user.role);
    setAuthSession({
      token: authResult.token,
      userId: nextUserId || null,
      name: nextUserName,
    });
    setHasCompletedHalwaiOnboarding(hasCompletedOnboarding);
    setAuthError(null);

    await AsyncStorage.multiSet([
      [STORAGE_USER_ID_KEY, nextUserId],
      [STORAGE_USER_NAME_KEY, nextUserName],
    ]).catch(() => null);
  };

  const signup = async ({name, email, phoneNumber, password, role: selectedRole}) => {
    try {
      const authResult = await signupUser({
        name,
        email,
        phoneNumber,
        password,
        role: selectedRole,
      });

      await applyAuthState(authResult);

      return true;
    } catch (error) {
      setAuthError(error.message || 'Signup failed');
      return false;
    }
  };

  const login = async ({email, phoneNumber, password}) => {
    try {
      const authResult = await loginUser({
        email,
        phoneNumber,
        password,
      });

      await applyAuthState(authResult);

      return true;
    } catch (error) {
      setAuthError(error.message || 'Login failed');
      return false;
    }
  };

  const setHalwaiOnboardingComplete = async isCompleted => {
    setHasCompletedHalwaiOnboarding(isCompleted);

    if (role !== 'halwai') {
      return;
    }

    const onboardingIdentity = user?.userId || user?.email || user?.phoneNumber;
    const onboardingKey = getHalwaiOnboardingKey(onboardingIdentity);

    if (!onboardingKey) {
      return;
    }

    if (isCompleted) {
      await AsyncStorage.setItem(onboardingKey, 'true').catch(() => null);
      return;
    }

    await AsyncStorage.removeItem(onboardingKey).catch(() => null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setAccessToken(null);
    setAuthSession(null);
    setAuthError(null);
    setHasCompletedHalwaiOnboarding(false);

    AsyncStorage.multiRemove([STORAGE_USER_ID_KEY, STORAGE_USER_NAME_KEY]).catch(() => null);
  };

  const value = useMemo(
    () => ({
      user,
      role,
      accessToken,
      authSession,
      authError,
      hasCompletedHalwaiOnboarding,
      setHalwaiOnboardingComplete,
      signup,
      login,
      clearAuthError,
      logout,
    }),
    [
      user,
      role,
      accessToken,
      authSession,
      authError,
      hasCompletedHalwaiOnboarding,
      setHalwaiOnboardingComplete,
    ],
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
