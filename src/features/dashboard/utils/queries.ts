import { BaseResponse, fetcher } from '@/features/@shared/utils/query-helper';
import { useQuery } from '@tanstack/react-query';

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

export { useFetchLabelItems, type LabelItemsResponse };
