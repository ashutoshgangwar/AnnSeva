import React from 'react';
import {Text, View} from 'react-native';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import {mockHalwai} from '../../../data/mockHalwai';
import styles from './HalwaiProfile.styles';

const HalwaiProfile = () => {
  const {user, logout} = useAuth();
  const profile = mockHalwai[0];

  return (
    <ScreenContainer>
      <SectionHeader title="Profile" subtitle="Your business details" />

      <Card>
        <Text style={styles.title}>{user?.name || profile.name}</Text>
        <Text style={styles.meta}>{profile.specialty}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user?.phone || '8888888888'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.value}>{profile.rating}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price per plate</Text>
          <Text style={styles.value}>₹{profile.pricePerPlate}</Text>
        </View>
      </Card>

      <View style={styles.logoutWrap}>
        <Text style={styles.meta} onPress={logout}>Logout</Text>
      </View>
    </ScreenContainer>
  );
};

export default HalwaiProfile;
