import {
  BaseResponse,
  fetcher,
  queryClient,
} from '@/features/@shared/utils/query-helper';
import { useMutation } from '@tanstack/react-query';

type LoginRequest = {
  user_id: string;
  password: string;
};

type LoginExternalRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user_id: string;
  exp: number;
  iat: number;
  token: string;
};

// ===== INTERNAL ======
function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => {
      return fetcher
        .post<BaseResponse<LoginResponse>>('/api/login_internal', payload)
        .then((response) => response.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['login-internal'],
      });
    },
  });
}

function useLogout() {
  return useMutation({
    mutationFn: (payload: { user_id: string }) => {
      return fetcher
        .post<BaseResponse<LoginResponse>>('/api/logout_internal', payload)
        .then((response) => response.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['logout'],
      });
    },
  });
}
// ===== END INTERNAL ======

// ===== EXTERNAL ======
function useLoginExternal() {
  return useMutation({
    mutationFn: (payload: LoginExternalRequest) => {
      return fetcher
        .post<BaseResponse<LoginResponse>>('/api/login_eksternal', payload)
        .then((response) => response.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['login-external'],
      });
    },
  });
}

function useLogoutExternal() {
  return useMutation({
    mutationFn: (payload: { email: string }) => {
      return fetcher
        .post<BaseResponse<LoginResponse>>('/api/logout_eksternal', payload)
        .then((response) => response.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['logout'],
      });
    },
  });
}
// ===== END EXTERNAL ======

export {
  useLogin,
  useLoginExternal,
  useLogout,
  useLogoutExternal,
  type LoginRequest,
  type LoginResponse,
};
