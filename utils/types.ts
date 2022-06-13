type serviceType = {
  description: string;
  img: string | imageDataType;
  name: string;
  phone: string;
  price: string;
  id?: string;
};

type courseType = {
  title: string;
  description: string;
  redirect: string;
  img: string | imageDataType;
  id?: string;
};

type imageDataType = {
  file: Blob;
  filename: string;
  ext: imageExtension;
  uri: string;
};

type rateType = {
  description: string;
  email: string;
  like: boolean;
  name: string;
  time: number;
  rate_id: string;
  rate_service_id: string;
};

type imageExtension = 'png' | 'jpeg' | 'jpg' | 'webp';

export type {
  serviceType,
  courseType,
  imageDataType,
  imageExtension,
  rateType,
};
