export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Org = {
  id?: number,
  org_name: string,
  org_desc: string,
  founder_id: number,
  location: string,
  createdAt?: string
}