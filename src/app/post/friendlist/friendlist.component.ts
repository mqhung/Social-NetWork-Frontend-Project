import {Component, Input, OnInit} from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
  @Input() idUser;
  userLogin:IAppUser;
  friendList:any;
  constructor(private userService: UserService,private friendService: FriendService) { }

  ngOnInit(): void {
    this.getFriendList();
  }

  getFriendList() {
    this.friendService.getFriendList(this.idUser).subscribe(
      response => {this.friendList = response},
      error => console.error(error)
    )
  }
}
