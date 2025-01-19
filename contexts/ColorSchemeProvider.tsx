import { createContext, ReactNode, useContext } from 'react';

type ContextType = {
    colorScheme: 'dark' | 'light';
    setColorScheme: (colorScheme: 'dark' | 'light') => void;
};

const Context = createContext<ContextType>({
    colorScheme: 'dark',
    setColorScheme: (colorScheme: 'dark' | 'light') => {},
});

export const ColorSchemeProvider = ({ children, value }: { children: ReactNode; value: ContextType }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useColorScheme = () => useContext(Context);
