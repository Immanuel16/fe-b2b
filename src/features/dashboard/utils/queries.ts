import { BaseResponse, fetcher } from '@/features/@shared/utils/query-helper';
import { useQuery } from '@tanstack/react-query';

type SaldoPlafonResponse = {
  user_id: string;
  limit_plafon: string;
  used_plafon: string;
  remaining_plafon: string;
};

function useFetchSaldo() {
  return useQuery({
    enabled: true,
    queryKey: ['saldo_plafon'],
    queryFn: () =>
      fetcher
        .get<BaseResponse<SaldoPlafonResponse>>('api/saldo_plafon')
        .then((response) => response.data),
  });
}

// function usePostSaldo

export { useFetchSaldo, type SaldoPlafonResponse };
