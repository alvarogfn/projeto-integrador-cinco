import { View } from 'react-native';
import React from 'react';
import { ActivityIndicator as PaperIndicator } from 'react-native-paper';
import colors from '../utils/colors';

export default function ActivityIndicator() {
  return (
    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
      <PaperIndicator size={70} color={colors.pink} />
    </View>
  );
}
