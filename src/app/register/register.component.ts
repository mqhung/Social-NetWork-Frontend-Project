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
  // registerForm: FormGroup = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
  //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
  //   firstName: new FormControl('',[Validators.required]),
  //   lastName: new FormControl('',[Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  // });
  form: any = {};
  user!: IUserRegister;
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }
  //
  ngOnInit() {
  }

  // register() {
  //   const user = this.setNewUser();
  //   this.registerService.register(user).subscribe(() => {
  //     console.log('Đăng ký thành công');
  //     this.registerForm.reset();
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert("Tài khoản đã tồn tại! ");
  //   });
  //   console.log(user);
  // }
  //
  // private setNewUser() {
  //   const user: IUserRegister = {
  //     username: this.registerForm.value.username,
  //     password: this.registerForm.value.password,
  //     confirmPassword: this.registerForm.value.confirmPassword,
  //     firstName: this.registerForm.value.name,
  //     lastName: this.registerForm.value.name,
  //     email: this.registerForm.value.email
  //   };
  //   return user;
  // }
  createNewUser(): void {
    // @ts-ignore
    // console.log(this.form);
    this.user = new IUserRegister()
    this.user.username = this.form.username;
    this.user.password = this.form.password;
    this.user.firstName = this.form.firstName;
    this.user.lastName = this.form.lastName;
    this.user.email = this.form.email;
    this.user.gender = this.form.gender;
    this.user.phoneNumber = this.form.phoneNumber;
    // let role = {
    //   name: this.form.roles
    // }
    // @ts-ignore
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
