import {Component, OnInit} from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {FriendService} from '../service/friend.service';
import {UserService} from "../service/user.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friendList: IAppUser[] = [];
  sumListFriend: number;
  user: IAppUser;
  userFriend: IAppUser;

  // sub: Subscription;
  // id: number;


  constructor(private friendService: FriendService,
              private  userService: UserService,
              private activeRouter: ActivatedRoute) {
    // this.sub = this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
    //   // @ts-ignore
    //   this.id = +paramMap.get('id');
    //   this.getUserById(this.id);
    // });
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
  }

  // private getUserById(id: number) {
  //   this.userService.findUserById(id).subscribe(f => {
  //     // @ts-ignore
  //     this.friendList = f;
  //   });
  // }
}
