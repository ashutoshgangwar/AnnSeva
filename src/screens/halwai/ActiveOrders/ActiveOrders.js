import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './ActiveOrders.styles';

const ActiveOrders = () => {
  const {orders} = useOrders();
  const activeOrders = orders.filter(order => order.status === 'accepted');

  return (
    <ScreenContainer>
      <SectionHeader title="Active Orders" subtitle="Orders you have accepted" />

      <FlatList
        data={activeOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.item}>
            <Text style={styles.title}>{item.customerName}</Text>
            <Text style={styles.meta}>{item.location} • {item.date}</Text>
            <Text style={styles.meta}>{item.peopleCount} people</Text>
            <Text style={styles.menu}>Menu: {item.menuItems.join(', ')}</Text>
          </Card>
        )}
        ListEmptyComponent={<Text>No active orders.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default ActiveOrders;
