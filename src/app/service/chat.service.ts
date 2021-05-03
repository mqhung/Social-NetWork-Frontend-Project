import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Chat} from '../model/chat';
// @ts-ignore
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chat_URL = environment.URL + "api/socket/"

  constructor(private httpClient: HttpClient) {
  }

  post(data: Chat) {
    return this.httpClient.post<Chat>(this.chat_URL, data)
      .map((data: Chat) => {
        return data;
      })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
  }
}
