import { ErrorRetry } from '@/components/ErrorRetry';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Chip,
  HelperText,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useClaim, useMessage, useVoteClaim } from '@/hooks/useClaims';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { COMMENT_MIN_LENGTH, TOAST_DURATION } from '@/lib/const';

export const ClaimScreen = ({ id }: { id: string }) => {
  const theme = useTheme();
  const { data, isLoading, error, refetch } = useClaim(id);

  const {
    mutate: voteClaim,
    status: voteStatus,
    isError: isVoteError,
  } = useVoteClaim(id);

  const {
    mutate: sendMessage,
    status: messageStatus,
    isError: isMessageError,
  } = useMessage(id);

  const [checked, setChecked] = useState(false);
  const [showVoteError, setShowVoteError] = useState(false);

  const [comment, setComment] = useState('');
  const [showCommentSentError, setShowCommentSentError] = useState(false);

  useEffect(() => setShowVoteError(isVoteError), [isVoteError]);
  useEffect(() => setShowCommentSentError(isMessageError), [isMessageError]);

  if (error) {
    return <ErrorRetry refetch={refetch} />;
  }

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (!data) {
    return <Text>Invalid claim</Text>;
  }

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title title={data.title} titleVariant={'titleLarge'} />
        <Card.Content>
          <Text style={styles.text}>{data.content}</Text>
          <Text
            style={{ ...styles.text, color: theme.colors.secondary }}
            variant={'bodySmall'}
          >
            Created{' '}
            {formatDistanceToNow(data.createdAt, {
              addSuffix: true,
            })}{' '}
            by {data.author}
          </Text>
          <Text
            style={{ ...styles.text, color: theme.colors.secondary }}
            variant={'bodySmall'}
          >
            Votes: {data.votes ?? 0}
          </Text>
          <View style={styles.tags}>
            {data.tags.map((tag, index) => (
              <Chip compact key={index} style={styles.tag}>
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
        <Card.Actions>
          <IconButton
            disabled={checked}
            loading={voteStatus === 'loading'}
            icon="thumb-down-outline"
            onPressIn={() => {
              voteClaim('downvote');
              setChecked(true);
            }}
          />
          <IconButton
            disabled={checked}
            loading={voteStatus === 'loading'}
            icon="thumb-up-outline"
            onPressIn={() => {
              voteClaim('upvote');
              setChecked(true);
            }}
          />
          <Snackbar
            visible={showVoteError}
            onDismiss={() => setShowVoteError(false)}
          >
            There was an error voting on this claim. Please try again.
          </Snackbar>
        </Card.Actions>

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
                visible={
                  comment.length > 0 && comment.length < COMMENT_MIN_LENGTH
                }
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
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title='Comments' titleVariant={'titleLarge'} />
        <Card.Content>
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
                {formatDistanceToNow(message.createdAt, {
                  addSuffix: true,
                })}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
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
});
