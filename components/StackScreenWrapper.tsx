import { ChangeThemeButton } from '@/components/ChangeThemeButton';
import { ErrorRetry } from '@/components/ErrorRetry';
import { useLogout, useSession } from '@/hooks/auth';
import { router, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

export const StackScreenWrapper = ({
    children,
    headerTitle,
    headerRight,
}: {
    children: React.ReactNode;
    headerTitle: string;
    headerRight?: React.ReactNode[];
}) => {
    const theme = useTheme();
    const {
        data: session,
        isLoading: isSessionLoading,
        isError: isSessionError,
        refetch: sessionRefetch,
    } = useSession();
    const {
        mutate: logoutSession,
        isLoading: isLogoutSessionLoading,
        isError: isLogoutSessionError,
    } = useLogout(() => router.push('/'));

    const getSessionButton = () => {
        if (isSessionLoading) {
            return <ActivityIndicator size={'large'} />;
        }
        if (isSessionError) {
            return <ErrorRetry refetch={sessionRefetch} />;
        }
        if (session) {
            return (
                <IconButton
                    key="logout"
                    icon="logout"
                    onPressIn={() => logoutSession()}
                />
            );
        } else {
            return (
                <IconButton
                    key="login"
                    icon="login"
                    onPressIn={() => router.push('/auth/login')}
                />
            );
        }
    };

    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: theme.colors.primaryContainer,
                    },
                    headerTintColor: theme.colors.onSecondaryContainer,
                    headerTitle,
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            {headerRight?.map((icon) => icon)}
                            {getSessionButton()}
                            <ChangeThemeButton />
                        </View>
                    ),
                }}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    headerRightContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
