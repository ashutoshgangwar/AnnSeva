import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import {getIncomingOrders, updateIncomingOrderStatus} from '../../../services/orderApi';
import styles from './IncomingOrders.styles';

const getDaysUntil = eventDate => {
  const now = new Date();
  const event = new Date(eventDate);
  const timeDiff = event.getTime() - now.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
};

const getPriority = order => {
  const apiPriority = (order.priorityLevel || '').toLowerCase();

  if (apiPriority === 'high') {
    return 'High Priority';
  }

  if (apiPriority === 'medium') {
    return 'Medium Priority';
  }

  if (apiPriority === 'low') {
    return 'Normal Priority';
  }

  const daysUntil = getDaysUntil(order.eventDateISO);
  if (daysUntil <= 7 || order.peopleCount >= 300) {
    return 'High Priority';
  }

  if (daysUntil <= 14 || order.peopleCount >= 200) {
    return 'Medium Priority';
  }

  return 'Normal Priority';
};

const IncomingOrders = () => {
  const {accessToken} = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittingByOrder, setSubmittingByOrder] = useState({});

  const toUiOrder = useCallback(order => {
    const menuItems = Array.isArray(order?.menu)
      ? order.menu
          .map(menuItem => menuItem?.itemName)
          .filter(itemName => typeof itemName === 'string' && itemName.trim().length > 0)
      : [];

    return {
      id: order?.orderId || order?._id || order?.id || '',
      customerName: order?.customerName || 'Customer',
      phoneNumber: order?.phoneNumber || '',
      location: order?.address || 'Address not available',
      eventDateISO: order?.eventDate || '',
      date: order?.eventDate
        ? new Date(order.eventDate).toLocaleDateString('en-IN')
        : 'Date not available',
      peopleCount: Number(order?.numberOfGuests || 0),
      menuItems,
      priorityLevel: order?.priority || '',
      status: (order?.status || '').toLowerCase() || 'pending',
      additionalNote: order?.additionalNote || '',
    };
  }, []);

  const fetchIncomingOrders = useCallback(async () => {
    if (!accessToken) {
      setOrders([]);
      setErrorMessage('Please log in again to view incoming orders.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const incomingOrders = await getIncomingOrders({accessToken});
      setOrders(incomingOrders.map(toUiOrder));
    } catch (error) {
      setOrders([]);
      setErrorMessage(error.message || 'Failed to fetch incoming orders.');
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, toUiOrder]);

  useEffect(() => {
    fetchIncomingOrders();
  }, [fetchIncomingOrders]);

  const updateLocalOrderStatus = useCallback((orderId, status) => {
    setOrders(currentOrders =>
      currentOrders.map(order => (order.id === orderId ? {...order, status} : order)),
    );
  }, []);

  const handleDecision = useCallback(
    async (orderId, decision) => {
      if (!accessToken) {
        setErrorMessage('Please log in again to update order status.');
        return;
      }

      setSubmittingByOrder(current => ({
        ...current,
        [orderId]: decision,
      }));

      try {
        const updatedOrder = await updateIncomingOrderStatus({
          orderId,
          decision,
          accessToken,
        });

        const nextStatus = (updatedOrder?.status || decision || '').toLowerCase();
        updateLocalOrderStatus(orderId, nextStatus);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to update order status.');
      } finally {
        setSubmittingByOrder(current => {
          const next = {...current};
          delete next[orderId];
          return next;
        });
      }
    },
    [accessToken, updateLocalOrderStatus],
  );

  const displayedOrders = useMemo(
    () =>
      orders
        .filter(order => order.status === 'pending')
        .sort((orderA, orderB) => new Date(orderA.eventDateISO) - new Date(orderB.eventDateISO)),
    [orders],
  );

  return (
    <ScreenContainer scrollable contentStyle={styles.listContent}>
      <SectionHeader title="Incoming Orders" subtitle="Accept or reject new requests" />

      {isLoading ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Loading incoming orders...</Text>
          <Text style={styles.emptySubtitle}>Please wait while we fetch the latest requests.</Text>
        </Card>
      ) : errorMessage ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Couldn’t load orders</Text>
          <Text style={styles.emptySubtitle}>{errorMessage}</Text>
          <TouchableOpacity onPress={fetchIncomingOrders}>
            <Text style={styles.menuChipMoreText}>Try Again</Text>
          </TouchableOpacity>
        </Card>
      ) : displayedOrders.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>All Caught Up 🎉</Text>
          <Text style={styles.emptySubtitle}>
            No incoming orders right now. New customer requests will appear here.
          </Text>
        </Card>
      ) : (
        displayedOrders.map(item => {
          const daysUntil = getDaysUntil(item.eventDateISO);
          const priority = getPriority(item);
          const visibleMenuItems = item.menuItems.slice(0, 2);
          const remainingMenuCount = item.menuItems.length - visibleMenuItems.length;
          const currentDecision = submittingByOrder[item.id];
          const isSubmitting = Boolean(currentDecision);

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
                  title={currentDecision === 'accept' ? 'Accepting...' : 'Accept'}
                  style={styles.actionButton}
                  disabled={isSubmitting}
                  onPress={() => handleDecision(item.id, 'accept')}
                />
                <AppButton
                  title={currentDecision === 'reject' ? 'Rejecting...' : 'Reject'}
                  variant="outline"
                  style={styles.actionButton}
                  disabled={isSubmitting}
                  onPress={() => handleDecision(item.id, 'reject')}
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
