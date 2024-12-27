import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { Link, router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

export default () => {
    return (
        <StackScreenWrapper
            headerTitle="Palos Verdes"
            headerRight={[
                <IconButton
                    key="login"
                    icon="login"
                    onPressIn={() => router.push('/auth/login')}
                />,
                <IconButton
                    key="new-btn"
                    icon="plus-box"
                    onPressIn={() => router.push('/claims')}
                />,
            ]}
        >
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

                <Link
                    asChild
                    style={styles.goToClaims}
                    href="/claims"
                >
                    <Button>Go to Claims</Button>
                </Link>
            </ScrollView>
        </StackScreenWrapper>
    );
};

const styles = StyleSheet.create({
    goToClaims: {
        marginTop: 36,
    },
    paragraph: {
        marginVertical: 12,
    },
});
