import {IRole} from './IRole';
import {Timestamp} from 'rxjs';
import {IAppRole} from './i-app-role';

export interface IUserToken {
   id?: number;
   username?: string;
   password?: string;
   birthday?: any;
   firstName?: string;
   lastName?: string;
   gender?: string;
   phone?: string;
   email?: string;
   address?: string;
   avatar?: string;
   createDate?: Timestamp<any>;
   blocked?: boolean;
   roles?: [IAppRole];
   token?: string;
}
