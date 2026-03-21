import React, {createContext, useContext, useMemo, useState} from 'react';
import {loginUser, signupUser} from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authSession, setAuthSession] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [hasCompletedHalwaiOnboarding, setHasCompletedHalwaiOnboarding] = useState(false);

  const applyAuthState = authResult => {
    setAccessToken(authResult.token);
    setUser(authResult.user);
    setRole(authResult.user.role);
    setAuthSession({
      token: authResult.token,
      userId: authResult.user.userId || null,
      name: authResult.user.name || '',
    });
    setHasCompletedHalwaiOnboarding(authResult.user.role !== 'halwai');
    setAuthError(null);
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

      applyAuthState(authResult);

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

      applyAuthState(authResult);

      return true;
    } catch (error) {
      setAuthError(error.message || 'Login failed');
      return false;
    }
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
  };

  const value = useMemo(
    () => ({
      user,
      role,
      accessToken,
      authSession,
      authError,
      hasCompletedHalwaiOnboarding,
      setHalwaiOnboardingComplete: setHasCompletedHalwaiOnboarding,
      signup,
      login,
      clearAuthError,
      logout,
    }),
    [user, role, accessToken, authSession, authError, hasCompletedHalwaiOnboarding],
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
