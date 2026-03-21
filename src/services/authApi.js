import {API_BASE_URL} from '../config/env';

const SIGNUP_AUTH_PATH = '/api/v1/auth/signup';
const LOGIN_AUTH_PATH = '/api/v1/auth/login';

const buildUrl = path => {
  const baseUrl = API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not configured in .env');
  }
  return `${baseUrl.replace(/\/$/, '')}${path}`;
};

const parseAuthResponse = payload => {
  const data = payload?.data || payload || {};

  if (!data.token || !data.user?.role) {
    throw new Error('Invalid auth response from server');
  }

  const normalizedUserId = data.user.userId || data.user._id || data.user.id || null;

  return {
    token: data.token,
    user: {
      ...data.user,
      userId: normalizedUserId,
      role: data.user.role,
      hasProfileId: data.user.hasProfileId ?? Boolean(data.user.profileId),
      profileId: data.user.profileId ?? null,
      profileModel: data.user.profileModel ?? null,
      picture: data.user.picture ?? '',
    },
  };
};

const postAuthRequest = async (path, requestBody, fallbackMessage) => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = payload?.message || payload?.error || fallbackMessage;
    throw new Error(errorMessage);
  }

  return parseAuthResponse(payload);
};

export const signupUser = async ({name, email, phoneNumber, password, role}) => {
  const requestBody = {
    name,
    password,
    role,
  };

  if (email) {
    requestBody.email = email;
  }

  if (phoneNumber) {
    requestBody.phoneNumber = phoneNumber;
  }

  return postAuthRequest(
    SIGNUP_AUTH_PATH,
    requestBody,
    'Signup failed',
  );
};

export const loginUser = async ({email, phoneNumber, password}) => {
  const requestBody = {
    password,
  };

  if (email) {
    requestBody.email = email;
  }

  if (phoneNumber) {
    requestBody.phoneNumber = phoneNumber;
  }

  return postAuthRequest(
    LOGIN_AUTH_PATH,
    requestBody,
    'Login failed',
  );
};
