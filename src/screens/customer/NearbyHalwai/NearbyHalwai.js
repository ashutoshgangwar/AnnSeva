import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import {mockHalwai} from '../../../data/mockHalwai';
import styles from './NearbyHalwai.styles';

const SORT_OPTIONS = [
  {label: '📍 Nearest', key: 'distance'},
  {label: '⭐ Top Rated', key: 'rating'},
  {label: '💰 Lowest Price', key: 'price'},
];

const NearbyHalwai = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const sorted = [...mockHalwai]
    .filter(
      h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.specialty.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === 'distance') {return a.distanceKm - b.distanceKm;}
      if (sortBy === 'rating') {return b.rating - a.rating;}
      if (sortBy === 'price') {return a.pricePerPlate - b.pricePerPlate;}
      return 0;
    });

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {/* Availability banner */}
      {!item.available && (
        <View style={styles.unavailableBanner}>
          <Text style={styles.unavailableText}>🔴 Currently Unavailable</Text>
        </View>
      )}

      {/* Card header */}
      <View style={styles.cardHead}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.headInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviews} reviews)</Text>
            <View style={styles.dot} />
            <Text style={styles.expText}>{item.experience} exp.</Text>
          </View>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceValue}>₹{item.pricePerPlate}</Text>
          <Text style={styles.priceLabel}>/plate</Text>
        </View>
      </View>

      {/* Info pills */}
      <View style={styles.pillRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>📍 {item.distanceKm} km away</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>👥 Min. {item.minGuests} guests</Text>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagRow}>
        {item.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.bookBtn, !item.available && styles.bookBtnDisabled]}
          onPress={() => item.available && navigation.navigate('CreateBhandara')}
          disabled={!item.available}>
          <Text style={styles.bookBtnText}>
            {item.available ? '🚀 Book Now' : 'Currently Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Nearby Halwai</Text>
        <Text style={styles.heroSub}>{mockHalwai.length} vendors in your area</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or specialty..."
          placeholderTextColor="#9CA3AF"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sort chips */}
      <View style={styles.sortRow}>
        {SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.sortChip, sortBy === opt.key && styles.sortChipActive]}
            onPress={() => setSortBy(opt.key)}>
            <Text style={[styles.sortChipText, sortBy === opt.key && styles.sortChipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results count */}
      <Text style={styles.resultsText}>
        {sorted.length} {sorted.length === 1 ? 'result' : 'results'}{search ? ` for "${search}"` : ''}
      </Text>

      <FlatList
        data={sorted}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No halwai found for "{search}"</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};

export default NearbyHalwai;
