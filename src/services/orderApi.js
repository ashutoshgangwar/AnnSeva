import {API_BASE_URL} from '../config/env';

const CUSTOMER_REQUEST_PATH = '/api/v1/orders/customer-request';
const CUSTOMER_ORDERS_PATH = customerId => `/api/v1/customers/${customerId}/orders`;

const buildUrl = path => {
  const baseUrl = API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not configured in .env');
  }
  return `${baseUrl.replace(/\/$/, '')}${path}`;
};

export const createCustomerRequest = async ({payload, accessToken}) => {
  const response = await fetch(buildUrl(CUSTOMER_REQUEST_PATH), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
    },
    body: JSON.stringify(payload),
  });

  const responsePayload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      responsePayload?.message || responsePayload?.error || 'Order creation failed';
    throw new Error(errorMessage);
  }

  const data = responsePayload?.data;

  if (responsePayload?.success === false) {
    throw new Error(responsePayload?.message || 'Order creation failed');
  }

  if (!data?._id || !data?.userId || !data?.customerAddress) {
    throw new Error('Invalid order response from server');
  }

  return data;
};

const normalizeOrderStatus = status => {
  const normalizedStatus = (status || '').toLowerCase();

  if (normalizedStatus === 'submitted') {
    return 'pending';
  }

  if (normalizedStatus === 'reject') {
    return 'cancelled';
  }

  return normalizedStatus || 'pending';
};

export const getCustomerOrders = async ({customerId, accessToken}) => {
  if (!customerId) {
    throw new Error('Customer ID is required to fetch orders');
  }

  const response = await fetch(buildUrl(CUSTOMER_ORDERS_PATH(customerId)), {
    method: 'GET',
    headers: {
      ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
    },
  });

  const responsePayload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      responsePayload?.message || responsePayload?.error || 'Fetching customer orders failed';
    throw new Error(errorMessage);
  }

  if (responsePayload?.success === false) {
    throw new Error(responsePayload?.message || 'Fetching customer orders failed');
  }

  const payloadData = responsePayload?.data || {};
  const orders = Array.isArray(payloadData?.orders)
    ? payloadData.orders.map(order => ({
        ...order,
        status: normalizeOrderStatus(order?.status),
      }))
    : [];

  return {
    ...payloadData,
    orders,
  };
};
