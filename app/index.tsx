import { ErrorRetry } from '@/components/ErrorRetry';
import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useSession } from '@/hooks/auth';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Page = () => {
    const {
        data: session,
        isLoading: isSessionLoading,
        isError: isSessionError,
        refetch: sessionRefetch,
    } = useSession();

    const getSessionContent = () => {
        if (isSessionLoading) {
            return <ActivityIndicator size={'large'} />;
        }
        if (isSessionError) {
            return <ErrorRetry refetch={sessionRefetch} />;
        }
        if (session) {
            return (
                <Link
                    asChild
                    style={styles.sessionContent}
                    href="/claims"
                >
                    <Button>Go to Claims</Button>
                </Link>
            );
        }

        return (
            <Link
                asChild
                style={styles.sessionContent}
                href="/auth/login"
            >
                <Button>Login</Button>
            </Link>
        );
    };

    return (
        <StackScreenWrapper headerTitle="Palos Verdes">
            <ScrollView>
                <Text
                    style={styles.paragraph}
                    variant="bodyLarge"
                >
                    This is a project to help the community of Palos Verdes so people can leverage their complains
                    through the power of votes.
                </Text>

                <Text
                    style={styles.paragraph}
                    variant="bodyLarge"
                >
                    People can create claims and vote for them. The claims with more votes will be displayed first.
                </Text>

                <Text
                    style={styles.paragraph}
                    variant="bodyLarge"
                >
                    This application is built with React Native and Expo. For any questions or suggestions, please
                    contact me at
                    <Text>
                        {' '}
                        <Link href="mailto:zfngomez@gmail.com">zfngomez@gmail.com</Link>
                    </Text>
                </Text>

                {getSessionContent()}
            </ScrollView>
        </StackScreenWrapper>
    );
};

const styles = StyleSheet.create({
    sessionContent: {
        marginTop: 36,
    },
    paragraph: {
        marginVertical: 12,
    },
});

export default Page;
