import {IPostStatus} from "./i-post-status";
import {IAppUser} from './IAppUser';

export interface IPost {
  id: number;
  appUser: IAppUser;
  content: string;
  createdTime: Date;
  image: string;
  status: IPostStatus;
}
