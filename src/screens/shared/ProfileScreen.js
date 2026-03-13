import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {useAuth} from '../../context/AuthContext';
import {useOrders} from '../../context/OrdersContext';
import {mockHalwai} from '../../data/mockHalwai';
import styles from './ProfileScreen.styles';

// ─── Customer-specific sections ──────────────────────────────────────────────

const CustomerProfile = ({user, orders}) => {
  const ownOrders = orders.filter(order => order.customerId === user?.id);
  const totalOrders = ownOrders.length;
  const completedOrders = ownOrders.filter(order => order.status === 'completed').length;
  const pendingOrders = ownOrders.filter(order => order.status === 'pending').length;
  const totalSpent = ownOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || o.peopleCount * 180), 0);

  const INFO_ROWS = [
    {icon: '📞', label: 'Phone', value: user?.phone || '—'},
    {icon: '🎭', label: 'Role', value: 'Customer'},
    {icon: '📋', label: 'Total Orders', value: String(totalOrders)},
  ];

  return (
    <>
      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedOrders}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingOrders}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹{(totalSpent / 1000).toFixed(1)}k</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
      </View>

      {/* Account Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Account Info</Text>
        {INFO_ROWS.map((row, idx) => (
          <InfoRow key={row.label} row={row} isLast={idx === INFO_ROWS.length - 1} />
        ))}
      </View>
    </>
  );
};

// ─── Halwai-specific sections ─────────────────────────────────────────────────

const HalwaiProfileSection = ({user, orders}) => {
  const profile = mockHalwai[0];

  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const activeOrders = orders.filter(o => o.status === 'accepted').length;
  const totalEarnings = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || o.peopleCount * 180), 0);

  const INFO_ROWS = [
    {icon: '📞', label: 'Phone', value: user?.phone || '—'},
    {icon: '🍽️', label: 'Specialty', value: profile.specialty},
    {icon: '💰', label: 'Price per Plate', value: `₹${profile.pricePerPlate}`},
    {icon: '📅', label: 'Experience', value: profile.experience},
    {icon: '👥', label: 'Min. Guests', value: `${profile.minGuests} people`},
  ];

  return (
    <>
      {/* Stats */}
      <View style={[styles.statsRow, styles.statsRowSpaced]}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedOrders}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeOrders}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹{(totalEarnings / 1000).toFixed(1)}k</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
      </View>

      {/* Business Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📄 Business Info</Text>
        {INFO_ROWS.map((row, idx) => (
          <InfoRow key={row.label} row={row} isLast={idx === INFO_ROWS.length - 1} />
        ))}
      </View>
    </>
  );
};

// ─── Shared info row ──────────────────────────────────────────────────────────

const InfoRow = ({row, isLast}) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <View style={styles.infoLeft}>
      <Text style={styles.infoIcon}>{row.icon}</Text>
      <Text style={styles.infoLabel}>{row.label}</Text>
    </View>
    <Text style={styles.infoValue}>{row.value}</Text>
  </View>
);

const MENU_ITEMS = [
  {icon: '⚙️', label: 'Settings', key: 'settings'},
  {icon: '🔒', label: 'Privacy Policy', key: 'privacy'},
  {icon: '✅', label: 'Completed Orders', key: 'completed-orders'},
  {icon: 'ℹ️', label: 'About Us', key: 'about'},
  {icon: '🚪', label: 'Logout', key: 'logout'},
];

// ─── Main screen ──────────────────────────────────────────────────────────────

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useAuth();
  const {orders} = useOrders();

  const isHalwai = user?.role === 'halwai';
  const profile = isHalwai ? mockHalwai[0] : null;
  const displayName = user?.name || (isHalwai ? profile?.name : 'User');

  const handleMenuPress = itemKey => {
    if (itemKey === 'logout') {
      logout();
      return;
    }

    if (itemKey === 'completed-orders') {
      navigation.navigate(isHalwai ? 'ActiveOrders' : 'MyOrders');
      return;
    }

    if (itemKey === 'settings') {
      Alert.alert('Settings', 'Settings screen will be added soon.');
      return;
    }

    if (itemKey === 'privacy') {
      Alert.alert('Privacy Policy', 'Privacy policy screen will be added soon.');
      return;
    }

    Alert.alert('About Us', 'AnnSeva connects customers with trusted halwai partners.');
  };

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>

      {/* ── Hero card (shared) ── */}
      <View style={styles.heroCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.heroName}>{displayName}</Text>
        <Text style={styles.heroRole}>
          {isHalwai ? '🧑‍🍳 Halwai Partner' : '🙋 Customer'}
        </Text>

        {/* Halwai rating/tags sit inside the hero card */}
        {isHalwai && (
          <>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>⭐ {profile.rating}</Text>
              <Text style={styles.ratingReviews}>({profile.reviews} reviews)</Text>
            </View>
            <View style={styles.tagRowInline}>
              {profile.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* ── Role-specific body ── */}
      {isHalwai ? <HalwaiProfileSection user={user} orders={orders} /> : <CustomerProfile user={user} orders={orders} />}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 More</Text>
        {MENU_ITEMS.map((item, idx) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.actionRow, idx > 0 && styles.actionRowBorder]}
            onPress={() => handleMenuPress(item.key)}>
            <Text style={styles.actionIcon}>{item.icon}</Text>
            <Text style={[styles.actionLabel, item.key === 'logout' && styles.logoutLabel]}>{item.label}</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;
