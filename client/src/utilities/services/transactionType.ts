import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api';
import { AxiosError } from 'axios';
import { ITransactionType, ITransactionTypeRequest } from '../types';

const TRANSACTION_TYPE_QUERY_KEY = 'transaction_types';

export const useTransactionTypes = () => {
  return useQuery<ITransactionType[], AxiosError>({
    queryKey: [TRANSACTION_TYPE_QUERY_KEY],
    queryFn: async () => {
      const response = await API.get<ITransactionType[]>('/transaction_types');
      return response.data;
    },
  });
};

export const useCreateTransactionType = () => {
  const queryClient = useQueryClient();

  return useMutation<ITransactionType, AxiosError, ITransactionTypeRequest>({
    mutationFn: async (newTransactionType: ITransactionTypeRequest) => {
      const response = await API.post<ITransactionType>('/transaction_types', newTransactionType);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTION_TYPE_QUERY_KEY] });
    },
  });
};

// export const useDeleteTransactionType = () => {
//   const queryClient = useQueryClient();

//   return useMutation<void, AxiosError, string>({
//     mutationFn: async (transactionTypeId: string) => {
//       await API.delete(`/transaction_types/${transactionTypeId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [TRANSACTION_TYPE_QUERY_KEY] });
//     },
//   });
// };