import {API_BASE_URL} from '../config/env';

const HALWAI_ONBOARD_PATH = '/api/v1/halwai/onboard';

const buildUrl = path => {
  const baseUrl = API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not configured in .env');
  }
  return `${baseUrl.replace(/\/$/, '')}${path}`;
};

export const onboardHalwai = async ({payload, accessToken}) => {
  const response = await fetch(buildUrl(HALWAI_ONBOARD_PATH), {
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
      responsePayload?.message || responsePayload?.error || 'Halwai onboarding failed';
    throw new Error(errorMessage);
  }

  const data = responsePayload?.data;
  if (!data?._id) {
    throw new Error('Invalid onboarding response from server');
  }

  return data;
};