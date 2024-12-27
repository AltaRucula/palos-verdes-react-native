import { ChangeThemeButton } from '@/components/ChangeThemeButton';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

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
