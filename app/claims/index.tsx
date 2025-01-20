import { ErrorRetry } from '@/components/ErrorRetry';
import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useClaims } from '@/hooks/claims';
import { formatDistanceToNow } from 'date-fns';
import { Link, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, Text } from 'react-native-paper';

export default () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading, isError, refetch } = useClaims();

    const getContent = () => {
        if (isLoading) {
            return <ActivityIndicator size={'large'} />;
        }

        if (isError || !data) {
            return <ErrorRetry refetch={refetch} />;
        }

        if (!data?.length) {
            return (
                <View>
                    <Text>No claims found</Text>
                    <Button
                        onPress={() => refetch()}
                        title="Retry"
                    />
                </View>
            );
        }

        return (
            <FlatList
                data={data}
                keyExtractor={(claim) => claim.id}
                renderItem={({ item }) => (
                    <Link
                        key={item.id}
                        asChild
                        href={`/claims/${item.id}`}
                    >
                        <Pressable>
                            <Card style={styles.card}>
                                <Card.Title
                                    title={item.title}
                                    titleNumberOfLines={3}
                                    titleVariant={'titleLarge'}
                                    subtitle={
                                        <View>
                                            <Text>
                                                {`Created ${formatDistanceToNow(item.createdAt, {
                                                    addSuffix: true,
                                                })}`}
                                            </Text>
                                            <View style={styles.chipsContainer}>
                                                {item.tags.map((tag, index) => (
                                                    <Chip
                                                        compact
                                                        key={index}
                                                        style={styles.chip}
                                                    >
                                                        {tag}
                                                    </Chip>
                                                ))}
                                            </View>
                                        </View>
                                    }
                                />
                            </Card>
                        </Pressable>
                    </Link>
                )}
            />
        );
    };

    return (
        <StackScreenWrapper
            headerTitle={'Claims'}
            headerRight={[
                <IconButton
                    key="new-btn"
                    icon="plus-box"
                    onPressIn={() => router.push('/claims/new')}
                />,
            ]}
        >
            {getContent()}
        </StackScreenWrapper>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        paddingVertical: 16,
    },
    cardAvatar: {
        marginRight: 16,
        marginBottom: 36,
    },
    cardTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitleText: {
        marginLeft: 10,
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chip: {
        marginTop: 10,
        marginRight: 5,
    },
});
