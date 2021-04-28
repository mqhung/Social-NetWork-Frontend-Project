// export interface ILikePost {
//   id: number,
//   postId: number,
//   likerId: number
// }

import {IAppUser} from './IAppUser';
import {IPost} from "./IPost";

export interface ILikePost {
  id?: number;
  userId?: IAppUser;
  postId?: IPost;
}
