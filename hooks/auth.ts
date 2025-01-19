import { API_URL } from '@/lib/env';
import { deleteSession, getSession, setSession } from '@/lib/session';
import { Login, Signup } from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLogin = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (login: Login) => {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login),
            });

            if (response.status !== 200) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            await setSession(data.session);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['session'] });
            onSuccess?.();
        },
    });
};

export const useSignup = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (signup: Signup) => {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signup),
            });

            if (response.status !== 200) {
                throw new Error('Failed to signup');
            }

            const data = await response.json();
            await setSession(data.session);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['session'] });
            onSuccess?.();
        },
    });
};

export const useSession = () => useQuery(['session'], async () => await getSession());

export const useLogout = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await deleteSession();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['session'] });
            onSuccess?.();
        },
    });
};
