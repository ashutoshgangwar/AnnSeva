import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import AppButton from '../../../components/AppButton';
import ScreenContainer from '../../../components/ScreenContainer';
import {useAuth} from '../../../context/AuthContext';
import {useOrders} from '../../../context/OrdersContext';
import styles from './CreateBhandara.styles';

const MENU_OPTIONS = [
  {label: 'Dal Makhani', icon: '🫘'},
  {label: 'Chole', icon: '🍛'},
  {label: 'Jeera Rice', icon: '🍚'},
  {label: 'Pulao', icon: '🍲'},
  {label: 'Roti', icon: '🫓'},
  {label: 'Boondi Raita', icon: '🥣'},
  {label: 'Gulab Jamun', icon: '🍮'},
  {label: 'Kheer', icon: '🍨'},
  {label: 'Halwa', icon: '🍯'},
  {label: 'Puri', icon: '🫓'},
];

const EVENT_TYPES = [
  {label: 'Bhandara', icon: '🪔'},
  {label: 'Langar', icon: '🕌'},
  {label: 'Pooja', icon: '🙏'},
  {label: 'Other', icon: '✨'},
];

const SERVING_STYLES = [
  {label: 'Plate Service', icon: '🫙'},
  {label: 'Counter', icon: '🪣'},
];

const PRICE_PER_PLATE = 180;

const CreateBhandara = () => {
  const {user} = useAuth();
  const {createOrder} = useOrders();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [eventType, setEventType] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [servingStyle, setServingStyle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = item =>
    setMenuItems(cur =>
      cur.includes(item) ? cur.filter(v => v !== item) : [...cur, item],
    );

  const estimatedCost = Number(peopleCount) > 0 ? Number(peopleCount) * PRICE_PER_PLATE : null;

  const handleSubmit = () => {
    if (!user || !location || !date || !peopleCount) {return;}
    createOrder({
      customerId: user.id,
      customerName: user.name,
      location,
      date,
      peopleCount: Number(peopleCount),
      menuItems,
      eventType,
      isVeg,
      servingStyle,
      instructions,
    });
    setSubmitted(true);
    setLocation('');
    setDate('');
    setPeopleCount('');
    setMenuItems([]);
    setEventType('');
    setIsVeg(true);
    setServingStyle('');
    setInstructions('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const isReady = location && date && peopleCount;

  return (
    <ScreenContainer scrollable contentStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🪔</Text>
        <View>
          <Text style={styles.heroTitle}>Create Bhandara</Text>
          <Text style={styles.heroSub}>Fill in event details to find your halwai</Text>
        </View>
      </View>

      {/* Step 1 — Event Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>1</Text></View>
          <Text style={styles.cardTitle}>Event Details</Text>
        </View>

        <Text style={styles.fieldLabel}>📍 Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter event location"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.fieldLabel}>📅 Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.fieldLabel}>👥 Number of Guests</Text>
        <TextInput
          style={styles.input}
          value={peopleCount}
          onChangeText={setPeopleCount}
          placeholder="Expected attendees"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
        />

        {estimatedCost && (
          <View style={styles.estimateRow}>
            <Text style={styles.estimateLabel}>Estimated Cost</Text>
            <Text style={styles.estimateValue}>₹{estimatedCost.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* Step 2 — Menu */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>2</Text></View>
          <Text style={styles.cardTitle}>Choose Menu Items</Text>
        </View>
        <Text style={styles.menuHint}>{menuItems.length} item{menuItems.length !== 1 ? 's' : ''} selected</Text>
        <View style={styles.menuGrid}>
          {MENU_OPTIONS.map(opt => {
            const active = menuItems.includes(opt.label);
            return (
              <TouchableOpacity
                key={opt.label}
                style={[styles.menuChip, active && styles.menuChipActive]}
                onPress={() => toggleItem(opt.label)}>
                <Text style={styles.menuChipIcon}>{opt.icon}</Text>
                <Text style={[styles.menuChipLabel, active && styles.menuChipLabelActive]}>
                  {opt.label}
                </Text>
                {active && <Text style={styles.menuChipTick}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Step 3 — Other Options */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>3</Text></View>
          <Text style={styles.cardTitle}>Other Options</Text>
        </View>

        <Text style={styles.fieldLabel}>🎉 Event Type</Text>
        <View style={styles.optionGrid}>
          {EVENT_TYPES.map(et => (
            <TouchableOpacity
              key={et.label}
              style={[styles.optionChip, eventType === et.label && styles.optionChipActive]}
              onPress={() => setEventType(eventType === et.label ? '' : et.label)}>
              <Text style={styles.menuChipIcon}>{et.icon}</Text>
              <Text style={[styles.menuChipLabel, eventType === et.label && styles.menuChipLabelActive]}>
                {et.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.fieldLabel, {marginTop: verticalScale(10)}]}>🍽️ Serving Style</Text>
        <View style={styles.optionGrid}>
          {SERVING_STYLES.map(s => (
            <TouchableOpacity
              key={s.label}
              style={[styles.optionChip, servingStyle === s.label && styles.optionChipActive]}
              onPress={() => setServingStyle(servingStyle === s.label ? '' : s.label)}>
              <Text style={styles.menuChipIcon}>{s.icon}</Text>
              <Text style={[styles.menuChipLabel, servingStyle === s.label && styles.menuChipLabelActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Step 4 — Additional Instructions */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>4</Text></View>
          <Text style={styles.cardTitle}>Additional Instructions</Text>
        </View>
        <Text style={styles.fieldLabel}>📝 Any special requests or notes for the halwai?</Text>
        <TextInput
          style={styles.textArea}
          value={instructions}
          onChangeText={setInstructions}
          placeholder="e.g. No onion-garlic, extra sweet dishes, specific timing, equipment needed..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {instructions.length > 0 && (
          <Text style={styles.charCount}>{instructions.length} characters</Text>
        )}
      </View>

      {/* Summary strip */}
      {isReady && (
        <View style={styles.summaryStrip}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>{peopleCount}</Text>
            <Text style={styles.summaryKey}>Guests</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>{menuItems.length}</Text>
            <Text style={styles.summaryKey}>Dishes</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>₹{estimatedCost ? estimatedCost.toLocaleString() : '--'}</Text>
            <Text style={styles.summaryKey}>Est. Cost</Text>
          </View>
        </View>
      )}

      <AppButton
        title={isReady ? '🚀 Submit Bhandara Request' : 'Fill details to continue'}
        onPress={handleSubmit}
        style={styles.submitBtn}
      />

      {submitted && (
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successText}>Bhandara request submitted! Halwai will reach out soon.</Text>
        </View>
      )}
    </ScreenContainer>
  );
};

export default CreateBhandara;
