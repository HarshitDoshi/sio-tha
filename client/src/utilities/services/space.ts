import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api';
import { AxiosError } from 'axios';
import { ISpace, ISpaceRequest } from '../types';

const SPACE_QUERY_KEY = 'spaces';

// export const useSpaces = () => {
//   return useQuery<ISpace[], AxiosError>({
//     queryKey: [SPACE_QUERY_KEY],
//     queryFn: async () => {
//       const response = await API.get<ISpace[]>('/spaces');
//       return response.data;
//     },
//   });
// };

// export const useSpace = (spaceId: string) => {
//   return useQuery<ISpace, AxiosError>({
//     queryKey: [SPACE_QUERY_KEY, spaceId],
//     queryFn: async () => {
//       const response = await API.get<ISpace>(`/spaces/${spaceId}`);
//       return response.data;
//     },
//     enabled: !!spaceId,
//   });
// };

export const useCreateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation<ISpace, AxiosError, ISpaceRequest>({
    mutationFn: async (newSpace: ISpaceRequest) => {
      const response = await API.post<ISpace>('/spaces/', newSpace);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SPACE_QUERY_KEY] });
    },
  });
};

// export const useDeleteSpace = () => {
//   const queryClient = useQueryClient();

//   return useMutation<void, AxiosError, string>({
//     mutationFn: async (spaceId: string) => {
//       await API.delete(`/spaces/${spaceId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [SPACE_QUERY_KEY] });
//     },
//   });
// };