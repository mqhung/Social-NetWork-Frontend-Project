import {Component, OnInit} from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {FriendService} from '../service/friend.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  // friendList: IAppUser[] = [];
  sumListFriend: number;
  sumListPending: number;
  user: IAppUser;
  userFriend: IAppUser;
  userPending: IAppUser;
  pendingList: IAppUser[];

  // similarFriendList: IAppUser[];
  friendList: IAppUser[];

  userLogin: IAppUser;
  friendListLogin: IAppUser[];
  mutualFriendList: IAppUser[] = [];

  guestUserId: number;

  constructor(private friendService: FriendService,
              private userService: UserService,
              private activatedRouter: ActivatedRoute  ) {
    this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
      let id = +paraMap.get('id');
      this.guestUserId = id;
    });
  }

  // getFriendList() {
  //   if (this.userService.getCurrentUser() !== null) {
  //     this.userService.getCurrentUser().subscribe(
  //       response => {
  //         this.userFriend = <IAppUser> response;
  //         console.log(this.userFriend.id);
  //         this.friendService.getFriendList(this.userFriend.id).subscribe(
  //           response => {
  //             this.friendList = <IAppUser[]> response,
  //               this.sumListFriend = this.friendList.length;
  //           },
  //           error => console.error(error)
  //         );
  //       },
  //       error => console.error(error)
  //     );
  //   } else {
  //     return null;
  //   }
  // }

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

  // getMutualFriendList() {
  //   this.userService.getCurrentUser().subscribe(
  //     response => {
  //       this.userLogin = <IAppUser> response;
  //       this.friendService.getFriendList(this.userLogin.id).subscribe(
  //         response => {
  //           this.friendListLogin = <IAppUser[]> response;
  //           for (let i = 0; i < this.friendList.length; i++) {
  //             for (let j = 0; j < this.friendListLogin.length; j++) {
  //               if (this.friendList[i].id == this.friendListLogin[j].id) {
  //                 this.mutualFriendList.push(this.friendList[i]);
  //                 console.log(this.friendList[i]);
  //               }
  //             }
  //           }
  //         },
  //         error => console.error(error)
  //       );
  //     }
  //   );
  // }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = <IAppUser>response;
        console.log(this.user);
      },
      error => console.error(error)
    );
  }

  unFriend(userSendId: number, index: number) {
    this.friendService.unFriend(userSendId, {}).subscribe(
      response => {
        this.friendList.splice(index, 1);
        this.sumListFriend = this.sumListFriend - 1;
      },
      error => console.error(error)
    );
  }

  getSimilarFriendList(id: number) {
    this.friendService.getSimilarFriendList(id).subscribe(next => {
      // this.similarFriendList = next;
      this.friendList = next;
    })
  }

  ngOnInit(): void {
    // this.getFriendList();
    this.getSimilarFriendList(this.guestUserId)
    this.getUser();
    this.getPendingFriendList();
  }



}
