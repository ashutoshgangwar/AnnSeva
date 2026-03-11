import {mockUsers} from '../data/mockUsers';

export const loginWithPhoneNumber = phoneNumber => {
  const matchedUser = mockUsers.find(user => user.phone === phoneNumber);
  return matchedUser || null;
};
