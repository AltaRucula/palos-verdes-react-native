import { fetchWithAuth } from '@/lib/fetch';
import { getSession } from '@/lib/session';
import { Claim } from '@/types/claims';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useClaims = () =>
    useQuery<Claim[]>({
        queryKey: ['claims'],
        queryFn: async () => {
            const response = await fetchWithAuth('/claims');

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
            const response = await fetchWithAuth(`/claims/${id}`);

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
            const sessionToken = await getSession();

            const response = await fetchWithAuth('/claims', {
                method: 'POST',
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
            const response = await fetchWithAuth(`/claims/${id}/votes`, {
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
            const response = await fetchWithAuth(`/claims/${id}/messages`, {
                method: 'POST',
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
