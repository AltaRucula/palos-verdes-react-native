import { API_URL } from '@/lib/const';
import { Claim } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useClaims = () =>
  useQuery<Claim[]>({
    queryKey: ['claims'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/claims`);
      return await response.json();
    },
  });

export const useClaim = (id: string) =>
  useQuery<Claim>({
    queryKey: ['claim', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/claim/${id}`);
      return await response.json();
    },
  });

export const useCreateClaim = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (claim: Partial<Claim>) => {
      const response = await fetch(`${API_URL}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claim),
      });

      if (response.status !== 200) {
        throw new Error('Failed to post the claim');
      }

      return await response.json();
    },
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['claims'] });
      onSuccess?.();
    },
  });
}

export const useVoteClaim = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (type: 'upvote' | 'downvote') => {
      const response = await fetch(`${API_URL}/claim/${id}/vote/${type}`, {
        method: 'PUT',
      });

      if (response.status !== 200) {
        throw new Error('Failed to send message');
      }

      return await response.json();
    },
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['claim', id] });
      await queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
  });
};

export const useMessage = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch(`${API_URL}/claim/${id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
        }),
      });

      if (response.status !== 200) {
        throw new Error('Failed to send message');
      }

      return await response.json();
    },
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['claim', id] });
    },
  });
};