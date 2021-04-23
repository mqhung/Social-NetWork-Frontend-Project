import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserRegister} from '../model/IUserRegister';
import {Observable} from 'rxjs';

const API_URl = `http://localhost:8080/`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


}
