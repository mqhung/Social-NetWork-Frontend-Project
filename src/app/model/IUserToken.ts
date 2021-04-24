import {IRole} from './IRole';

export interface IUserToken {
  id: number;
  username: string;
  password: string;
  token?: string;
  enabled?: boolean;
  roles: IRole[];
}
