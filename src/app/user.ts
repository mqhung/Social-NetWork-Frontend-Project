import {Timestamp} from 'rxjs';
import {Role} from './role';

export interface User {
  id: number;
  username: string;
  password: string;
  birthday: Date;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  createDate: Timestamp<any>;
  block: boolean;
  roles: Role;
}
