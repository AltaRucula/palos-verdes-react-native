import { StackScreenWrapper } from '@/components/StackScreenWrapper';
import { SettingsScreen } from '@/components/screens/SettingsScreen';

export default () => {
  return (
    <StackScreenWrapper headerTitle={'Settings'}>
      <SettingsScreen />
    </StackScreenWrapper>
  );
};
