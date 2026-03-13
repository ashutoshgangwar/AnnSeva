import React from 'react';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './HalwaiPayment.styles';

const getOrderAmount = order => order.totalAmount || order.peopleCount * 180;

const HalwaiPayment = ({navigation, route}) => {
  const {orderId} = route.params || {};
  const {orders, updateOrderDetails} = useOrders();
  const order = orders.find(currentOrder => currentOrder.id === orderId);

  if (!order) {
    return (
      <ScreenContainer>
        <SectionHeader title="Payment" subtitle="Collect payment for completed order" />
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Order not found</Text>
          <Text style={styles.emptySubtitle}>This order is no longer available.</Text>
        </Card>
      </ScreenContainer>
    );
  }

  const amount = getOrderAmount(order);
  const paymentStatus = order.paymentStatus || 'pending';
  const isPaid = paymentStatus === 'paid';

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      <SectionHeader title="Payment" subtitle="Collect final amount after bhandara completion" />

      <Card style={styles.amountCard}>
        <Text style={styles.amountLabel}>Total Payment</Text>
        <Text style={styles.amountValue}>₹{amount.toLocaleString('en-IN')}</Text>
        <Text style={styles.amountSubtext}>{order.customerName} • {order.location}</Text>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Customer</Text>
          <Text style={styles.infoValue}>{order.customerName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{order.phoneNumber || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Guests</Text>
          <Text style={styles.infoValue}>{order.peopleCount}</Text>
        </View>
        <View style={styles.infoRowLast}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={[styles.infoValue, isPaid && styles.paidText]}>
            {isPaid ? 'Payment Received' : 'Payment Pending'}
          </Text>
        </View>
      </Card>

      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Menu Summary</Text>
        <Text style={styles.menuText}>{order.menuItems.join(', ')}</Text>
      </Card>

      <AppButton
        title={isPaid ? 'Payment Received' : 'Mark Payment Received'}
        onPress={() => {
          if (!isPaid) {
            updateOrderDetails(order.id, {
              paymentStatus: 'paid',
              status: 'completed',
              progress: 'completed',
            });
          }
          navigation.navigate('HalwaiDashboard');
        }}
      />
    </ScreenContainer>
  );
};

export default HalwaiPayment;
