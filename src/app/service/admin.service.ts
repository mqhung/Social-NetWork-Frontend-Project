import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserRegister} from '../model/IUserRegister';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }
  private API_URL = environment.URL+'admin';

  findAllUsers(): Observable<IUserRegister> {
    return this.httpClient.get<IUserRegister>(this.API_URL + '/users');
  }

  getUserById(id: string): Observable<IUserRegister> {
    return this.httpClient.get<IUserRegister>(this.API_URL + `/users/${id}`);
  }

  block(id: number, user: IUserRegister): Observable<IUserRegister> {
    return this.httpClient.put(this.API_URL + `/users/${id}/block`, user);
  }

  unblock(id: number, user: IUserRegister): Observable<IUserRegister> {
    return this.httpClient.put(this.API_URL + `/users/${id}/unblock`, user);
  }
}
