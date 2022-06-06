import React from 'react';
import { Realtime, Storage } from './firebase';
import { courseType, serviceType } from './utils/types';
import { context } from './utils/types.context';

export const UserContext = React.createContext<context | null>(null);

export const UserStorage = ({ children }: { children: React.ReactNode }) => {
  const realtime = Realtime();
  const storage = Storage();

  const service = {
    getAll: async (): Promise<serviceType[] | null> => {
      const data = await realtime.get('/services/');

      const response: serviceType[] = [];

      data.forEach((item) => {
        response.push({ ...item.val(), id: item.key });
      });

      if (response.length === 0) return null;

      return response;
    },
    get: async (id: string): Promise<serviceType | null> => {
      const data = await realtime.get('/services/' + id);
      if (!data.exists) return null;
      return { ...data.val(), id: data.key };
    },
    put: async (form: serviceType, id: string): Promise<string | null> => {
      if (typeof form.img !== 'string') {
        const img = form.img;
        const url = await storage.put(
          img.file,
          `/services/${id}.${img.ext}`,
          `image/${img.ext}`
        );
        form.img = url ? url : await utils.getDefaultImage();
      }
      const key = await realtime.put('/services/' + id, form);
      return key;
    },
    post: async (form: serviceType): Promise<string | null> => {
      const id = await realtime.post('/services/');

      if (typeof form.img !== 'string') {
        const img = form.img;
        const url = await storage.put(
          img.file,
          `/services/${id}.${img.ext}`,
          `image/${img.ext}`
        );
        form.img = url ? url : await utils.getDefaultImage();
      }

      await realtime.put('/services/' + id, form);

      return id;
    },
    delete: async (id: string): Promise<boolean> => {
      try {
        await realtime.delete('/services/' + id);
        await storage.delete('/services/', id);
        return true;
      } catch (e) {
        return false;
      }
    },
  };

  const course = {
    getAll: async (): Promise<courseType[] | null> => {
      const data = await realtime.get('/courses/');
      const response: courseType[] = [];
      data.forEach((item) => {
        response.push({ ...item.val(), id: item.key });
      });
      if (response.length === 0) return null;

      return response;
    },
    get: async (id: string): Promise<courseType | null> => {
      const data = await realtime.get('/courses/' + id);
      if (!data.exists) return null;
      return { ...data.val(), id: data.key };
    },
    put: async (form: courseType, id: string): Promise<string | null> => {
      const key = await realtime.put('/courses/' + id, form);
      return key;
    },
    post: async (form: courseType): Promise<string | null> => {
      const key = await realtime.post('/courses/', form);

      return key;
    },
    delete: (id: string) => {
      return realtime.delete('/courses/' + id);
    },
  };

  const utils = {
    getDefaultImage: () => {
      return storage.get('/services/empty.png');
    },
  };

  const context = {
    service,
    course,
    utils,
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
