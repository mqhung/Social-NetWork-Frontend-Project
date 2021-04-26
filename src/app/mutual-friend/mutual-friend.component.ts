import {Component, OnInit} from '@angular/core';
import {IAppUser} from "../model/IAppUser";
import {FriendService} from "../service/friend.service";
import {UserService} from "../service/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostService} from "../service/post/post.service";

@Component({
  selector: 'app-mutual-friend',
  templateUrl: './mutual-friend.component.html',
  styleUrls: ['./mutual-friend.component.css']
})

export class MutualFriendComponent implements OnInit {

  friendList: IAppUser[] = [];
  sumListFriend: number;
  sumListPending: number;
  user: IAppUser;
  userFriend: IAppUser;
  userPending: IAppUser;
  pendingList: IAppUser[];

  // similarFriendList: IAppUser[];

  userLogin: IAppUser;
  friendListLogin: IAppUser[];
  mutualFriendList: IAppUser[] = [];

  guestUserId: number;

  constructor(private friendService: FriendService,
              private userService: UserService,
              private activatedRouter: ActivatedRoute,
              private postService: PostService) {
    this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
      let id = +paraMap.get('id');
      this.guestUserId = id;
      this.getSimilarFriendList(this.guestUserId);
      this.getFriendUserById(this.guestUserId);
      this.getUser();

    });
  }

  getFriendUserById(id: number) {
    this.postService.getUserById(id).subscribe(next => {
      this.userFriend = next;
    })
  }


  getUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = <IAppUser>response;
        console.log(this.user);
      },
      error => console.error(error)
    );
  }


  getSimilarFriendList(id: number) {
    this.friendService.getSimilarFriendList(id).subscribe(next => {
      this.mutualFriendList = next;
      console.log(next);
    })
  }

  ngOnInit(): void {
  }
}


