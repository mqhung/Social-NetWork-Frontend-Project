import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserRegister} from '../model/IUserRegister';
import {register} from 'ts-node';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = environment.URL;
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }
  register(user: IUserRegister): Observable<IUserRegister> {
    return this.httpClient.post<IUserRegister>(API_URL + 'register', user);
  }
}
