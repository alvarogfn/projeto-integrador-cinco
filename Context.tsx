import React from 'react';
import { Realtime, Storage } from './firebase';
import { courseType, rateType, serviceType } from './utils/types';
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
      if (typeof form.img !== 'string') {
        const img = form.img;
        const url = await storage.put(
          img.file,
          `/courses/${id}.${img.ext}`,
          `image/${img.ext}`
        );
        form.img = url ? url : await utils.getDefaultImage();
      }
      const key = await realtime.put('/courses/' + id, form);
      return key;
    },
    post: async (form: courseType): Promise<string | null> => {
      const id = await realtime.post('/courses/');

      if (typeof form.img !== 'string') {
        const img = form.img;
        const url = await storage.put(
          img.file,
          `/courses/${id}.${img.ext}`,
          `image/${img.ext}`
        );
        form.img = url ? url : await utils.getDefaultImage();
      }

      await realtime.put('/courses/' + id, form);

      return id;
    },
    delete: async (id: string) => {
      try {
        await realtime.delete('/courses/' + id);
        await storage.delete('/courses/', id);
        return true;
      } catch (e) {
        return false;
      }
    },
  };

  const rates = {
    getAll: async (): Promise<Array<rateType> | null> => {
      const data = await realtime.get('/rates/');

      const response: Array<rateType> = [];

      data.forEach((item) => {
        item.forEach((rate) => {
          response.push({
            ...rate.val(),
            rate_id: rate.key,
            rate_service_id: item.key,
          });
        });
      });

      if (response.length === 0) return null;

      return response;
    },
    get: async (id: string): Promise<rateType[] | null> => {
      const data = await realtime.get('/rates/' + id);
      if (!data.exists) return null;

      const response: rateType[] = [];

      data.forEach((item) => {
        response.push({ ...item.val(), id: item.key });
      });
      return response;
    },
  };

  const utils = {
    getDefaultImage: () => {
      return storage.get('/empty.png');
    },
  };

  const context = {
    service,
    course,
    utils,
    rates,
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
