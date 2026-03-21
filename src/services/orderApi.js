import {API_BASE_URL} from '../config/env';

const CUSTOMER_REQUEST_PATH = '/api/v1/orders/customer-request';

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
