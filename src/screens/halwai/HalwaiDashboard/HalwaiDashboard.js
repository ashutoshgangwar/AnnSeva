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

  const actions = [
    {
      title: 'Incoming Orders',
      subtitle: 'Review new requests',
      screen: 'IncomingOrders',
    },
    {
      title: 'Active Orders',
      subtitle: 'Manage accepted orders',
      screen: 'ActiveOrders',
    },
    {
      title: 'Profile',
      subtitle: 'Update your business info',
      screen: 'HalwaiProfile',
    },
  ];

  return (
    <ScreenContainer>
      <SectionHeader title="Namaste Halwai" subtitle="Manage your orders and profile" />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Incoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      {actions.map(action => (
        <TouchableOpacity
          key={action.title}
          style={styles.card}
          onPress={() => navigation.navigate(action.screen)}>
          <Text style={styles.title}>{action.title}</Text>
          <Text style={styles.subtitle}>{action.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
};

export default HalwaiDashboard;
