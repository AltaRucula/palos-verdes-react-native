import { API_URL } from '@/lib/env';
import { Claim } from '@/types/claims';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useClaims = () =>
    useQuery<Claim[]>({
        queryKey: ['claims'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/claims`);

            if (response.status !== 200) {
                throw new Error('Failed to get claims');
            }

            return await response.json();
        },
    });

export const useClaim = (id: string) =>
    useQuery<Claim>({
        queryKey: ['claim', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/claims/${id}`);

            if (response.status !== 200) {
                throw new Error('Failed to get claim');
            }

            return await response.json();
        },
    });

export const useCreateClaim = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (claim: Partial<Claim>) => {
            const response = await fetch(`${API_URL}/claims`, {
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
};

export const useVoteClaim = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/claims/${id}/votes`, {
                method: 'POST',
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
            const response = await fetch(`${API_URL}/claims/${id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: message,
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
