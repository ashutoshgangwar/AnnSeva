import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import InputField from '../../../components/InputField';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import styles from './LoginScreen.styles';

const LoginScreen = () => {
  const {authError, clearAuthError, login, signup} = useAuth();
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignupMode = mode === 'signup';

  const resetErrors = () => {
    setFormError('');
    clearAuthError();
  };

  const switchMode = nextMode => {
    setMode(nextMode);
    resetErrors();
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    const emailValue = email.trim().toLowerCase();
    const phoneValue = phoneNumber.replace(/\D/g, '');

    if (isSignupMode && !trimmedName) {
      setFormError('Please enter your name');
      return;
    }

    if (isSignupMode) {
      if (!emailValue) {
        setFormError('Please enter your email');
        return;
      }

      if (!phoneValue) {
        setFormError('Please enter your phone number');
        return;
      }
    } else if (!emailValue && !phoneValue) {
      setFormError('Please enter email or phone number');
      return;
    }

    if (emailValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        setFormError('Please enter a valid email');
        return;
      }
    }

    if (phoneValue && phoneValue.length !== 10) {
      setFormError('Phone number must be 10 digits');
      return;
    }

    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    if (isSignupMode && password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    resetErrors();
    setIsSubmitting(true);

    try {
      if (isSignupMode) {
        await signup({
          name: trimmedName,
          email: emailValue,
          phoneNumber: phoneValue,
          password,
          role: selectedRole,
        });
      } else {
        await login({
          email: emailValue,
          phoneNumber: phoneValue,
          password,
        });
      }
    } catch (error) {
      setFormError(error?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>AnnSeva</Text>
        <Text style={styles.heroSubtitle}>Plan your Bhandara with trusted Halwai partners</Text>
      </View>

      <SectionHeader
        title={isSignupMode ? 'Create account' : 'Welcome back'}
        subtitle={
          isSignupMode
            ? 'Sign up with email and phone number to start using AnnSeva'
            : 'Login using email/password or phone number/password'
        }
      />

      <View style={styles.modeSwitch}>
        <TouchableOpacity
          style={[styles.modeOption, mode === 'login' && styles.modeOptionActive]}
          onPress={() => switchMode('login')}>
          <Text style={[styles.modeText, mode === 'login' && styles.modeTextActive]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeOption, mode === 'signup' && styles.modeOptionActive]}
          onPress={() => switchMode('signup')}>
          <Text style={[styles.modeText, mode === 'signup' && styles.modeTextActive]}>Signup</Text>
        </TouchableOpacity>
      </View>

      {isSignupMode ? (
        <View style={styles.roleCard}>
          <Text style={styles.hintText}>Sign up as</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'customer' && styles.roleOptionActive,
              ]}
              onPress={() => setSelectedRole('customer')}>
              <View style={styles.radioOuter}>
                {selectedRole === 'customer' ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.roleTitle}>Customer</Text>
              <Text style={styles.roleSubtitle}>Create Bhandara requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'halwai' && styles.roleOptionActive,
              ]}
              onPress={() => setSelectedRole('halwai')}>
              <View style={styles.radioOuter}>
                {selectedRole === 'halwai' ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.roleTitle}>Halwai</Text>
              <Text style={styles.roleSubtitle}>Manage incoming orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {isSignupMode ? (
        <InputField label="Full name" value={name} onChangeText={setName} placeholder="Enter your full name" />
      ) : null}
      <InputField
        label={isSignupMode ? 'Email' : 'Email (optional)'}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {!isSignupMode ? (
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>
      ) : null}

      <InputField
        label={isSignupMode ? 'Phone number' : 'Phone number (optional)'}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter 10-digit phone number"
        keyboardType="phone-pad"
        maxLength={10}
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      {isSignupMode ? (
        <InputField
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter your password"
          secureTextEntry
        />
      ) : null}

      <AppButton
        title={
          isSubmitting
            ? isSignupMode
              ? 'Creating account...'
              : 'Logging in...'
            : isSignupMode
              ? 'Create account'
              : 'Login'
        }
        onPress={handleSubmit}
      />
      {authError ? <Text style={styles.error}>{authError}</Text> : null}
      {formError ? <Text style={styles.error}>{formError}</Text> : null}

      <View style={styles.hintBox}>
        <Text style={styles.hintText}>
          {isSignupMode
            ? `Selected role: ${selectedRole}`
            : 'Use the same email or phone number and password used during signup.'}
        </Text>
        <Text style={styles.hintText}>
          {isSignupMode
            ? 'Signup requires both email and phone number.'
            : 'Your role comes from the server response after login.'}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
