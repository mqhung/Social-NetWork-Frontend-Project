import {Injectable} from '@angular/core';
import {IMessage} from '../../model/imessage';
import {IConversation} from '../../model/IConversation';


import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  serverUrl = environment.URL;

  conversations: IConversation[] = [];


  constructor(private httpClient: HttpClient) {
  }

  getConversationList(): Observable<IConversation[]> {
    return this.httpClient.get<IConversation[]>(this.serverUrl + 'message/getAll').pipe();
  }

  getChatMessageByConversationId(id: number): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>(this.serverUrl + 'message/get-message-by-conversation-id/' + id).pipe();
  }

  getConversationByReceiverId(receiverId: number): Observable<IConversation> {
    return this.httpClient.get<IConversation>(this.serverUrl + 'message/' + receiverId).pipe();
  }

}



