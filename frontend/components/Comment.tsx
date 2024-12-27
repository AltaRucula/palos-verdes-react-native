import { Card, Text } from 'react-native-paper';
import React from 'react';

export const Comment = ({
  commentId,
  commentContent,
}: {
  commentId: string;
  commentContent: string;
}) => {
  return (
    <Card key={commentId}>
      <Card.Content>
        <Text>{commentContent}</Text>
      </Card.Content>
    </Card>
  );
};