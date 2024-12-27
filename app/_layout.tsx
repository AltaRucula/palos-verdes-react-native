import { Stack } from 'expo-router';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from '@/lib/theme';
import { useState } from 'react';
import { ColorSchemeProvider } from '@/contexts/ColorSchemeProvider';

const queryClient = new QueryClient();

export default () => {
    const [colorScheme, setColorScheme] = useState<'dark' | 'light'>(useColorScheme() ?? 'dark');

    const paperTheme =
        colorScheme === 'dark'
            ? { ...MD3DarkTheme, colors: darkTheme.colors }
            : { ...MD3LightTheme, colors: lightTheme.colors };

    return (
        <View style={styles.container}>
            {/* Status bar color should be in-sync with the StackScreen component (specifically the headerStyle) */}
            <StatusBar
                backgroundColor={
                    colorScheme === 'dark' ? darkTheme.colors.primaryContainer : lightTheme.colors.primaryContainer
                }
                barStyle="default"
            />
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider value={{ colorScheme, setColorScheme }}>
                    <PaperProvider theme={paperTheme}>
                        <Stack />
                    </PaperProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
