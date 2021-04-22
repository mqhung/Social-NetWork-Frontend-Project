import {User} from './user';
import {Timestamp} from 'rxjs';

export interface Comment {
  id: number;
  appUser: User;
  postId: number;
  content: string;
  createdTime: Timestamp<any>;
}
