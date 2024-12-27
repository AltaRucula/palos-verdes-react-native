import { ClaimScreen } from '@/components/screens/ClaimScreen';
import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { useLocalSearchParams } from 'expo-router';

export default () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <StackScreenWrapper headerTitle={'Claim details'}>
      <ClaimScreen id={id} />
    </StackScreenWrapper>
  );
};
