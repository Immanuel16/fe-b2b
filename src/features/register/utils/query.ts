import {
  fetcher,
  type BaseResponseBlicicil,
} from '@/features/@shared/utils/query-helper';
import { useMutation } from '@tanstack/react-query';

type RegisterRequest = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  role_id: string;
  business_type: string;
};

function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => {
      return fetcher
        .post<BaseResponseBlicicil<null | string>>(
          '/api-blicicil/auth/register',
          {
            ...payload,
            service: 'BLICICIL_FOR_BUSINESS',
          },
        )
        .then((response) => response.data.data);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["active-borrowers"],
    //   });
    // },
  });
}

export { useRegister, type RegisterRequest };
