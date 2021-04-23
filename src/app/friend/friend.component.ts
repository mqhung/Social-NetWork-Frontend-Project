import {Component, OnInit} from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {FriendService} from '../service/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friendList: IAppUser[] = [];
  userFriend: IAppUser;

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
