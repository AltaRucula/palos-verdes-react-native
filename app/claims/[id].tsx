import { ErrorRetry } from '@/components/ErrorRetry';
import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useClaim, useMessage, useVoteClaim } from '@/hooks/claims';
import { COMMENT_MIN_LENGTH, TOAST_DURATION } from '@/lib/const';
import { formatDistanceToNow } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, HelperText, IconButton, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';

const Page = () => {
    const theme = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading, isError, refetch } = useClaim(id);
    
    const { mutate: voteClaim, status: voteStatus, isError: isVoteError } = useVoteClaim(id);

    const { mutate: sendMessage, status: messageStatus, isError: isMessageError } = useMessage(id);

    const [checked, setChecked] = useState(false);
    const [showVoteError, setShowVoteError] = useState(false);

    const [comment, setComment] = useState('');
    const [showCommentSentError, setShowCommentSentError] = useState(false);

    useEffect(() => setShowVoteError(isVoteError), [isVoteError]);
    useEffect(() => setShowCommentSentError(isMessageError), [isMessageError]);

    const getContent = () => {
        if (isLoading) {
            return <ActivityIndicator size={'large'} />;
        }

        if (isError || !data) {
            return <ErrorRetry refetch={refetch} />;
        }

        return (
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Title
                        title={data.title}
                        titleVariant={'titleLarge'}
                    />
                    <Card.Content>
                        <Text style={styles.text}>{data.content}</Text>
                        <View style={styles.voteContainer}>
                            <Text
                                style={{ ...styles.text, color: theme.colors.secondary }}
                                variant={'bodySmall'}
                            >
                                Votes: {data.votes.length ?? 0}
                            </Text>
                            <IconButton
                                disabled={checked || data.hasVoted}
                                loading={voteStatus === 'loading'}
                                icon="thumb-up-outline"
                                onPressIn={() => {
                                    voteClaim();
                                    setChecked(true);
                                }}
                            />
                            <Snackbar
                                visible={showVoteError}
                                onDismiss={() => setShowVoteError(false)}
                            >
                                There was an error voting on this claim. Please try again.
                            </Snackbar>
                        </View>
                        <Text
                            style={{ ...styles.text, color: theme.colors.secondary }}
                            variant={'bodySmall'}
                        >
                            {`Created ${formatDistanceToNow(data.createdAt, {
                                addSuffix: true,
                            })} by ${data.author.firstName}`}
                        </Text>
                        <View style={styles.tags}>
                            {data.tags.map((tag, index) => (
                                <Chip
                                    compact
                                    key={index}
                                    style={styles.tag}
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Title
                        title="Messages"
                        titleVariant={'titleLarge'}
                    />
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <TextInput
                                    disabled={messageStatus === 'loading'}
                                    multiline
                                    label="Leave a comment"
                                    onChangeText={(comment) => setComment(comment)}
                                    value={comment}
                                />
                                <HelperText
                                    type="error"
                                    visible={comment.length > 0 && comment.length < COMMENT_MIN_LENGTH}
                                    onPressIn={() => sendMessage(comment)}
                                >
                                    {`Comments should have at least ${COMMENT_MIN_LENGTH} characters`}
                                </HelperText>
                            </View>
                            <IconButton
                                disabled={comment.length < COMMENT_MIN_LENGTH}
                                loading={messageStatus === 'loading'}
                                icon={'send'}
                                onPressIn={() => {
                                    sendMessage(comment);
                                    setComment('');
                                }}
                            />
                        </View>
                        <Snackbar
                            duration={TOAST_DURATION}
                            visible={showCommentSentError}
                            onDismiss={() => setShowCommentSentError(false)}
                        >
                            There was an error sending this comment. Please try again.
                        </Snackbar>

                        {data.messages.map((message, index) => (
                            <View
                                key={index}
                                style={{
                                    marginVertical: 10,
                                }}
                            >
                                <Text>{message.content}</Text>
                                <Text
                                    style={{
                                        color: theme.colors.secondary,
                                    }}
                                    variant={'bodySmall'}
                                >
                                    {`Created ${formatDistanceToNow(message.createdAt, {
                                        addSuffix: true,
                                    })} by ${message.author.firstName}`}
                                </Text>
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    };

    return <StackScreenWrapper headerTitle={'Claim details'}>{getContent()}</StackScreenWrapper>;
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        paddingVertical: 20,
    },
    tags: {
        flexDirection: 'row',
    },
    tag: {
        marginRight: 10,
        marginVertical: 15,
    },
    text: {
        marginVertical: 10,
    },
    voteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Page;
