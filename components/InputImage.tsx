import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Card, Colors } from 'react-native-paper';
import { colors } from '../utils/styles';
import TitleLabel from './TitleLabel';
import { useMediaGranting } from '../hooks/useMediaGranting';
import * as ImagePicker from 'expo-image-picker';
import { imageDataType, imageExtension } from '../utils/types';

export default function InputImage({
  actualImage,
  onChangeImage,
  aspectRatio = [1, 1],
}: {
  aspectRatio?: [number, number];
  actualImage: string;
  onChangeImage: (data: imageDataType) => void;
}) {
  const useMedia = useMediaGranting();
  const [newImage, setNewImage] = React.useState<imageDataType | null>(null);

  async function getImage() {
    const status = await useMedia();
    if (!status || !status?.granted) return;

    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: aspectRatio,
      });
      if (response.cancelled) throw new Error();

      const uri = response.uri;

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const ext = uri.substring(uri.lastIndexOf('.') + 1) as imageExtension;

      const file = await (await fetch(response.uri)).blob();
      setNewImage({ file, filename, ext, uri });
    } catch (err: unknown) {
      console.log('an error ocorred in inputimage getimage', err);
    }
  }

  React.useEffect(() => {
    onChangeImage(newImage!);
  }, [newImage]);

  return (
    <View style={styles.container}>
      <TitleLabel title={'Imagem'} />
      <Card elevation={2} style={styles.card}>
        <Card.Cover
          style={styles.cardImagem}
          source={{
            uri: newImage === null ? actualImage : newImage.uri,
          }}
        ></Card.Cover>
        <Button
          mode="contained"
          style={styles.cardButton}
          color={colors.primary}
          labelStyle={{ color: Colors.white }}
          onPress={getImage}
        >
          Editar
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    marginTop: 15,
    position: 'relative',
    borderColor: colors.primary,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  cardImagem: {
    height: 300,
    margin: 5,
  },
  cardButton: {
    width: 150,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    padding: 30,
    fontSize: 15,
  },
});
