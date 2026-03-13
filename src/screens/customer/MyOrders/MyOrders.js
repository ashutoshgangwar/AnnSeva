import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import {useAuth} from '../../../context/AuthContext';
import {useOrders} from '../../../context/OrdersContext';
import styles from './MyOrders.styles';

const STATUS_TABS = [
  {label: 'All', value: 'all'},
  {label: 'Pending', value: 'pending'},
  {label: 'Accepted', value: 'accepted'},
  {label: 'Completed', value: 'completed'},
];

const STATUS_CONFIG = {
  pending: {color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', icon: '⏳', label: 'Pending'},
  accepted: {color: '#2E7D32', bg: '#ECFDF5', border: '#A7F3D0', icon: '✅', label: 'Accepted'},
  completed: {color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE', icon: '🎉', label: 'Completed'},
  cancelled: {color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', icon: '❌', label: 'Cancelled'},
};

const PROGRESS_STEPS = ['pending', 'accepted', 'reached', 'completed'];
const PROGRESS_LABELS = {pending: 'Submitted', accepted: 'Accepted', reached: 'Reached', completed: 'Done'};

const MyOrders = ({navigation}) => {
  const {user} = useAuth();
  const {orders} = useOrders();
  const [activeTab, setActiveTab] = useState('all');

  const myOrders = orders
    .filter(o => o.customerId === user?.id)
    .filter(o => activeTab === 'all' || o.status === activeTab)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const allMyOrders = orders.filter(o => o.customerId === user?.id);
  const counts = STATUS_TABS.slice(1).reduce((acc, t) => {
    acc[t.value] = allMyOrders.filter(o => o.status === t.value).length;
    return acc;
  }, {});

  const renderProgressBar = order => {
    const currentIdx = PROGRESS_STEPS.indexOf(order.progress || order.status);
    return (
      <View style={styles.progressRow}>
        {PROGRESS_STEPS.map((step, idx) => {
          const done = idx <= currentIdx;
          return (
            <React.Fragment key={step}>
              <View style={styles.progressStep}>
                <View style={[styles.progressDot, done && styles.progressDotDone]}>
                  <Text style={styles.progressDotText}>{done ? '✓' : idx + 1}</Text>
                </View>
                <Text style={[styles.progressLabel, done && styles.progressLabelDone]}>
                  {PROGRESS_LABELS[step]}
                </Text>
              </View>
              {idx < PROGRESS_STEPS.length - 1 && (
                <View style={[styles.progressLine, done && idx < currentIdx && styles.progressLineDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const renderCard = order => {
    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
    return (
      <View key={order.id} style={styles.card}>
        {/* Status bar */}
        <View style={[styles.statusBar, {backgroundColor: cfg.bg, borderColor: cfg.border}]}>
          <Text style={[styles.statusIcon]}>{cfg.icon}</Text>
          <Text style={[styles.statusLabel, {color: cfg.color}]}>{cfg.label}</Text>
          <Text style={styles.orderId}>#{order.id.replace('order_', '')}</Text>
        </View>

        {/* Main info */}
        <View style={styles.cardBody}>
          <View style={styles.cardRow}>
            <View style={styles.cardInfo}>
              <Text style={styles.locationText}>📍 {order.location}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>📅 {order.date}</Text>
                <View style={styles.metaDot} />
                <Text style={styles.metaText}>👥 {order.peopleCount} guests</Text>
              </View>
            </View>
            <View style={styles.costBadge}>
              <Text style={styles.costValue}>₹{(order.peopleCount * 180).toLocaleString()}</Text>
              <Text style={styles.costLabel}>Est.</Text>
            </View>
          </View>

          {/* Menu chips */}
          <View style={styles.menuRow}>
            {order.menuItems.slice(0, 3).map(item => (
              <View key={item} style={styles.menuChip}>
                <Text style={styles.menuChipText}>{item}</Text>
              </View>
            ))}
            {order.menuItems.length > 3 && (
              <View style={styles.menuChipMore}>
                <Text style={styles.menuChipMoreText}>+{order.menuItems.length - 3} more</Text>
              </View>
            )}
          </View>

          {/* Progress bar for active orders */}
          {(order.status === 'accepted' || order.status === 'pending') && renderProgressBar(order)}

          {/* View Summary for completed orders */}
          {order.status === 'completed' && (
            <TouchableOpacity
              style={styles.summaryBtn}
              onPress={() => navigation.navigate('OrderSummary', {orderId: order.id})}>
              <Text style={styles.summaryBtnText}>📊 View Final Summary & Rate</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <View>
          <Text style={styles.heroTitle}>📋 My Orders</Text>
          <Text style={styles.heroSub}>{allMyOrders.length} total order{allMyOrders.length !== 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.heroStats}>
          {counts.pending > 0 && (
            <View style={styles.heroStatBadge}>
              <Text style={styles.heroStatText}>{counts.pending} pending</Text>
            </View>
          )}
          {counts.accepted > 0 && (
            <View style={[styles.heroStatBadge, styles.heroStatBadgeGreen]}>
              <Text style={[styles.heroStatText, {color: '#FFFFFF'}]}>{counts.accepted} active</Text>
            </View>
          )}
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
        {STATUS_TABS.map(tab => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, activeTab === tab.value && styles.tabActive]}
            onPress={() => setActiveTab(tab.value)}>
            <Text style={[styles.tabText, activeTab === tab.value && styles.tabTextActive]}>
              {tab.label}
              {tab.value !== 'all' && counts[tab.value] > 0 ? ` (${counts[tab.value]})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Order list */}
      {myOrders.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No orders here</Text>
          <Text style={styles.emptyText}>
            {activeTab === 'all'
              ? "You haven't placed any orders yet."
              : `No ${activeTab} orders found.`}
          </Text>
        </View>
      ) : (
        myOrders.map(renderCard)
      )}
    </ScreenContainer>
  );
};

export default MyOrders;
