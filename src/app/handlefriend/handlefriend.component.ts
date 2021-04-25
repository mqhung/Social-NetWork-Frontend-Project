import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';
import {IAppUser} from '../model/IAppUser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-handlefriend',
  templateUrl: './handlefriend.component.html',
  styleUrls: ['./handlefriend.component.css']
})
export class HandlefriendComponent implements OnInit {
  sumListPending: number;
  userPending: IAppUser;
  pendingList: IAppUser[];
  user: IAppUser;
  friendList:IAppUser[] ;
  sumListFriend: number;
  userFriend:IAppUser;
  userReceiveId: IAppUser;
  constructor(private friendService: FriendService, private userService: UserService) { }

  ngOnInit(): void {
  this.getPendingFriendList();
  this.getUser();
  }

  getPendingFriendList() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.userPending = <IAppUser>response;
        this.friendService.getPendingFriendList(this.userPending.id).subscribe(
          response => {
            this.pendingList = <IAppUser[]>response
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
  acceptInviteFriend(userSendId:number,statusId:number,index:number){
    this.userService.findUserById(userSendId).subscribe(
      response => {
        this.user = <IAppUser>response;
        this.userService.getCurrentUser().subscribe(
          response => { this.userReceiveId = <IAppUser> response;
            this.friendService.handleFriendRequest(this.userReceiveId.id,statusId,{
              "userId": this.user.id,
              "username": null,
              "password": null,
              "birthday": null,
              "firstName": null,
              "lastName": null,
              "gender": null,
              "phone": null,
              "email": null,
              "address": null,
              "avatar":null,
              "createdDate":null,
              "blocked":false,
              "appRole":null,
            }).subscribe(
              response => {
                if (statusId==3){
                  this.pendingList.splice(index,1);
                  this.sumListPending = this.sumListPending-1;
                } else if (statusId==2){
                  this.pendingList.splice(index,1);
                  this.friendList.push(this.user);
                  this.sumListPending = this.sumListPending-1;
                  this.sumListFriend=this.sumListFriend+1;
                }
              },
              error => console.error(error)
            )
          },
          error => console.error(error)
        )
      },
      error => console.error(error)
    )
  }
}
