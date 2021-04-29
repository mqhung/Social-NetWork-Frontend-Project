import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';
import {JwtService} from './auth/jwt.service';
import {IAppUser} from '../model/IAppUser';
import {IUserRegister} from '../model/IUserRegister';

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

  updatePassword(id: number, user: IUserRegister): Observable<any> {
    return this.http.patch(`${this.userUrl}/update/${id}/password`, user);
  }
}
