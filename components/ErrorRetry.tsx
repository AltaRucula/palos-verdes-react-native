import { Button, View } from 'react-native';
import { Text } from 'react-native-paper';

export const ErrorRetry = ({ refetch }: { refetch: () => void }) => {
    return (
        <View>
            <Text>There was an error, please refresh the page</Text>
            <Button
                onPress={() => refetch()}
                title="Retry"
            />
        </View>
    );
};
