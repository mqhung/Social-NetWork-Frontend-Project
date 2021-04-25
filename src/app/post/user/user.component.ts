import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';
import {JwtService} from '../../service/auth/jwt.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: IAppUser[] = [];
  user: IAppUser;
  sumListUser: number;
  constructor(private userService: UserService,private jwtService: JwtService) {
    this.showAllUser();
  }

  ngOnInit(): void {
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
}
