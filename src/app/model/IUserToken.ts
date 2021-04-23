import {IRole} from './IRole';

export interface IUserToken {
  id: number;
  username: string;
  password: string;
  accessToken?: string;
  enabled?: boolean;
  roles: IRole[];
}
