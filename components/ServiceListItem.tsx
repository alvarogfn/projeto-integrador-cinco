import { StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Card, IconButton, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/styles';
import { serviceType } from '../utils/types';
import { stackNavigation } from '../utils/types.navigation';

export default function ServiceListItem({ item }: { item: serviceType }) {
  const navigation = useNavigation<stackNavigation>();

  return (
    <Card elevation={1} style={styles.container}>
      <List.Item
        onPress={() => navigation.push('ServiceInfo', { serviceId: item.id })}
        right={() => (
          <IconButton
            size={35}
            icon="square-edit-outline"
            color={styles.label.color}
            onPress={() => {
              navigation.push('ServiceEditor', { serviceId: item.id });
            }}
          />
        )}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={58}
            style={styles.avatar}
            theme={{ colors: { primary: styles.label.color } }}
            source={{
              uri: item.img,
            }}
          />
        )}
        title={item.name}
        titleStyle={styles.label}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 5,
  },
  label: {
    color: colors.primary,
    fontWeight: '900',
  },
  avatar: {
    alignSelf: 'center',
    marginRight: 20,
  },
});
