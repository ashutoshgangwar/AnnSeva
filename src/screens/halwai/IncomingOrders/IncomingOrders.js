import React from 'react';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './IncomingOrders.styles';

const getDaysUntil = eventDate => {
  const now = new Date();
  const event = new Date(eventDate);
  const timeDiff = event.getTime() - now.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const getPriority = order => {
  const daysUntil = getDaysUntil(order.date);
  if (daysUntil <= 7 || order.peopleCount >= 300) {
    return 'High Priority';
  }

  if (daysUntil <= 14 || order.peopleCount >= 200) {
    return 'Medium Priority';
  }

  return 'Normal Priority';
};

const IncomingOrders = () => {
  const {orders, updateOrderStatus} = useOrders();
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const displayedOrders = [...pendingOrders]
    .sort(
    (orderA, orderB) => new Date(orderA.date) - new Date(orderB.date),
    );

  return (
    <ScreenContainer scrollable contentStyle={styles.listContent}>
      <SectionHeader title="Incoming Orders" subtitle="Accept or reject new requests" />

      {displayedOrders.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>All Caught Up 🎉</Text>
          <Text style={styles.emptySubtitle}>
            No incoming orders right now. New customer requests will appear here.
          </Text>
        </Card>
      ) : (
        displayedOrders.map(item => {
          const daysUntil = getDaysUntil(item.date);
          const priority = getPriority(item);
          const visibleMenuItems = item.menuItems.slice(0, 2);
          const remainingMenuCount = item.menuItems.length - visibleMenuItems.length;

          return (
            <Card key={item.id} style={styles.item}>
              <View style={styles.cardAccentBar} />
              <View style={styles.cardHead}>
                <Text style={styles.title}>{item.customerName}</Text>
                <View
                  style={[
                    styles.badge,
                    priority === 'High Priority'
                      ? styles.badgeHigh
                      : priority === 'Medium Priority'
                        ? styles.badgeMedium
                        : styles.badgeNormal,
                  ]}>
                  <Text
                    style={[
                      styles.badgeText,
                      priority === 'High Priority'
                        ? styles.badgeTextHigh
                        : priority === 'Medium Priority'
                          ? styles.badgeTextMedium
                          : styles.badgeTextNormal,
                    ]}>
                    {priority}
                  </Text>
                </View>
              </View>

              <Text style={styles.meta}>{item.location}</Text>

              <View style={styles.detailRow}>
                <View style={styles.detailPill}>
                  <Text style={styles.detailText}>📅 {item.date}</Text>
                </View>
                <View style={styles.detailPill}>
                  <Text style={styles.detailText}>👥 {item.peopleCount} guests</Text>
                </View>
                <View style={styles.detailPill}>
                  <Text style={styles.detailText}>⏱ {daysUntil} day(s) left</Text>
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
              <View style={styles.cardDivider} />
              <View style={styles.actions}>
                <AppButton
                  title="Accept"
                  style={styles.actionButton}
                  onPress={() => updateOrderStatus(item.id, 'accepted')}
                />
                <AppButton
                  title="Reject"
                  variant="outline"
                  style={styles.actionButton}
                  onPress={() => updateOrderStatus(item.id, 'rejected')}
                />
              </View>
            </Card>
          );
        })
      )}
    </ScreenContainer>
  );
};

export default IncomingOrders;
