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

type LoginResponse = {
  user_id: string;
  exp: number;
  iat: number;
  token: string;
};

function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => {
      return fetcher
        .post<BaseResponse<LoginResponse>>('/api/login_internal', payload)
        .then((response) => response.data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['active-borrowers'],
      });
    },
  });
}

export { useLogin, type LoginResponse, type LoginRequest };
