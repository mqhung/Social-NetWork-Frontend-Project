import {Timestamp} from 'rxjs';
import {Role} from './role';

export interface User {
  id: number;
  username: string;
  password: string;
  birthday: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  createdDate: string;
  blocked: boolean;
  roles: Role;
}
