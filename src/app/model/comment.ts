import {IAppUser} from './IAppUser';
import {Timestamp} from 'rxjs';

export interface Comment {
  id: number;
  appUser: IAppUser;
  postId: number;
  content: string;
  createdTime: Timestamp<any>;
  commentLike: number,
}
