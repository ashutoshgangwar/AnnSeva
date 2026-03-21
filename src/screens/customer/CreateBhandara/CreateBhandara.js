import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import AppButton from '../../../components/AppButton';
import ScreenContainer from '../../../components/ScreenContainer';
import {useAuth} from '../../../context/AuthContext';
import {useOrders} from '../../../context/OrdersContext';
import {GOOGLE_PLACES_API_KEY} from '../../../config/env';
import {createCustomerRequest} from '../../../services/orderApi';
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

const EVENT_DATE_FORMAT_HINT = 'YYYY-MM-DD HH:mm';

const normalizeServingStyle = value => value.toLowerCase().replace(/\s+/g, '-');

const normalizeMenuItems = items => items.map(item => item.toLowerCase());

const parseEventDate = inputValue => {
  const value = inputValue.trim();

  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toISOString();
};

const toPredictionItem = prediction => ({
  id: prediction.place_id,
  description: prediction.description,
  placeId: prediction.place_id,
});

const CreateBhandara = ({navigation}) => {
  const {user, accessToken} = useAuth();
  const {createOrder} = useOrders();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || user?.phone || '');
  const [peopleCount, setPeopleCount] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [eventType, setEventType] = useState('');
  const [servingStyle, setServingStyle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocationCoords, setSelectedLocationCoords] = useState(null);

  const toggleItem = item =>
    setMenuItems(cur =>
      cur.includes(item) ? cur.filter(v => v !== item) : [...cur, item],
    );

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (!GOOGLE_PLACES_API_KEY || location.trim().length < 2) {
        setLocationSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);

      try {
        const locationBias = currentLocation
          ? `&location=${currentLocation.latitude},${currentLocation.longitude}&radius=30000`
          : '';

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            location,
          )}&components=country:in${locationBias}&key=${GOOGLE_PLACES_API_KEY}`,
        );

        const payload = await response.json().catch(() => null);

        if (payload?.status === 'OK' && Array.isArray(payload.predictions)) {
          setLocationSuggestions(payload.predictions.slice(0, 5).map(toPredictionItem));
          return;
        }

        setLocationSuggestions([]);
      } catch (_error) {
        setLocationSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(timerId);
  }, [currentLocation, location]);

  const fetchAddressFromCoordinates = async coords => {
    if (!GOOGLE_PLACES_API_KEY || !coords) {
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_PLACES_API_KEY}`,
      );
      const payload = await response.json().catch(() => null);
      const formattedAddress = payload?.results?.[0]?.formatted_address;
      if (formattedAddress) {
        setLocation(formattedAddress);
      }
    } catch (_error) {
      // no-op fallback: keep manual input
    }
  };

  const handleUseCurrentLocation = async () => {
    if (!GOOGLE_PLACES_API_KEY) {
      Alert.alert('Missing API Key', 'Please add Google Places API key in .env file.');
      return;
    }

    setIsFetchingCurrentLocation(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_PLACES_API_KEY}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({considerIp: true}),
        },
      );

      const payload = await response.json().catch(() => null);
      const latitude = payload?.location?.lat;
      const longitude = payload?.location?.lng;

      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new Error('Unable to fetch current coordinates');
      }

      const nextCoords = {latitude, longitude};
      setCurrentLocation(nextCoords);
      setSelectedLocationCoords(nextCoords);
      await fetchAddressFromCoordinates(nextCoords);
    } catch (_error) {
      Alert.alert('Location Error', 'Could not fetch current location. Enter address manually.');
    } finally {
      setIsFetchingCurrentLocation(false);
    }
  };

  const handleSelectSuggestion = async suggestion => {
    if (!GOOGLE_PLACES_API_KEY || !suggestion?.placeId) {
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion.placeId}&fields=formatted_address,geometry&key=${GOOGLE_PLACES_API_KEY}`,
      );
      const payload = await response.json().catch(() => null);
      const details = payload?.result;
      const latitude = details?.geometry?.location?.lat;
      const longitude = details?.geometry?.location?.lng;

      setLocation(details?.formatted_address || suggestion.description);
      setLocationSuggestions([]);

      if (typeof latitude === 'number' && typeof longitude === 'number') {
        setSelectedLocationCoords({latitude, longitude});
      }
    } catch (_error) {
      setLocation(suggestion.description);
      setLocationSuggestions([]);
    }
  };

  const estimatedCost = Number(peopleCount) > 0 ? Number(peopleCount) * PRICE_PER_PLATE : null;

  const normalizedEventDate = useMemo(() => parseEventDate(date), [date]);

  const handleSubmit = async () => {
    const userId = user?.userId || user?.id || user?._id;

    if (!userId || !location || !date || !peopleCount || !phoneNumber) {
      Alert.alert('Missing Details', 'Please fill phone, location, event date, and guests count.');
      return;
    }

    if (!normalizedEventDate) {
      Alert.alert('Invalid Date', `Enter date as ${EVENT_DATE_FORMAT_HINT} or valid ISO datetime.`);
      return;
    }

    const fallbackCoords = currentLocation || {latitude: 28.6139, longitude: 77.209};
    const finalCoords = selectedLocationCoords || fallbackCoords;

    const payload = {
      userId,
      customerName: user?.name || 'Customer',
      phoneNumber: phoneNumber.trim(),
      priority: 'high',
      customerAddress: location.trim(),
      currentLocation: {
        latitude: finalCoords.latitude,
        longitude: finalCoords.longitude,
      },
      eventDate: normalizedEventDate,
      numberOfGuests: Number(peopleCount),
      menu: normalizeMenuItems(menuItems),
      eventType: (eventType || 'bhandara').toLowerCase(),
      servingStyle: normalizeServingStyle(servingStyle || 'plate service'),
      additionalNote: instructions.trim(),
    };

    setIsSubmitting(true);

    try {
      const createdOrder = await createCustomerRequest({
        payload,
        accessToken,
      });

      createOrder({
        customerId: createdOrder.userId || userId,
        customerName: createdOrder.customerName,
        phoneNumber: createdOrder.phoneNumber,
        location: createdOrder.customerAddress,
        date: createdOrder.eventDate,
        peopleCount: createdOrder.numberOfGuests,
        menuItems: createdOrder.menu?.map(item => item.itemName) || menuItems,
        eventType: createdOrder.eventType,
        servingStyle: createdOrder.servingStyle,
        instructions: createdOrder.additionalNote,
        status: createdOrder.status,
        paymentStatus: createdOrder.paymentStatus,
      });

      setSubmitted(true);
      setLocation('');
      setDate('');
      setPhoneNumber(user?.phoneNumber || user?.phone || '');
      setPeopleCount('');
      setMenuItems([]);
      setEventType('');
      setServingStyle('');
      setInstructions('');
      setLocationSuggestions([]);
      setTimeout(() => setSubmitted(false), 4000);
      navigation.navigate('CustomerHome');
    } catch (error) {
      Alert.alert('Order Failed', error?.message || 'Could not create request. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReady = location && date && peopleCount && phoneNumber;

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
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleUseCurrentLocation}
          disabled={isFetchingCurrentLocation}>
          {isFetchingCurrentLocation ? (
            <ActivityIndicator size="small" color="#065F46" />
          ) : (
            <Text style={styles.currentLocationButtonText}>📡 Use Current Location</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter event location"
          placeholderTextColor="#9CA3AF"
        />
        {(isLoadingSuggestions || locationSuggestions.length > 0) && (
          <View style={styles.suggestionsContainer}>
            {isLoadingSuggestions ? (
              <Text style={styles.suggestionLoadingText}>Finding places...</Text>
            ) : (
              locationSuggestions.map(suggestion => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(suggestion)}>
                  <Text style={styles.suggestionItemText}>{suggestion.description}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        <Text style={styles.fieldLabel}>📞 Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter customer phone number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          maxLength={15}
        />

        <Text style={styles.fieldLabel}>📅 Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder={EVENT_DATE_FORMAT_HINT}
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
        title={
          isSubmitting
            ? 'Submitting...'
            : isReady
              ? '🚀 Submit Bhandara Request'
              : 'Fill details to continue'
        }
        onPress={handleSubmit}
        style={styles.submitBtn}
        disabled={!isReady || isSubmitting}
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
