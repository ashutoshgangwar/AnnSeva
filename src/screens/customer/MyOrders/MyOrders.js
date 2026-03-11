import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Card from '../../../components/Card';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import Tag from '../../../components/Tag';
import {useAuth} from '../../../context/AuthContext';
import {useOrders} from '../../../context/OrdersContext';
import styles from './MyOrders.styles';

const MyOrders = () => {
  const {user} = useAuth();
  const {orders} = useOrders();

  const myOrders = orders.filter(order => order.customerId === user?.id);

  return (
    <ScreenContainer>
      <SectionHeader title="My Orders" subtitle="Track your submitted requests" />

      <FlatList
        data={myOrders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.item}>
            <Text style={styles.title}>{item.location}</Text>
            <Text style={styles.meta}>{item.date} • {item.peopleCount} people</Text>
            <Text style={styles.menu}>Menu: {item.menuItems.join(', ')}</Text>
            <View style={styles.tagWrap}>
              <Tag label={item.status.toUpperCase()} />
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text>No orders yet.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

export default MyOrders;
