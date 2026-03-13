import React from 'react';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './HalwaiServiceProgress.styles';

const getDaysUntil = eventDate => {
  const now = new Date();
  const event = new Date(eventDate);
  const timeDiff = event.getTime() - now.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const HalwaiServiceProgress = ({navigation, route}) => {
  const {orderId} = route.params || {};
  const {orders, updateOrderProgress} = useOrders();
  const order = orders.find(currentOrder => currentOrder.id === orderId);

  if (!order) {
    return (
      <ScreenContainer>
        <SectionHeader title="Reached Location" subtitle="Track current service progress" />
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Order not found</Text>
          <Text style={styles.emptySubtitle}>This order is no longer available.</Text>
        </Card>
      </ScreenContainer>
    );
  }

  const daysUntil = getDaysUntil(order.date);

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      <SectionHeader title="Reached Location" subtitle="Manage on-site bhandara progress" />

      <Card style={styles.heroCard}>
        <Text style={styles.heroLabel}>Service Live</Text>
        <Text style={styles.heroTitle}>{order.customerName}</Text>
        <Text style={styles.heroSubtitle}>{order.location}</Text>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Order Snapshot</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date</Text>
          <Text style={styles.infoValue}>{order.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Guests</Text>
          <Text style={styles.infoValue}>{order.peopleCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Days left</Text>
          <Text style={styles.infoValue}>{daysUntil}</Text>
        </View>
        <View style={styles.infoRowLast}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{order.phoneNumber || 'N/A'}</Text>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressRow}>
          <View style={[styles.progressStep, styles.progressStepDone]}>
            <Text style={styles.progressStepTextDone}>Accepted</Text>
          </View>
          <View style={[styles.progressStep, styles.progressStepDone]}>
            <Text style={styles.progressStepTextDone}>Reached</Text>
          </View>
          <View style={styles.progressStep}>
            <Text style={styles.progressStepText}>Order Complete</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <Text style={styles.menuText}>{order.menuItems.join(', ')}</Text>
      </Card>

      <AppButton
        title="Order Completed"
        onPress={() => {
          updateOrderProgress(order.id, 'completed');
          navigation.navigate('HalwaiPayment', {orderId: order.id});
        }}
      />
    </ScreenContainer>
  );
};

export default HalwaiServiceProgress;
