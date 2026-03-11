import React, {useState} from 'react';
import {Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import CheckboxList from '../../../components/CheckboxList';
import InputField from '../../../components/InputField';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useAuth} from '../../../context/AuthContext';
import {useOrders} from '../../../context/OrdersContext';
import styles from './CreateBhandara.styles';

const menuOptions = [
  'Dal Makhani',
  'Chole',
  'Jeera Rice',
  'Pulao',
  'Roti',
  'Boondi Raita',
  'Gulab Jamun',
  'Kheer',
];

const CreateBhandara = () => {
  const {user} = useAuth();
  const {createOrder} = useOrders();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggleItem = item => {
    setMenuItems(current =>
      current.includes(item) ? current.filter(value => value !== item) : [...current, item],
    );
  };

  const handleSubmit = () => {
    if (!user) {
      return;
    }

    createOrder({
      customerId: user.id,
      customerName: user.name,
      location,
      date,
      peopleCount: Number(peopleCount),
      menuItems,
    });

    setSuccessMessage('Bhandara request submitted successfully!');
    setLocation('');
    setDate('');
    setPeopleCount('');
    setMenuItems([]);
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader title="Create Bhandara" subtitle="Share your event details" />

      <InputField label="Location" value={location} onChangeText={setLocation} placeholder="Event location" />
      <InputField label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
      <InputField
        label="Number of People"
        value={peopleCount}
        onChangeText={setPeopleCount}
        placeholder="Expected attendees"
        keyboardType="number-pad"
      />

      <Text style={styles.helper}>Menu Items</Text>
      <CheckboxList items={menuOptions} selected={menuItems} onToggle={handleToggleItem} />

      <View style={styles.submitWrap}>
        <AppButton title="Submit Request" onPress={handleSubmit} />
      </View>

      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
    </ScreenContainer>
  );
};

export default CreateBhandara;
