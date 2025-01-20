import { API_URL } from '@/lib/env';
import { getSession } from '@/lib/session';

export const fetchWithAuth = async (path: string, options: RequestInit = {}): Promise<Response> => {
    const sessionToken = await getSession();

    return await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `${sessionToken}`,
            'Content-Type': 'application/json',
        },
    });
};
