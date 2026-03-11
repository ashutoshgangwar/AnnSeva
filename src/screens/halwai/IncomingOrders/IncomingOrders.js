import React from 'react';
import {FlatList, Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import {useOrders} from '../../../context/OrdersContext';
import styles from './IncomingOrders.styles';

const IncomingOrders = () => {
  const {orders, updateOrderStatus} = useOrders();
  const pendingOrders = orders.filter(order => order.status === 'pending');

  return (
    <ScreenContainer>
      <SectionHeader title="Incoming Orders" subtitle="Accept or reject new requests" />

      <FlatList
        data={pendingOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.item}>
            <Text style={styles.title}>{item.customerName}</Text>
            <Text style={styles.meta}>{item.location} • {item.date}</Text>
            <Text style={styles.meta}>{item.peopleCount} people</Text>
            <Text style={styles.menu}>Menu: {item.menuItems.join(', ')}</Text>
            <View style={styles.actions}>
              <AppButton title="Accept" onPress={() => updateOrderStatus(item.id, 'accepted')} />
              <AppButton
                title="Reject"
                variant="outline"
                onPress={() => updateOrderStatus(item.id, 'rejected')}
              />
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text>No incoming orders.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default IncomingOrders;
