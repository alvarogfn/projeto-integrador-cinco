import { initializeApp } from 'firebase/app';
import * as storage from 'firebase/storage';
import * as database from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCGtGBuS2VufhN5sX0rdx-hBLRO0lgHr4k',
  authDomain: 'projeto-integrador-5.firebaseapp.com',
  databaseURL: 'https://projeto-integrador-5-default-rtdb.firebaseio.com',
  projectId: 'projeto-integrador-5',
  storageBucket: 'projeto-integrador-5.appspot.com',
  messagingSenderId: '121299791288',
  appId: '1:121299791288:web:59928b6282afefd1ac734d',
  measurementId: 'G-WLKV6FVCB8',
};

export const app = initializeApp(firebaseConfig);

export const Realtime = () => {
  const databaseInstance = database.getDatabase(app);
  return {
    get: (path: string) => {
      return database.get(database.child(database.ref(databaseInstance), path));
    },

    put: async (path: string, form: object) => {
      await database.set(
        database.child(database.ref(databaseInstance), path),
        form
      );
      return database.ref(databaseInstance, path).key;
    },

    post: async (path: string, form?: object) => {
      const response = await database.push(
        database.child(database.ref(databaseInstance), '/services/'),
        form
      );

      return response.key;
    },

    delete: async (path: string) => {
      database.remove(database.child(database.ref(databaseInstance), path));
    },
  };
};

export const Storage = () => {
  const storageInstance = getStorage(app);
  return {
    get: (path: string) => {
      return storage.getDownloadURL(storage.ref(storageInstance, path));
    },
    async put(file: Blob, path: string, format: string) {
      try {
        const response = await storage.uploadBytes(
          storage.ref(storageInstance, path),
          file,
          { contentType: format }
        );
        return await storage.getDownloadURL(response.ref);
      } catch (err) {
        console.log('an error occorred in put firebase storage', err);
        return null;
      }
    },
    async delete(path: string, id: string) {
      try {
        const firstPage = await storage.list(
          storage.ref(storageInstance, path)
        );
        const item = firstPage.items.find((item) => {
          return item.name.includes(id);
        });

        if (item)
          await storage.deleteObject(
            storage.ref(storageInstance, item.fullPath)
          );
      } catch (e) {
        console.log('an error ocorred in delete image' + e);
      }
    },
  };
};
