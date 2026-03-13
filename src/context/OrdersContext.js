import React, {createContext, useContext, useMemo, useState} from 'react';
import {mockOrders} from '../data/mockOrders';

const OrdersContext = createContext(null);

export const OrdersProvider = ({children}) => {
  const [orders, setOrders] = useState(mockOrders);

  const createOrder = orderPayload => {
    const newOrder = {
      ...orderPayload,
      id: `order_${Date.now()}`,
      status: 'pending',
    };
    setOrders(current => [newOrder, ...current]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(current =>
      current.map(order => (order.id === orderId ? {...order, status} : order)),
    );
  };

  const updateOrderProgress = (orderId, progress) => {
    setOrders(current =>
      current.map(order => (order.id === orderId ? {...order, progress} : order)),
    );
  };

  const updateOrderDetails = (orderId, updates) => {
    setOrders(current =>
      current.map(order => (order.id === orderId ? {...order, ...updates} : order)),
    );
  };

  const value = useMemo(
    () => ({
      orders,
      createOrder,
      updateOrderStatus,
      updateOrderProgress,
      updateOrderDetails,
    }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
};
