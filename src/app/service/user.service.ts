import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';
import {JwtService} from './auth/jwt.service';
import {IAppUser} from '../model/IAppUser';
import {IUserRegister} from '../model/IUserRegister';
import {IPost} from '../model/IPost';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient, private jwtService: JwtService) {

  }

  private userUrl = environment.URL + 'users';
  private friendUrl = environment.URL + 'relationship';

  getCurrentUser() {
    return this.findUserById(this.jwtService.currentUserValue.id);
  }

  findUserById(id: number) {
    return this.http.get(this.userUrl + '/findUserById/' + id).pipe(
      tap(
        user => JSON.stringify(user)),
      catchError(err => of([]))
    );
  }

  findAllUser() : Observable<IAppUser[]>{
    return this.http.get<IAppUser[]>(this.userUrl + '/').pipe(
      tap(users => JSON.stringify(users),
        catchError(err => of([]))
      )
    )
  }

  showAllUserNoFriend(): Observable<IAppUser[]>{
    return this.http.get<IAppUser[]>(this.friendUrl + '/listNoFriend').pipe(
      tap(users => JSON.stringify(users),
        catchError(err => of([]))
      )
    )
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/update/${id}`)
  }

  updateUser(id: number, user: IUserRegister): Observable<any> {
    return this.http.put(`${this.userUrl}/update/${id}`, user);
  }

  getUserProfile(id: string): Observable<IUserRegister> {
    return this.http.get<IUserRegister>(this.userUrl + `/update/${id}`);
  }


  updatePassword(username: string, user: IUserRegister): Observable<IUserRegister> {
    return this.http.put<IUserRegister>(this.userUrl + `/update/${username}/password`, user);
  }

  resetPassword(user: IUserRegister): Observable<IUserRegister> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.put<IUserRegister>(this.userUrl + '/resetPassword', user, {headers});
  }

  searchUser(name: string) : Observable<IAppUser[]>{
    return this.http.get<IAppUser[]>(this.userUrl + '/search?name=' + name).pipe(
      tap(users => JSON.stringify(users),
        catchError(err => of([]))
      )
    )
  }
}
