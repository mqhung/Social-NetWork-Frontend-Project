import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: IAppUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = <IAppUser> response;
        console.log(this.user);
      },
      error => console.error(error)
    );
  }

}
