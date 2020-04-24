export type CommonFunction = (arg?: any) => any;

export type Category = {
  name: string;
  id: string;
  [key: string]: any;
};

export type Source = {
  name: string;
  external_id: string | null;
  id: string;
  created_on: string | Date;
  last_modified_on: string | Date;
  [key: string]: any;
};

export type NewsPost = {
  id: string;
  created_on: string | Date;
  last_modified_on: string | Date;
  title: string;
  content: string;
  description: string;
  url: string;
  url_to_image: string;
  published_at: string | Date;
  source: Source;
  category: Category;
  author: string;
  [key: string]: any;
};
