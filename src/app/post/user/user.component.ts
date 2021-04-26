import {Component, Input, OnInit} from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';
import {JwtService} from '../../service/auth/jwt.service';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: IAppUser[] = [];
  user: IAppUser;
  sumListUser: number;
  isFriend: boolean = false;
  str: string = "Add Friend"
  constructor(private userService: UserService,private jwtService: JwtService, private friendService: FriendService) {

  }

  ngOnInit(): void {
    this.showAllUser();
    // this.addFriend();
    // this.checkFriend();
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

  showAllUser(){
    this.userService.findAllUser().subscribe(
      response => {
        this.userList = <IAppUser[]> response;
        if(this.userService.getCurrentUser() != null) {
          for (let i = 0; i < this.userList.length; i++) {
            if(this.jwtService.currentUserValue.id == this.userList[i].id){
              this.userList.splice(i, 1);
            }
          }
        }
      });
  }
  // checkFriend(){
  //   this.userService.getCurrentUser().subscribe(
  //     response => {this.user = <IAppUser> response;
  //       var status;
  //       this.friendService.checkFriend(this.user.id,this.userSendId).subscribe(
  //         response => {status = response;
  //           switch (status) {
  //             case 0:
  //               this.isFriend = false;
  //               break;
  //             case 1:
  //               this.isFriend = false;
  //               break;
  //             case 2:
  //               this.isFriend = true;
  //               break;
  //             case 3:
  //               this.isFriend = false;
  //               break;
  //           }
  //         },
  //         error => console.log(error)
  //       )
  //     },
  //     error => console.error(error)
  //   );
  // }

  addFriend(userReceiveId: number){
    this.friendService.sendFriendRequest(userReceiveId, {}).subscribe(() => {
      this.str = "Send Request";
      document.getElementById(""+userReceiveId).innerText = this.str;
    })
  }
}
