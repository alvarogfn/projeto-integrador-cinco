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
  img: string;
};

type imageDataType = {
  file: Blob;
  filename: string;
  ext: imageExtension;
  uri: string;
};

type imageExtension = 'png' | 'jpeg' | 'jpg' | 'webp';

export type { serviceType, courseType, imageDataType, imageExtension };
