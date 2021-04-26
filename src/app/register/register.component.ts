import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../model/iappuser';
import {Router} from '@angular/router';
import {IUserRegister} from '../model/IUserRegister';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {RegisterService} from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  user!: IUserRegister;
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createNewUser(): void {
    this.user = new IUserRegister()
    this.user.username = this.form.username;
    this.user.password = this.form.password;
    this.user.firstName = this.form.firstName;
    this.user.lastName = this.form.lastName;
    this.user.email = this.form.email;
    this.user.gender = this.form.gender;
    this.user.phoneNumber = this.form.phoneNumber;
    console.log(this.user);
    this.registerService.register(this.user).subscribe(data => {
        alert('Tạo tài khoản thành công!');
        this.router.navigate(['/login']);
      },
      error => {
        alert('Tài khoản đã tồn tại!');
        console.log(error);
      });
  }
}
