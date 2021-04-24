import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: IAppUser[] = [];
  constructor(private userService: UserService) {
    this.showAllUser();
  }

  ngOnInit(): void {
  }

  showAllUser(){
    this.userService.findAllUser().subscribe(response => {
        this.userList = <IAppUser[]> response;
        console.log(this.userList);
      },
      error => console.error(error)
    );
  }
}
