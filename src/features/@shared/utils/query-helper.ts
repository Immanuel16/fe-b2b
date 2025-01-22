import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useUserId } from './use-userid';
import { encrypt } from './formatter';

type ErrorResponse = {
  message: string;
  status: number;
};

// type BaseResponse<T> = {
//   data: T;
//   error: string | null;
//   status_code: number | null;
//   metadata: {
//     limit: number | null;
//     offset: number | null;
//     count: number | null;
//     extra_data: unknown;
//   };
// };
type BaseResponse<T> = {
  data: T;
  message: string;
  reff_no: string;
  metadata?: {
    count: number;
    offset: number;
  };
};

type BaseResponseBlicicil<T> = {
  success: string;
  message: string;
  data: T;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  auth: {
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME ?? 'blicicil',
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD ?? 'blic1c!l',
  },
  headers: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
});
fetcher.interceptors.request.use((config) => {
  const token = getCookie('token');
  const urlNoAuthorization = ['register', 'login'];
  const isExistNoAuth = !!urlNoAuthorization.find((url) =>
    config.url?.includes(url),
  );
  if (!isExistNoAuth) {
    config.headers['token'] = token;
    // if (token) {
    //   config.headers['x-userid'] = encrypt(
    //     JSON.parse(atob(token.toString().split('.')[1]))['userId'],
    //   );
    // }
  }
  return config;
});
fetcher.interceptors.response.use(undefined, async (error) => {
  const isAuth = ['/api/login', '/api/logout', '/api/auth/'].some((item) =>
    error.config.url.startsWith(item),
  );
  const isIntercepted = error.response.status === 401 && !isAuth;

  if (isIntercepted && typeof window !== 'undefined') {
    await fetcher.post('/api/logout', { force: true });
    window.location.href = '/login';
  } else if (isIntercepted) {
    // TODO: make proper logout interceptor for serverside api calls
  }

  if (error.response?.data && error.response?.status) {
    const errorMessage = error.response.data.error as string;
    const responseMessage = error.response.data.message as string;
    throw {
      message: errorMessage || responseMessage,
      status: error.response.status as number,
    } as ErrorResponse;
  }

  throw {
    message: 'internal error',
    status: (error.response?.status as number) ?? 500,
  } as ErrorResponse;
});

export {
  queryClient,
  fetcher,
  type BaseResponse,
  type BaseResponseBlicicil,
  type ErrorResponse,
};
