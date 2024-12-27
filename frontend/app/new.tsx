import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { NewClaimScreen } from '@/components/screens/NewClaimScreen';

export default () => {
  return (
    <StackScreenWrapper headerTitle={'New Claim'}>
      <NewClaimScreen />
    </StackScreenWrapper>
  );
};
