import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {AdminService} from '../service/admin.service';
import {Subscription} from 'rxjs';
import {IUserRegister} from '../model/IUserRegister';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  role: string;
  sub: Subscription;
  listUser: any;
  currentUsername: string;

  constructor(private adminService: AdminService,
              private router: Router
  ) {
    this.role = localStorage.getItem('ROLE');
    if (this.role == "ROLE_USER") {
      alert("You have no authorize!")
      this.router.navigate(['/']);
    }
    this.currentUsername = localStorage.getItem("USERNAME");
    this.getAllUsers()
  }

  ngOnInit(): void {
  }

  getAllUsers() {
    this.adminService.findAllUsers().subscribe(value => {
      this.listUser = value;
    }, error => {
      console.log(error);
    });
  }

  blockUser(id, user) {
    this.adminService.block(id, user).subscribe(next => {
      alert(user.username + " has been blocked");
      this.getAllUsers();
    }, error => {
      console.log(error);
    })
  }

  unblockUser(id, user) {
    this.adminService.unblock(id, user).subscribe(next => {
      alert(user.username + " has been unblock");
      this.getAllUsers();
    }, error => {
      console.log(error);
    })
  }

}
