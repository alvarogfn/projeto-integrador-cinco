import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export function useMediaGranting() {
  const [, requestPermission] = MediaLibrary.usePermissions();

  return async (): Promise<MediaLibrary.PermissionResponse | null> => {
    let response: MediaLibrary.PermissionResponse | null = null;

    try {
      response = await requestPermission();

      if (!response.granted) throw new Error();

      return response;
    } catch (e) {
      Alert.alert(
        'Você precisa concender permissão de mídia!',
        'Sem a permissão de mídia, você não pode adicionar fotos ao seus serviços ou cursos'
      );
    }
    return response;
  };
}
