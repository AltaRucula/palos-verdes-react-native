import { useColorScheme } from '@/contexts/ColorSchemeProvider';
import React from 'react';
import { IconButton } from 'react-native-paper';

export const ChangeThemeButton = () => {
    const { colorScheme, setColorScheme } = useColorScheme();

    return (
        <IconButton
            key="changeThemeButton"
            icon={colorScheme === 'dark' ? 'weather-night' : 'weather-sunny'}
            onPressIn={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        />
    );
};
