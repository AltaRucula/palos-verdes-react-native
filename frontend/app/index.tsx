import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import React from 'react';
import { ClaimsScreen } from '@/components/screens/ClaimsScreen';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

export default () => {
  return (
    <StackScreenWrapper
      headerTitle="Palos Verdes Claims"
      headerRightExtraIcons={[
        <IconButton
          key="new-btn"
          icon="plus-box"
          onPressIn={() => router.push('/new')}
        />,
      ]}
    >
      <ClaimsScreen />
    </StackScreenWrapper>
  );
};
