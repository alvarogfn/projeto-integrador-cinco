import { StyleSheet, View, Alert } from 'react-native';
import React from 'react';
import AppBarEditor from '../../components/AppBarEditor';
import Input from '../../components/Input';
import InputImage from '../../components/InputImage';
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../../Context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { stackNavigation } from '../../utils/types.navigation';
import { courseType, imageDataType } from '../../utils/types';
import ActivityIndicator from '../../components/ActivityIndicator';

export default function CourseEditor() {
  const navigation = useNavigation<stackNavigation>();
  const { utils } = React.useContext(UserContext)!;

  const route: RouteProp<
    { params: { courseId: string | undefined } },
    'params'
  > = useRoute();

  const [id, setId] = React.useState<string | undefined>(() => {
    if (typeof route.params?.courseId === 'string')
      return route.params.courseId;
    return undefined;
  });

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [redirect, setRedirect] = React.useState<string>('');
  const [imageData, setImageData] = React.useState<imageDataType | null>(null);
  const [imageURL, setImageURL] = React.useState<string | null>(null);

  const { course } = React.useContext(UserContext)!;

  React.useEffect(() => {
    async function fetchData() {
      setImageURL(await utils.getDefaultImage());
    }
    if (!id) fetchData();
  });
  React.useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const response = await course.get(id);
          if (response === null) throw new Error();
          setId(response!.id);
          setTitle(response!.title);
          setDescription(response!.description);
          setRedirect(response!.redirect);
          if (typeof response!.img === 'string') setImageURL(response!.img);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log('Um erro aconteceu no CourseEditor', e.toString());
      }
    }
    fetchData();
  }, [route, course]);

  function verifyInputs() {
    if (title.trim() && redirect.trim() && description.trim()) return true;
    return false;
  }

  async function handleSubmit() {
    if (!verifyInputs()) {
      Alert.alert('Preencha os campos obrigatórios!');
      return;
    }

    const form: courseType = {
      title: title,
      description: description,
      redirect: redirect,
      img: imageData ? imageData : imageURL!,
    };

    try {
      if (!id) {
        const courseId = await course.post(form);
        return navigation.push('CourseInfo', { courseId });
      }
      await course.put(form, id);
      return navigation.push('CourseInfo', { courseId: id });
    } catch (err) {
      console.log('an error ocorred in put/push in handlesubmit', err);
    }
  }

  async function handleDelete() {
    try {
      Alert.alert(`Deletar ${title}?`, 'Essa ação é irreversível!!!', [
        { text: 'Não', onPress: () => null, style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await course.delete(id!);
            navigation.popToTop();
          },
          style: 'destructive',
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Alert.alert('Um erro aconteceu', err.toString());
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {id ? (
        <AppBarEditor
          title={'Editando Curso'}
          handleIcon={handleDelete}
          icon={'delete'}
        />
      ) : (
        <AppBarEditor
          title={'Adicionar Novo Curso'}
          handleIcon={handleSubmit}
          icon={'content-save'}
        />
      )}
      <View style={styles.form}>
        <Input
          title={'Título'}
          errorMessage={'Esse campo é obrigatório'}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <Input
          title={'Descrição'}
          errorMessage={'Esse campo é obrigatório'}
          value={description}
          onChangeText={(value) => setDescription(value)}
          numberOfLines={8}
          multiline={true}
        />
        <Input
          title={'Link de Redirecionamento'}
          value={redirect}
          onChangeText={(value) => setRedirect(value)}
          errorMessage={'Esse campo é obrigatório'}
        ></Input>
        {imageURL === null ? (
          <ActivityIndicator />
        ) : (
          <InputImage actualImage={imageURL} onChangeImage={setImageData} />
        )}
      </View>
      <View style={styles.button}>
        <Button onPress={handleSubmit}>{id ? 'Editar' : 'Adicionar'}</Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  form: {
    padding: 5,
    margin: 10,
    flexGrow: 1,
  },
  button: {
    padding: 20,
  },
});
