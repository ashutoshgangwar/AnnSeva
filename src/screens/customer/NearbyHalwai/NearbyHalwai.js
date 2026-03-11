import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {mockHalwai} from '../../../data/mockHalwai';
import styles from './NearbyHalwai.styles';

const NearbyHalwai = () => {
  return (
    <ScreenContainer>
      <SectionHeader title="Nearby Halwai" subtitle="Compare vendors and specialties" />

      <FlatList
        data={mockHalwai}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.specialty}</Text>
            <Text style={styles.meta}>Rating: {item.rating} • {item.distanceKm} km away</Text>
            <Text style={styles.price}>₹{item.pricePerPlate} per plate</Text>
          </Card>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default NearbyHalwai;
