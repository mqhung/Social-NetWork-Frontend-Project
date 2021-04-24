import {Component, OnInit} from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {FriendService} from '../service/friend.service';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friendList: IAppUser[] = [];
  sumListFriend: number;
  sumListPending: number;
  user: IAppUser;
  userFriend: IAppUser;
  userPending: IAppUser;
  pendingList: IAppUser[];


  constructor(private friendService: FriendService, private userService: UserService
  ) {
  }

  getFriendList() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.userFriend = <IAppUser>response;
        console.log(this.userFriend.id);
        this.friendService.getFriendList(this.userFriend.id).subscribe(
          response => {
            this.friendList = <IAppUser[]>response,
              this.sumListFriend = this.friendList.length;
          },
          error => console.error(error)
        )
      },
      error => console.error(error)
    );

  }

  getPendingFriendList() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.userPending = <IAppUser>response;
        this.friendService.getPendingFriendList(this.userPending.id).subscribe(
          response => {
            this.pendingList = <IAppUser[]>response,
              this.sumListPending = this.pendingList.length;
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = <IAppUser>response;
        console.log(this.user);
      },
      error => console.error(error)
    )
  }

  ngOnInit(): void {
    this.getFriendList();
    this.getUser();
    this.getPendingFriendList();
  }
}
