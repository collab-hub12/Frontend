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

export type MemberofOrg = {
  isAdmin: boolean;
  user: User

};
export type User = {
  id: number;
  name: string;
  email: string;
  picture: string;
};

export type Org = {
  id?: number,
  org_name: string,
  org_desc: string,
  founder_id: number,
  location: string,
  createdAt?: string
}
export type Team = {
  id?: number,
  name: string
}

export type WithRoles = {
  org_id?: number,
  team_id?: number,
  room_id?: number,
}