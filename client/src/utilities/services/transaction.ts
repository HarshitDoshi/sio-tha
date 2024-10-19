import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from '../api';
import { AxiosError } from 'axios';
import { ISpace, ITransaction, ITransactionRequest } from '../types';

const TRANSACTION_QUERY_KEY = 'transactions';

export const useTransactions = ({ spaceId }: { spaceId: ISpace['id'] }) => {
  return useQuery<ITransaction[], AxiosError>({
    queryKey: [TRANSACTION_QUERY_KEY, spaceId],
    queryFn: async () => {
      const response = await API.get<ITransaction[]>(`${spaceId}/transactions/`);
      return response.data;
    },
    enabled: !!spaceId,
  });
};

export const useTransaction = ({ spaceId, transactionId }: { spaceId: ISpace['id'], transactionId: ITransaction['id'] }) => {
  return useQuery<ITransaction, AxiosError>({
    queryKey: [TRANSACTION_QUERY_KEY, spaceId, transactionId],
    queryFn: async ({ queryKey }) => {
      const [, , transactionIdFromQueryKey] = queryKey as [string, string, string];
      const response = await API.get<ITransaction>(`/${spaceId}/transactions/${transactionIdFromQueryKey}`);
      return response.data;
    },
    enabled: !!spaceId && !!transactionId,
  });
};

export const useCreateTransaction = ({ spaceId }: { spaceId: ISpace['id'] }) => {
  const queryClient = useQueryClient();

  return useMutation<ITransaction, AxiosError, ITransactionRequest>({
    mutationFn: async (newTransaction: ITransactionRequest) => {
      const response = await API.post<ITransaction>(`/${spaceId}/transactions/`, newTransaction);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY] });
    },
  });
};

export const useDeleteTransaction = ({ spaceId }: { spaceId: ISpace['id'] }) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (transactionId: string) => {
      await API.delete(`/${spaceId}/transactions/${transactionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTION_QUERY_KEY, spaceId] });
    },
  });
};
