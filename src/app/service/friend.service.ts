import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IAppUser} from "../model/IAppUser";


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

  sendFriendRequest(userReceiveId: number, user: any){
    return this.http.post(this.friendUrl + '/create/' + userReceiveId,user).pipe(
      tap(
        receiveList => JSON.stringify(receiveList)
      ),
      catchError(err => of([]))
    )
  }

  handleFriendRequest(userSendId: number, statusId: number, user: any){
    return this.http.put(this.friendUrl + '/edit/' + userSendId + '/' + statusId, user).pipe(
      tap(
        receiveList => JSON.stringify(receiveList)
      ),
      catchError(err => of([]))
    )
  }

  unFriend(userSendId: number, user: any){
    return this.http.put(this.friendUrl + '/unfriend/' + userSendId, user).pipe(
      tap(
        receiveList => JSON.stringify(receiveList)
      ),
      catchError(err => of([]))
    )
  }

  checkFriend(userSendId: number,userReceiveId :number) {
    return this.http.get(this.friendUrl + '/checkFriend/' + userSendId+"/"+userReceiveId).pipe(
      tap(
        receivedList => JSON.stringify(receivedList)),
      catchError(err => of([]))
    )
  }

  getSimilarFriendList(id: number) :Observable<IAppUser[]>{
    return this.http.get<IAppUser[]>(this.friendUrl+'/getSimilarFriend/'+id)
  }
}
