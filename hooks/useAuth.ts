import { API_URL } from '@/lib/env';
import { Login } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = (onSuccess?: () => void) => {
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
        },
        onSuccess: async () => {
            onSuccess?.();
        },
    });
};
