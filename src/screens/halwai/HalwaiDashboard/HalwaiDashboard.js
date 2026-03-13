import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './HalwaiDashboard.styles';

const HalwaiDashboard = ({navigation}) => {
  const {orders} = useOrders();
  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const activeCount = orders.filter(order => order.status === 'accepted').length;
  const totalGuests = orders.reduce((sum, order) => sum + (order.peopleCount || 0), 0);

  const nextActiveOrder = orders
    .filter(order => order.status === 'accepted')
    .sort((orderA, orderB) => new Date(orderA.date) - new Date(orderB.date))[0];

  const actions = [
    {
      title: 'Incoming Orders',
      subtitle: 'Review new requests',
      screen: 'IncomingOrders',
      icon: '📥',
    },
    {
      title: 'Active Orders',
      subtitle: 'Manage accepted orders',
      screen: 'ActiveOrders',
      icon: '🔥',
    },
    {
      title: 'Profile',
      subtitle: 'Update your business info',
      screen: 'HalwaiProfile',
      icon: '👨‍🍳',
    },
  ];

  return (
    <ScreenContainer scrollable>
      <SectionHeader title="Namaste Halwai" subtitle="Manage your orders and profile" />

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Today&apos;s overview</Text>
        <Text style={styles.heroTitle}>You are doing great!</Text>
        <Text style={styles.heroSubtitle}>
          Keep track of incoming requests, active jobs, and event details at one place.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.pendingCard]}>
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Incoming Orders</Text>
        </View>
        <View style={[styles.statCard, styles.activeCard]}>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active Orders</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{orders.length}</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalGuests}</Text>
          <Text style={styles.statLabel}>Total Guests</Text>
        </View>
      </View>

      <View style={styles.importantCard}>
        <Text style={styles.importantTitle}>Important Details</Text>
        {nextActiveOrder ? (
          <>
            <Text style={styles.importantName}>{nextActiveOrder.customerName}</Text>
            <Text style={styles.importantMeta}>{nextActiveOrder.location}</Text>
            <Text style={styles.importantMeta}>
              {nextActiveOrder.date} • {nextActiveOrder.peopleCount} guests
            </Text>
            <Text style={styles.importantMenu}>
              Menu: {nextActiveOrder.menuItems.join(', ')}
            </Text>
          </>
        ) : (
          <Text style={styles.importantEmpty}>
            No active orders yet. Accept incoming requests to see priority details here.
          </Text>
        )}
      </View>

      {actions.map(action => (
        <TouchableOpacity
          key={action.title}
          style={styles.card}
          onPress={() => navigation.navigate(action.screen)}>
          <View style={styles.actionHead}>
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.title}>{action.title}</Text>
          </View>
          <Text style={styles.subtitle}>{action.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
};

export default HalwaiDashboard;
