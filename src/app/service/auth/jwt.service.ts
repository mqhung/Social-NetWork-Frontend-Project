import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserToken} from '../../model/IUserToken';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const API_URL = `http://localhost:8080/`;
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private currentUserSubject: BehaviorSubject<IUserToken>;
  public currentUser: Observable<IUserToken>;
  update = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUserToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUserToken{
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.httpClient.post<any>(API_URL + 'login',{username, password})
      .pipe(map(user =>{
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.update.emit('login');
      return user;
      }))
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
