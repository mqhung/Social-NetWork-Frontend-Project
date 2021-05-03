import {IAppUser} from './IAppUser';

export interface IMessage {

  id: number;
  type: any;
  content: string;
  conversation: any;
  sender: IAppUser;
  receiver: IAppUser;
  createdAt: Date;
}
