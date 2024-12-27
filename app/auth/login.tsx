import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useLogin } from '@/hooks/useAuth';
import { TOAST_DURATION } from '@/lib/const';
import { Login } from '@/types/auth';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Snackbar, TextInput } from 'react-native-paper';

export default () => {
    const [login, setLogin] = useState<Login>({
        email: '',
        password: '',
    });
    const { mutate, isLoading, isError, error, failureReason } = useLogin(() => router.push('/claims'));
    const [showError, setShowError] = useState(false);

    useEffect(() => setShowError(isError), [isError]);

    return (
        <StackScreenWrapper headerTitle={'Login'}>
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Content>
                        <TextInput
                            label="Email"
                            value={login?.email}
                            onChangeText={(email) =>
                                setLogin({
                                    ...login,
                                    email,
                                })
                            }
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Password"
                            value={login?.password}
                            onChangeText={(password) =>
                                setLogin({
                                    ...login,
                                    password,
                                })
                            }
                            style={styles.textInput}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            loading={isLoading}
                            onPress={() => {
                                mutate(login);
                            }}
                        >
                            Login
                        </Button>
                    </Card.Actions>
                    <Snackbar
                        duration={TOAST_DURATION}
                        visible={showError}
                        onDismiss={() => setShowError(false)}
                    >
                        There was an error with the login. Please try again.
                    </Snackbar>
                </Card>
            </ScrollView>
        </StackScreenWrapper>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        paddingVertical: 20,
    },
    textInput: {
        marginVertical: 15,
    },
});
