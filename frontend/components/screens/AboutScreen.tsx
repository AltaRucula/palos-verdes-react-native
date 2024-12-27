import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';

export const AboutScreen = () => {
  return (
    <ScrollView>
      <Text variant="bodyLarge">
        This is a project to help the community of Palos Verdes so people can
        leverage their complains through the power of votes.
      </Text>

      <Text variant="bodyLarge">
        People can create claims and vote for them. The claims with more votes
        will be displayed first.
      </Text>

      <Text variant="bodyLarge">
        This application is built with React Native and Expo. For any questions
        or suggestions, please contact me at
        <Text>
          {' '}
          <Link href="mailto:zfngomez@gmail.com">zfngomez@gmail.com</Link>
        </Text>
      </Text>
    </ScrollView>
  );
};