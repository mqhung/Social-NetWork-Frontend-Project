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
  constructor(private http: HttpClient, private router: Router) {
  }

  private friendUrl = environment.URL + 'relationship';


  getFriendList(userId: number) {
    return this.http.get(this.friendUrl + '/listFriend/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    );
  }

  getPendingFriendList(userId: number) {
    return this.http.get(this.friendUrl + '/listPendingFriend/' + userId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  checkFriend(relatingId: number, relatedId: number) {
    return this.http.get(this.friendUrl + '/checkFriend/' + relatingId + "/" + relatedId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }
}
