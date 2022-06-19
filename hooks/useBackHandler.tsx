import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { stackNavigation } from '../utils/types.navigation';

export default function useBackHandler() {
  const navigation = useNavigation<stackNavigation>();
  useFocusEffect(() => {
    const onBackPress = () => {
      navigation.popToTop();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });
}
