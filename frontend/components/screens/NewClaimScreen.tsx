import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Snackbar, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Claim } from '@/lib/types';
import { TAGS, TOAST_DURATION } from '@/lib/const';
import { useCreateClaim } from '@/hooks/useClaims';
import { router } from 'expo-router';

export const NewClaimScreen = () => {
  const [claim, setClaim] = useState<Partial<Claim>>({});
  const { mutate, isLoading, isError, error, failureReason } = useCreateClaim(() => router.push('/'));
  const [showError, setShowError] = useState(false);

  useEffect(() => setShowError(isError), [isError]);

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title titleVariant={'headlineSmall'} title="New Claim" />
        <Card.Content>
          <TextInput
            label="Title"
            value={claim?.title}
            onChangeText={(text) =>
              setClaim({
                ...claim,
                title: text,
              })
            }
            style={styles.textInput}
          />
          <TextInput
            label="Content"
            value={claim?.content}
            onChangeText={(text) =>
              setClaim({
                ...claim,
                content: text,
              })
            }
            style={styles.textInput}
          />
          <TextInput
            label="Author"
            value={claim?.author}
            onChangeText={(text) =>
              setClaim({
                ...claim,
                author: text,
              })
            }
            style={styles.textInput}
          />

          <View style={styles.tags}>
            {TAGS.map((tag, index) => (
              <Chip
                compact
                key={index}
                style={styles.tag}
                selected={claim?.tags?.includes(tag)}
                showSelectedOverlay={true}
                showSelectedCheck={true}
                onPress={() => {
                  if (claim?.tags?.includes(tag)) {
                    setClaim({
                      ...claim,
                      tags: claim?.tags?.filter((t) => t !== tag),
                    });
                  } else {
                    setClaim({
                      ...claim,
                      tags: [...(claim?.tags || []), tag],
                    });
                  }
                }}
              >
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            loading={isLoading}
            onPress={() => {
              mutate(claim);
            }}
          >
            Save
          </Button>
        </Card.Actions>
        <Snackbar
          duration={TOAST_DURATION}
          visible={showError}
          onDismiss={() => setShowError(false)}
        >
          There was an error posting this claim. Please try again.
        </Snackbar>
      </Card>
    </ScrollView>
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 10,
    marginVertical: 15,
  },
});
