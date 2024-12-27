import React, { createContext } from 'react';

type ContextType = {
    colorScheme: 'dark' | 'light';
    setColorScheme: (colorScheme: 'dark' | 'light') => void;
};

const Context = createContext({
    colorScheme: 'dark',
    setColorScheme: (colorScheme: 'dark' | 'light') => {},
});

export const ColorSchemeProvider = ({ children, value }: { children: React.ReactNode; value: ContextType }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useColorSchemeContext = () => React.useContext(Context);
