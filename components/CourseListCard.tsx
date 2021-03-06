import { StyleSheet } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { courseType } from '../utils/types';
import { stackNavigation } from '../utils/types.navigation';

export default function CourseListCard({ data }: { data: courseType }) {
  const navigation = useNavigation<stackNavigation>();
  return (
    <Card
      elevation={2}
      style={styles.container}
      onPress={() => {
        navigation.push('CourseInfo', { courseId: data.id });
      }}
    >
      <Card.Cover source={{ uri: data.img as string }} />
      <Card.Content>
        <Card.Title
          title={data.title}
          subtitle={data.description.substring(0, 40)}
        />
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          icon={'archive-edit'}
          onPress={() => navigation.push('CourseEditor', { courseId: data.id })}
        >
          Editar
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    padding: 15,
  },
});
