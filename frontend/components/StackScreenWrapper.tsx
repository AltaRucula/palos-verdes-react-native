import { router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import React from 'react';

export const StackScreenWrapper = ({
  children,
  headerTitle,
  headerRightExtraIcons,
}: {
  children: React.ReactNode;
  headerTitle: string;
  headerRightExtraIcons?: React.ReactNode[];
}) => {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
          headerTintColor: theme.colors.onSecondaryContainer,
          headerTitle,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              {headerRightExtraIcons?.map((icon) => icon)}
              <IconButton
                icon="cog-outline"
                onPressIn={() => router.push('/settings')}
              />
            </View>
          ),
        }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  headerRightContainer: {
    flexDirection: 'row',
  }
});
