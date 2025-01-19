import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useSignup } from '@/hooks/auth';
import { TOAST_DURATION } from '@/lib/const';
import { Signup } from '@/types/auth';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Snackbar, TextInput } from 'react-native-paper';

export default () => {
    const [signup, setSignup] = useState<Signup>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const { mutate, isLoading, isError } = useSignup(() => router.push('/claims'));
    const [showError, setShowError] = useState(false);

    useEffect(() => setShowError(isError), [isError]);

    return (
        <StackScreenWrapper headerTitle={'Signup'}>
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Content>
                        <TextInput
                            label="First Name"
                            value={signup?.firstName}
                            onChangeText={(firstName) =>
                                setSignup({
                                    ...signup,
                                    firstName,
                                })
                            }
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Last Name"
                            value={signup?.lastName}
                            onChangeText={(lastName) =>
                                setSignup({
                                    ...signup,
                                    lastName,
                                })
                            }
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Email"
                            value={signup?.email}
                            onChangeText={(email) =>
                                setSignup({
                                    ...signup,
                                    email,
                                })
                            }
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Password"
                            value={signup?.password}
                            onChangeText={(password) =>
                                setSignup({
                                    ...signup,
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
                                mutate(signup);
                            }}
                        >
                            Signup
                        </Button>
                    </Card.Actions>
                    <Snackbar
                        duration={TOAST_DURATION}
                        visible={showError}
                        onDismiss={() => setShowError(false)}
                    >
                        There was an error with the signup. Please try again.
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
