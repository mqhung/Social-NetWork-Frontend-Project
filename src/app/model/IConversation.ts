import {IAppUser} from './IAppUser';

export interface IConversation {

  id: number;
  name: string;
  firstUser: IAppUser;
  secondUser: IAppUser;
  createdAt: Date;
  updateAt: Date
}
