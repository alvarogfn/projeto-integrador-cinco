import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Masks } from 'react-native-mask-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input';
import AppBarEditor from '../../components/AppBarEditor';
import InputImage from '../../components/InputImage';
import Button from '../../components/Button';
import { UserContext } from '../../Context';
import ActivityIndicator from '../../components/ActivityIndicator';
import { HelperText } from 'react-native-paper';
import { imageDataType, serviceType } from '../../utils/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { stackNavigation } from '../../utils/types.navigation';
import { useMask } from '../../hooks/useMask';

export default function ServiceEditor() {
  const navigation = useNavigation<stackNavigation>();

  const route: RouteProp<
    { params: { serviceId: string | undefined } },
    'params'
  > = useRoute();

  const { service, utils } = React.useContext(UserContext)!;
  const [isLoading, setLoading] = React.useState(true);

  const [id, setId] = React.useState<string | undefined>(() => {
    if (typeof route.params?.serviceId === 'string')
      return route.params.serviceId;
    return undefined;
  });

  const [name, setName] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [imageData, setImageData] = React.useState<imageDataType | null>(null);
  const [imageURL, setImageURL] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setImageURL(await utils.getDefaultImage());
    }
    if (!id) fetchData();
  });

  React.useEffect(() => {
    async function fetchData() {
      if (id)
        try {
          setLoading(true);
          const response = await service.get(id);
          if (response === null) throw new Error();
          setId(response.id);
          setName(response.name);
          setDescription(response.description);
          setPrice(useMask(Masks.BRL_CURRENCY, response.price).masked);
          setPhone(useMask(Masks.BRL_PHONE, response.phone).masked);
          if (typeof response.img === 'string') setImageURL(response.img);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(
            'an error ocorred in serviceeditor useEffect load data',
            err
          );
        } finally {
          setLoading(false);
        }
      setLoading(false);
    }
    fetchData();
  }, [
    route,
    setName,
    setPhone,
    setPrice,
    setDescription,
    setId,
    useMask,
    setLoading,
  ]);

  function verifyInputs() {
    if (name.trim() && phone.trim() && description.trim() && price.trim())
      return true;
    return false;
  }

  async function handleSubmit() {
    if (!verifyInputs()) {
      Alert.alert('Preencha os campos obrigatórios!');
      return;
    }

    const form: serviceType = {
      name: name,
      description: description,
      price: useMask(Masks.BRL_CURRENCY, price).unmasked,
      phone: useMask(Masks.BRL_PHONE, phone).unmasked,
      img: imageData ? imageData : imageURL!,
    };

    try {
      if (!id) {
        const serviceId = await service.post(form);
        return navigation.push('ServiceInfo', { serviceId });
      }
      await service.put(form, id);
      return navigation.push('ServiceInfo', { serviceId: id });
    } catch (err) {
      console.log('an error ocorred in put/push in handlesubmit', err);
    }
  }

  async function handleDelete() {
    try {
      Alert.alert(`Deletar ${name}?`, 'Essa ação é irreversível!!!', [
        { text: 'Não', onPress: () => null, style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            if (id) await service.delete(id);
            navigation.popToTop();
          },
          style: 'destructive',
        },
      ]);
    } catch (e) {
      console.log('an error ocorred in delete button on serviceEditor');
    }
  }

  return (
    <React.Fragment>
      {id ? (
        <AppBarEditor
          title={'Editando Produto'}
          icon={'delete'}
          handleIcon={handleDelete}
        />
      ) : (
        <AppBarEditor
          title={'Novo serviço'}
          icon={'content-save'}
          handleIcon={handleSubmit}
        />
      )}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <KeyboardAwareScrollView style={styles.container}>
          <Input
            title={'Nome'}
            value={name}
            errorMessage="Campo obrigatório"
            onChangeText={(text: string) => setName(text)}
          />
          <Input
            title="Descrição"
            value={description}
            errorMessage="Campo obrigatório"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={6}
          />
          <Input
            title="Preço"
            placeholder="R$ 0,00"
            value={price}
            errorMessage="Campo obrigatório"
            onChangeText={(text) => setPrice(text)}
            mask={Masks.BRL_CURRENCY}
            icon={'currency-brl'}
          />
          {imageURL === null ? (
            <ActivityIndicator />
          ) : (
            <InputImage actualImage={imageURL} onChangeImage={setImageData} />
          )}
          <Input
            title="Número"
            placeholder="(00) 00000-0000"
            errorMessage="Campo obrigatório"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            mask={Masks.BRL_PHONE}
            icon={'phone'}
          />
          <HelperText type="info" style={{ marginTop: -20, marginLeft: -10 }}>
            Os seus clientes serão encaminhados para esse número no whatsapp.
          </HelperText>
          <View style={styles.button}>
            <Button onPress={handleSubmit}>{id ? 'Editar' : 'Salvar'}</Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    margin: 30,
  },
});
