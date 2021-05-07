import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';
import {FriendService} from '../../service/friend.service';
import {PostService} from '../../service/post/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  userList: IAppUser[] = [];
  nameSearch: any;
  str: string = '';
  constructor(private userService: UserService,private friendService: FriendService, private postService: PostService) {

  }

  ngOnInit(): void {
  }

  searchUser(): any{
    this.userService.searchUser(this.nameSearch).subscribe(next => {
      this.userList = next;
    })
  }
  addFriend(userReceiveId: number) {
    this.friendService.sendFriendRequest(userReceiveId, {}).subscribe(() => {
      this.str = 'Send Request';
      document.getElementById('' + userReceiveId).innerText = this.str;
    });
  }
}
