import {Component, OnInit} from '@angular/core';
import {IUser} from '../model/iuser';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friendList: IUser[] = [];
  userFriend: IUser;

  constructor(private friendService: FriendService) {
    this.getFriendList();
  }

  getFriendList() {
    // @ts-ignore
    this.friendService.getFriendList().subscribe(friend => {
      // @ts-ignore
      this.friendList = friend;
    });
  }

  ngOnInit(): void {
  }

}
