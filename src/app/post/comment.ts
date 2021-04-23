
import {Timestamp} from 'rxjs';
import {IUser} from '../model/iuser';

export interface Comment {
  id: number;
  appUser: IUser;
  postId: number;
  content: string;
  createdTime: string;
}
