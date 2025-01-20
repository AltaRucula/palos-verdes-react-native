import { ColorSchemeProvider } from '@/contexts/ColorSchemeProvider';
import { darkTheme, lightTheme } from '@/lib/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import '../globals.css';

const queryClient = new QueryClient();

const Layout = () => {
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

            <ColorSchemeProvider value={{ colorScheme, setColorScheme }}>
                {/* PaperProvider will also use SafeAreaInsetsContext so we don't need to */}
                <PaperProvider theme={paperTheme}>
                    <QueryClientProvider client={queryClient}>
                        <Stack />
                    </QueryClientProvider>
                </PaperProvider>
            </ColorSchemeProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;
