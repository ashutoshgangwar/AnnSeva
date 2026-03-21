import {API_BASE_URL as ENV_API_BASE_URL, API_KEY_GEOCODING} from '@env';

const normalizeBaseUrl = url => {
	const normalized = (url || '').trim();
	if (!normalized) {
		return 'http://192.168.1.7:3000';
	}

	if (/^https?:\/\//i.test(normalized)) {
		return normalized;
	}

	return `http://${normalized}`;
};

const appendDefaultPortIfMissing = url => {
	if (/:[0-9]+$/.test(url)) {
		return url;
	}

	return `${url}:3000`;
};

export const API_BASE_URL = appendDefaultPortIfMissing(normalizeBaseUrl(ENV_API_BASE_URL));
export const GOOGLE_PLACES_API_KEY = (API_KEY_GEOCODING || '').trim();
