import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import ScreenContainer from '../../../components/ScreenContainer';
import {useOrders} from '../../../context/OrdersContext';
import styles from './OrderSummary.styles';

const STARS = [1, 2, 3, 4, 5];

const OrderSummary = ({route, navigation}) => {
  const {orderId} = route.params;
  const {orders, updateOrderDetails} = useOrders();
  const order = orders.find(o => o.id === orderId);

  const [rating, setRating] = useState(order?.customerRating || 0);
  const [submitted, setSubmitted] = useState(!!order?.customerRating);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = item =>
    setSelectedItems(cur =>
      cur.includes(item) ? cur.filter(i => i !== item) : [...cur, item],
    );

  if (!order) {
    return (
      <ScreenContainer>
        <Text style={styles.errorText}>Order not found.</Text>
      </ScreenContainer>
    );
  }

  const finalAmount = order.totalAmount || order.peopleCount * 180;

  const handleSubmitRating = () => {
    if (rating === 0) {return;}
    updateOrderDetails(orderId, {customerRating: rating});
    setSubmitted(true);
    setTimeout(() => navigation.navigate('CustomerHome'), 1500);
  };

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🎉</Text>
        <View>
          <Text style={styles.heroTitle}>Bhandara Completed!</Text>
          <Text style={styles.heroSub}>Order #{order.id.replace('order_', '')}</Text>
        </View>
      </View>

      {/* Final Payment Card */}
      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Final Amount Paid</Text>
        <Text style={styles.amountValue}>₹{finalAmount.toLocaleString()}</Text>
        <View style={styles.amountBadge}>
          <Text style={styles.amountBadgeText}>
            {order.paymentStatus === 'paid' ? '✅ Payment Received' : '⏳ Payment Pending'}
          </Text>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Order Details</Text>
        <View style={styles.detailTable}>
          {[
            {label: 'Location', value: order.location},
            {label: 'Date', value: order.date},
            {label: 'Guests', value: `${order.peopleCount} people`},
            {label: 'Price/Plate', value: `₹${Math.round(finalAmount / order.peopleCount)}`},
            {label: 'Total Plates', value: order.peopleCount},
            {label: 'Status', value: order.status.charAt(0).toUpperCase() + order.status.slice(1)},
          ].map(row => (
            <View key={row.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍽️ Menu Served</Text>
        <Text style={styles.menuHint}>Tap to highlight what you enjoyed</Text>
        <View style={styles.menuGrid}>
          {order.menuItems.map(item => {
            const active = selectedItems.includes(item);
            return (
              <TouchableOpacity
                key={item}
                style={[styles.menuChip, active && styles.menuChipActive]}
                activeOpacity={0.75}
                onPress={() => toggleItem(item)}>
                <Text style={[styles.menuChipText, active && styles.menuChipTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedItems.length > 0 && (
          <Text style={styles.menuSelCount}>{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} highlighted</Text>
        )}
      </View>

      {/* Rating */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⭐ Rate Your Experience</Text>
        <Text style={styles.ratingHint}>
          {submitted ? 'Thank you for your feedback!' : 'How was the food and service?'}
        </Text>

        <View style={styles.starsRow}>
          {STARS.map(star => (
            <TouchableOpacity
              key={star}
              onPress={() => !submitted && setRating(star)}
              disabled={submitted}>
              <Text style={[styles.starIcon, star <= rating && styles.starIconActive]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {rating > 0 && (
          <Text style={styles.ratingCaption}>
            {['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Excellent 🤩'][rating]}
          </Text>
        )}

        {!submitted && (
          <AppButton
            title={rating === 0 ? 'Select a rating first' : 'Submit Rating'}
            onPress={handleSubmitRating}
            style={styles.ratingBtn}
          />
        )}

        {submitted && (
          <View style={styles.thankBox}>
            <Text style={styles.thankText}>🙏 Your rating has been submitted!</Text>
          </View>
        )}
      </View>

      <AppButton
        title="Back to My Orders"
        variant="outline"
        onPress={() => navigation.navigate('MyOrders')}
        style={styles.backBtn}
      />
    </ScreenContainer>
  );
};

export default OrderSummary;
