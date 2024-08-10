import {Edge, Node} from "reactflow";




export type MemberofOrg = {
  isAdmin: boolean;
  user: User

};
export type User = {
  id: number;
  isAdmin: boolean;
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

export type Id = string | number;

export type Task = {
  id: Id,
  title: string,
  team_id?: number,
  org_id?: number,
  task_desc: string,
  task_progress: Id,
  task_deadline?: string;
  assigned_to?: User[]
  boardDetails?: Board
}

export type Board = {
  id: number,
  task: number,
  edges: Edge[],
  nodes: Node[]
}

export type Column = {
  id: Id;
  title: string;
};

