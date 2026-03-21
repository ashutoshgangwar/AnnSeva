import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import InputField from '../../../components/InputField';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import {onboardHalwai} from '../../../services/halwaiApi';
import styles from './HalwaiOnboarding.styles';

const STORAGE_USER_NAME_KEY = 'annseva_user_name';

const HalwaiOnboarding = () => {
  const {user, accessToken, setHalwaiOnboardingComplete} = useAuth();
  const [form, setForm] = useState({
    halwaiName: user?.name || '',
    shopName: '',
    location: '',
    phoneNumber: user?.phoneNumber || user?.phone || '',
    alternatePhoneNumber: '',
    gstNumber: '',
    licenseNumber: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateSavedName = async () => {
      const savedName = await AsyncStorage.getItem(STORAGE_USER_NAME_KEY).catch(() => null);
      if (!savedName || !isMounted) {
        return;
      }

      setForm(current => {
        if (current.halwaiName) {
          return current;
        }

        return {
          ...current,
          halwaiName: savedName,
        };
      });
    };

    hydrateSavedName();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinue = async () => {
    if (isSubmitting) {
      return;
    }

    setError('');

    const payload = {
      halwaiName: form.halwaiName.trim(),
      shopName: form.shopName.trim(),
      location: form.location.trim(),
      phoneNumber: form.phoneNumber.trim(),
      alternatePhoneNumber: form.alternatePhoneNumber.trim(),
      gstNumber: form.gstNumber.trim(),
      licenseNumber: form.licenseNumber.trim(),
    };

    if (!payload.halwaiName || !payload.shopName || !payload.location || !payload.phoneNumber) {
      setError('Please fill all required fields');
      return;
    }

    const primaryPhoneDigits = payload.phoneNumber.replace(/\D/g, '');
    if (primaryPhoneDigits.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    if (payload.alternatePhoneNumber) {
      const alternatePhoneDigits = payload.alternatePhoneNumber.replace(/\D/g, '');
      if (alternatePhoneDigits.length < 10) {
        setError('Please enter a valid alternate phone number');
        return;
      }
    }

    const requestPayload = {
      halwaiName: payload.halwaiName,
      shopName: payload.shopName,
      location: payload.location,
      phoneNumber: payload.phoneNumber,
      ...(payload.alternatePhoneNumber
        ? {alternatePhoneNumber: payload.alternatePhoneNumber}
        : {}),
      ...(payload.gstNumber ? {gstNumber: payload.gstNumber} : {}),
      ...(payload.licenseNumber ? {licenseNumber: payload.licenseNumber} : {}),
    };

    setIsSubmitting(true);

    try {
      await onboardHalwai({
        payload: requestPayload,
        accessToken,
      });

      await setHalwaiOnboardingComplete(true);
    } catch (submitError) {
      setError(submitError?.message || 'Unable to submit onboarding details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Let’s set up your Halwai profile</Text>
        <Text style={styles.heroSubtitle}>
          You’re almost live, {user?.name || 'Halwai'}.
        </Text>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Takes ~2 minutes</Text>
        </View>
      </View>

      <SectionHeader title="Halwai Details" subtitle="Complete your onboarding" />

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Required fields are marked with *</Text>
        <Text style={styles.infoText}>Add your core details so customers can find you faster.</Text>
      </View>

      <View style={styles.formCard}>
        <InputField
          label="Halwai Name *"
          value={form.halwaiName}
          onChangeText={value => updateField('halwaiName', value)}
          placeholder="Your full name"
        />
        <InputField
          label="Shop Name *"
          value={form.shopName}
          onChangeText={value => updateField('shopName', value)}
          placeholder="Catering / Halwai shop name"
        />
        <InputField
          label="Location *"
          value={form.location}
          onChangeText={value => updateField('location', value)}
          placeholder="City, area"
        />
        <InputField
          label="Phone Number *"
          value={form.phoneNumber}
          onChangeText={value => updateField('phoneNumber', value)}
          placeholder="Primary contact"
          keyboardType="phone-pad"
        />
        <InputField
          label="Alternate Phone Number"
          value={form.alternatePhoneNumber}
          onChangeText={value => updateField('alternatePhoneNumber', value)}
          placeholder="Alternate contact"
          keyboardType="phone-pad"
        />
        <InputField
          label="GST Number (Optional)"
          value={form.gstNumber}
          onChangeText={value => updateField('gstNumber', value)}
          placeholder="GSTIN"
        />
        <InputField
          label="License Number (Optional)"
          value={form.licenseNumber}
          onChangeText={value => updateField('licenseNumber', value)}
          placeholder="FSSAI / License number"
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.actions}>
        <AppButton
          title={isSubmitting ? 'Submitting...' : 'Submit & Continue'}
          onPress={handleContinue}
        />
      </View>
    </ScreenContainer>
  );
};

export default HalwaiOnboarding;
