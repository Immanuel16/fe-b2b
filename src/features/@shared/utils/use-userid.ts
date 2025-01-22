import { getCookie } from 'cookies-next';
import CryptoJS from 'crypto-js';

type TokenPayload = {
  iat: number;
  exp: number;
  userId: string;
};

// const getCookie = (name: string): string | null => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
//   return null;
// };

export const useUserId = async () => {
  const token = await getCookie('token');
  let userId = '';

  if (token) {
    userId = JSON.parse(atob(token.split('.')[1]))['userId'];
  }

  return userId;
};
