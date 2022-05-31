import { StyleSheet, View, Alert } from 'react-native';
import React from 'react';
import AppBarEditor from '../../components/AppBarEditor';
import Input from '../../components/Input';
import InputImage from '../../components/InputImage';
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../../Context';
import { faker } from '@faker-js/faker';

export default function CourseEditor({ navigation, route }) {
  const [form, setForm] = React.useState({});
  const { course } = React.useContext(UserContext);

  React.useEffect(() => {
    const id = route?.params?.courseId;
    if (id)
      course.get(id).then(
        (r) => setForm((state) => Object.assign({}, r)),
        (err) => Alert.alert('Um erro aconteceu', err.toString())
      );
  }, [route, setForm]);

  function handleForm(object) {
    setForm((state) => Object.assign({}, state, object));
  }

  function checkForm() {
    const { title, description, redirect } = form;
    if (!title || !description || !redirect) {
      if (!title) handleForm({ title: '' });
      if (!description) handleForm({ description: '' });
      if (!redirect) handleForm({ redirect: '' });
      Alert.alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      form.id
        ? `Editar o curso ${form.title}?`
        : `Adicionar o curso ${form.title}?`,
      '',
      [
        {
          text: 'Não',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: handleSubmit,
        },
      ]
    );
  }

  async function handleSubmit() {
    try {
      let courseId;
      if (form.id) {
        courseId = await course.put(form, form.id);
      } else {
        courseId = await course.post({
          ...form,
          img: faker.image.business(undefined, undefined, true),
        });
      }
      navigation.push('CourseInfo', { courseId: courseId });
    } catch (e) {
      Alert.alert('Um erro aconteceu', err.toString());
    }
  }

  async function handleDelete() {
    try {
      Alert.alert(`Deletar ${form.title}?`, 'Essa ação é irreversível!!!', [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await course.delete(form.id);
            navigation.popToTop();
          },
          style: 'destructive',
        },
      ]);
    } catch (e) {
      Alert.alert('Um erro aconteceu', e.toString());
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {form.id ? (
        <AppBarEditor
          title={'Editando Curso'}
          handleIcon={handleDelete}
          icon={'delete'}
        />
      ) : (
        <AppBarEditor
          title={'Adicionar Novo Curso'}
          handleIcon={checkForm}
          icon={'content-save'}
        />
      )}
      <View style={styles.form}>
        <Input
          title={'Título'}
          isError={form.title === ''}
          errorMessage={'Esse campo é obrigatório'}
          value={form.title}
          onChangeText={(value) => handleForm({ title: value })}
        />
        <Input
          title={'Descrição'}
          isError={form.description === ''}
          errorMessage={'Esse campo é obrigatório'}
          value={form.description}
          onChangeText={(value) => handleForm({ description: value })}
          numberOfLines={8}
          multiline={true}
        />
        <Input
          title={'Link de Redirecionamento'}
          isError={form.redirect === ''}
          value={form.redirect}
          errorMessage={'Esse campo é obrigatório'}
          onChangeText={(value) => handleForm({ redirect: value })}
        ></Input>
        <InputImage onPress={() => {}} />
      </View>
      <View style={styles.button}>
        <Button onPress={checkForm} mode={'contained'}>
          {form.id ? 'Editar' : 'Adicionar'}
        </Button>
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
