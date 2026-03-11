import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import styles from './OtpScreen.styles';

const OtpScreen = ({route}) => {
  const {phoneNumber, role} = route.params || {};
  const {loginWithPhone, authError} = useAuth();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const inputRef = useRef(null);

  const handleVerify = () => {
    if (otp.trim().length !== 4) {
      setOtpError('Please enter the 4-digit OTP');
      return;
    }

    if (otp.trim() !== '1234') {
      setOtpError('Invalid OTP. Try 1234');
      return;
    }

    setOtpError('');
    loginWithPhone(phoneNumber || '', role);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Verify your number</Text>
        <Text style={styles.heroSubtitle}>A 4-digit OTP was sent to {phoneNumber}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Role: {role === 'halwai' ? 'Halwai' : 'Customer'}</Text>
        </View>
      </View>

      <SectionHeader title="Enter OTP" subtitle="Use the mock OTP below for now" />

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>OTP is UI-only for now.</Text>
        <Text style={styles.infoText}>Mock OTP: 1234</Text>
        <Text style={styles.infoText}>Number: {phoneNumber}</Text>
      </View>

      <TouchableOpacity style={styles.otpRow} activeOpacity={1} onPress={handleFocus}>
        {Array.from({length: 4}).map((_, index) => {
          const digit = otp[index] || '';
          const isActive = index === otp.length && otp.length < 4;
          return (
            <View key={`otp-${index}`} style={[styles.otpBox, isActive && styles.otpBoxActive]}>
              <Text style={styles.otpText}>{digit}</Text>
            </View>
          );
        })}
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={otp}
        onChangeText={value => {
          setOtp(value);
          if (otpError) {
            setOtpError('');
          }
        }}
        keyboardType="number-pad"
        maxLength={4}
        autoFocus
      />

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn’t receive OTP?</Text>
        <Text style={styles.resendLink}>Resend</Text>
      </View>

      <AppButton title="Verify & Continue" onPress={handleVerify} />
      {otpError ? <Text style={styles.error}>{otpError}</Text> : null}
      {authError ? <Text style={styles.error}>{authError}</Text> : null}
    </ScreenContainer>
  );
};

export default OtpScreen;
