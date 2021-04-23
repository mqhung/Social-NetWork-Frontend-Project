import {Injectable} from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

  }

  private userUrl = environment.URL + 'users';

  getUser() {
    return this.findUserById(this.tokenStorage.getUser().id);
  }

  findUserById(id: number) {
    return this.http.get(this.userUrl + '/findUserById/' + id).pipe(
      tap(
        user => JSON.stringify(user)),
      catchError(err => of([]))
    );
  }
}
