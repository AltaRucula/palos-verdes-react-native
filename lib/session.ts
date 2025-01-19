import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'session';

export const deleteSession = () => SecureStore.deleteItemAsync(SESSION_KEY);

export const getSession = () => SecureStore.getItemAsync(SESSION_KEY);

export const setSession = (token: string) => SecureStore.setItemAsync(SESSION_KEY, token);
