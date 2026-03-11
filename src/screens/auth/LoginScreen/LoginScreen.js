import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import InputField from '../../../components/InputField';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import styles from './LoginScreen.styles';

const LoginScreen = ({navigation}) => {
  const {authError} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');

  const handleLogin = () => {
    navigation.navigate('Otp', {
      phoneNumber: phoneNumber.trim(),
      role: selectedRole,
    });
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>AnnSeva</Text>
        <Text style={styles.heroSubtitle}>Plan your Bhandara with trusted Halwai partners</Text>
      </View>

      <SectionHeader title="Welcome back" subtitle="Choose your role to continue" />

      <View style={styles.roleCard}>
        <Text style={styles.hintText}>Login as</Text>
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

      <InputField
        label="Mobile Number"
        value={phoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter 10-digit mobile number"
        onChangeText={setPhoneNumber}
        maxLength={10}
      />

      <AppButton title="Login" onPress={handleLogin} />
      {authError ? <Text style={styles.error}>{authError}</Text> : null}

      <View style={styles.divider} />

      <AppButton title="Continue with Google" variant="outline" onPress={() => {}} />

      <View style={styles.hintBox}>
        <Text style={styles.hintText}>Mock logins:</Text>
        <Text style={styles.hintText}>Customer: 9999999999</Text>
        <Text style={styles.hintText}>Halwai: 8888888888</Text>
      </View>
    </ScreenContainer>
  );
};

export default LoginScreen;
