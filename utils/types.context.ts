import { courseType, rateType, serviceType } from './types';

type context = {
  service: servicesContext;
  course: coursesContext;
  utils: storageContext;
  rates: ratesContext;
};

type servicesContext = {
  getAll: () => Promise<serviceType[] | null>;
  get: (id: string) => Promise<serviceType | null>;
  put: (form: serviceType, id: string) => Promise<string | null>;
  post: (form: serviceType) => Promise<string | null>;
  delete: (id: string) => Promise<boolean>;
};

type coursesContext = {
  getAll: () => Promise<courseType[] | null>;
  get: (id: string) => Promise<courseType | null>;
  put: (form: courseType, id: string) => Promise<string | null>;
  post: (form: courseType) => Promise<string | null>;
  delete: (id: string) => Promise<boolean>;
};

type storageContext = {
  getDefaultImage: () => Promise<string>;
};

type ratesContext = {
  getAll: () => Promise<Array<rateType> | null>;
  get: (id: string) => Promise<rateType[] | null>;
};

export type { context };
