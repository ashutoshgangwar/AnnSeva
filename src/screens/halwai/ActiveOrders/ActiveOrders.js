import React from 'react';
import {Linking, Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './ActiveOrders.styles';

const getDaysUntil = eventDate => {
  const now = new Date();
  const event = new Date(eventDate);
  const timeDiff = event.getTime() - now.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const openPhoneDialer = phoneNumber => {
  if (!phoneNumber) {
    return;
  }

  Linking.openURL(`tel:${phoneNumber}`);
};

const openNavigation = location => {
  if (!location) {
    return;
  }

  const encodedLocation = encodeURIComponent(location);
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`);
};

const ActiveOrders = ({navigation}) => {
  const {orders, updateOrderProgress} = useOrders();
  const activeOrders = [...orders]
    .filter(order => order.status === 'accepted')
    .sort((orderA, orderB) => new Date(orderA.date) - new Date(orderB.date));

  return (
    <ScreenContainer scrollable contentStyle={styles.listContent}>
      <SectionHeader title="Active Orders" subtitle="Orders you have accepted" />

      {activeOrders.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No Active Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Accept incoming requests and they will appear here for quick tracking.
          </Text>
        </Card>
      ) : (
        activeOrders.map(item => {
          const daysUntil = getDaysUntil(item.date);
          const visibleMenuItems = item.menuItems.slice(0, 3);
          const remainingMenuCount = item.menuItems.length - visibleMenuItems.length;
          const progress = item.progress || 'accepted';
          const isReached = progress === 'reached';

          return (
            <Card key={item.id} style={styles.item}>
              <View style={styles.cardAccentBar} />

              <View style={styles.cardHead}>
                <View style={styles.customerRow}>
                  <Text style={styles.title}>{item.customerName}</Text>
                  <AppButton
                    title="Call"
                    style={styles.callButton}
                    variant="outline"
                    onPress={() => openPhoneDialer(item.phoneNumber)}
                  />
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Active</Text>
                </View>
              </View>

              <Text style={styles.meta}>{item.location}</Text>
              <Text style={styles.contactText}>Customer: {item.phoneNumber || 'N/A'}</Text>

              <View style={styles.detailRow}>
                <View style={styles.detailPill}>
                  <Text style={styles.detailText}>📅 {item.date}</Text>
                </View>
                <View style={styles.detailPill}>
                  <Text style={styles.detailText}>👥 {item.peopleCount} guests</Text>
                </View>
                <View style={styles.detailPillStrong}>
                  <Text style={styles.detailTextStrong}>⏱ {daysUntil} day(s) left</Text>
                </View>
              </View>

              <Text style={styles.menuTitle}>Selected Menu</Text>
              <View style={styles.menuChipsRow}>
                {visibleMenuItems.map(menuItem => (
                  <View key={menuItem} style={styles.menuChip}>
                    <Text style={styles.menuChipText}>{menuItem}</Text>
                  </View>
                ))}
                {remainingMenuCount > 0 ? (
                  <View style={styles.menuChipMore}>
                    <Text style={styles.menuChipMoreText}>+{remainingMenuCount} more</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.statusRow}>
                <View style={[styles.statusBadge, isReached && styles.statusBadgeReached]}>
                  <Text style={[styles.statusBadgeText, isReached && styles.statusBadgeTextReached]}>
                    Reached
                  </Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <AppButton
                  title="I Reached"
                  style={styles.actionButton}
                  variant={isReached ? 'primary' : 'outline'}
                  onPress={() => {
                    updateOrderProgress(item.id, 'reached');
                    navigation.navigate('HalwaiServiceProgress', {orderId: item.id});
                  }}
                />
                <AppButton
                  title="Navigate"
                  style={styles.actionButton}
                  onPress={() => openNavigation(item.location)}
                />
              </View>
            </Card>
          );
        })
      )}
    </ScreenContainer>
  );
};

export default ActiveOrders;
