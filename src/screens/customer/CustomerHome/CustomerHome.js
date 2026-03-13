import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import {mockHalwai} from '../../../data/mockHalwai';
import styles from './CustomerHome.styles';

const CustomerHome = ({navigation}) => {
  const DISTANCE_FILTERS = [
    {label: '2 km', value: 2},
    {label: '5 km', value: 5},
    {label: '10 km', value: 10},
    {label: 'Any', value: null},
  ];
  const [selectedDistance, setSelectedDistance] = useState(null);

  const nearestHalwai = [...mockHalwai]
    .sort((firstHalwai, secondHalwai) => firstHalwai.distanceKm - secondHalwai.distanceKm)
    .filter(h => selectedDistance === null || h.distanceKm <= selectedDistance);
  const averageRating =
    mockHalwai.reduce((sum, halwai) => sum + halwai.rating, 0) / Math.max(mockHalwai.length, 1);

  const options = [
    {
      title: 'Create Bhandara',
      subtitle: 'Plan your event and menu',
      screen: 'CreateBhandara',
      icon: '🪔',
    },
    {
      title: 'Nearby Halwai',
      subtitle: 'Find trusted vendors nearby',
      screen: 'NearbyHalwai',
      icon: '📍',
    },
  ];

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      <View style={styles.topHeader}>
        <View style={styles.topHeaderText}>
          <Text style={styles.welcomeTitle}>Welcome to AnnSeva</Text>
          <Text style={styles.welcomeSubtitle}>Start planning your next Bhandara</Text>
        </View>
        <TouchableOpacity
          style={styles.myOrdersBtn}
          onPress={() => navigation.navigate('MyOrders')}>
          <Text style={styles.myOrdersBtnText}>📋 My Orders</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>AnnSeva</Text>
        <Text style={styles.heroTitle}>Book nearby halwai faster</Text>
        <View style={styles.heroChipRow}>
          <View style={styles.heroChip}>
            <Text style={styles.heroChipText}>Trusted vendors</Text>
          </View>
          <View style={styles.heroChip}>
            <Text style={styles.heroChipText}>Fast booking</Text>
          </View>
          <View style={styles.heroChip}>
            <Text style={styles.heroChipText}>Easy tracking</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {options.map(option => (
          <TouchableOpacity
            key={option.title}
            style={styles.card}
            onPress={() => navigation.navigate(option.screen)}>
            <Text style={styles.cardIcon}>{option.icon}</Text>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.subtitle}>{option.subtitle}</Text>
            <Text style={styles.cardLink}>Open →</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Nearest Halwai</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NearbyHalwai')}>
          <Text style={styles.linkText}>See all →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.distanceFilterRow}>
        {DISTANCE_FILTERS.map(filter => (
          <TouchableOpacity
            key={String(filter.value)}
            style={[
              styles.distanceChip,
              selectedDistance === filter.value && styles.distanceChipActive,
            ]}
            onPress={() => setSelectedDistance(filter.value)}>
            <Text
              style={[
                styles.distanceChipText,
                selectedDistance === filter.value && styles.distanceChipTextActive,
              ]}>
              📍 {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.halwaiTeaser}>
        {nearestHalwai.length === 0 ? (
          <View style={styles.noHalwaiBox}>
            <Text style={styles.noHalwaiText}>No halwai found within {selectedDistance} km</Text>
          </View>
        ) : (
          nearestHalwai.map(halwai => (
            <TouchableOpacity
              key={halwai.id}
              style={styles.halwaiTeaserCard}
              onPress={() => navigation.navigate('NearbyHalwai')}>
              <View style={styles.halwaiAvatar}>
                <Text style={styles.halwaiAvatarText}>{halwai.name.charAt(0)}</Text>
              </View>
              <Text style={styles.halwaiTeaserName} numberOfLines={1}>{halwai.name}</Text>
              <Text style={styles.halwaiTeaserDist}>📍 {halwai.distanceKm} km</Text>
              <View style={styles.halwaiTeaserRating}>
                <Text style={styles.halwaiTeaserRatingText}>⭐ {halwai.rating}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default CustomerHome;
