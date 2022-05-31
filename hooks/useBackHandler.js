import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export default function useBackHandler() {
  const navigation = useNavigation();
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
