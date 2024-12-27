import { Pressable, ScrollView, View } from 'react-native';
import { Card, Divider, SegmentedButtons, Text } from 'react-native-paper';
import { useColorSchemeContext } from '@/contexts/ColorSchemeProvider';
import { router } from 'expo-router';

export const SettingsScreen = () => {
  const { colorScheme, setColorScheme } = useColorSchemeContext();

  return (
    <ScrollView>
      <Card>
        <Card.Title titleVariant={'headlineSmall'} title="Preferences" />
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text>Theme</Text>
            <SegmentedButtons
              style={{ marginLeft: 'auto', width: 200 }}
              value={colorScheme}
              onValueChange={(value) =>
                setColorScheme(value as 'dark' | 'light')
              }
              buttons={[
                {
                  value: 'dark',
                  label: 'Dark',
                  icon: 'brightness-4',
                },
                {
                  value: 'light',
                  label: 'Light',
                  icon: 'brightness-6',
                },
              ]}
            />
          </View>
        </Card.Content>

        <Divider style={{ marginVertical: 30 }} />

        <Card.Title titleVariant={'headlineSmall'} title="Help" />
        <Card.Content>
          <Pressable onPressIn={() => router.push('/about')}>
            <Text>About</Text>
          </Pressable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};
