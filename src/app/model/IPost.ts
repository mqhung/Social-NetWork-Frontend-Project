import {IPostStatus} from "./i-post-status";
import {IAppUser} from './IAppUser';

export interface IPost {
  id: any;
  appUser: IAppUser;
  content: string;
  createdTime: Date;
  image: string;
  status: IPostStatus;
  postLike: number;
  postDislike: number;
}
