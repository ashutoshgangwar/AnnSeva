import React, {useState} from 'react';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import InputField from '../../../components/InputField';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import styles from './HalwaiOnboarding.styles';

const HalwaiOnboarding = () => {
  const {user, setHalwaiOnboardingComplete} = useAuth();
  const [form, setForm] = useState({
    halwaiName: user?.name || '',
    shopName: '',
    location: '',
    phoneNumber: user?.phone || '',
    alternatePhoneNumber: '',
    gstNumber: '',
    licenseNumber: '',
  });
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    setHalwaiOnboardingComplete(true);
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
        <AppButton title="Submit & Continue" onPress={handleContinue} />
      </View>
    </ScreenContainer>
  );
};

export default HalwaiOnboarding;
