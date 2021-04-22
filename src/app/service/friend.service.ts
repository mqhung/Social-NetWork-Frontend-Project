import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private friendUrl = environment.URL + 'relationship';

  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  getFriendList(userId: number) {
    return this.http.get(this.friendUrl + '/listFriend/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    );
  }
}
