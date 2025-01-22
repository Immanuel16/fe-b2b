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
        .get<BaseResponse<SaldoPlafonResponse>>('api-proxy/saldo_plafon')
        .then((response) => response.data),
  });
}

type LabelItemsResponse = Array<{
  id: number;
  item_thumb_highres: string;
  name: string;
  item_type: string;
  status: string;
}>;

function useFetchLabelItems() {
  return useQuery({
    enabled: true,
    queryKey: ['label-items'],
    queryFn: () =>
      fetcher
        .get<BaseResponse<LabelItemsResponse>>('api/reseller/orders')
        .then((response) => response.data),
  });
}

export {
  useFetchSaldo,
  useFetchLabelItems,
  type SaldoPlafonResponse,
  type LabelItemsResponse,
};
