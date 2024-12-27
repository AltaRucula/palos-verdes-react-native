import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { AboutScreen } from '@/components/screens/AboutScreen';

export default () => {
  return (
    <StackScreenWrapper headerTitle={'About'}>
      <AboutScreen />
    </StackScreenWrapper>
  );
};
