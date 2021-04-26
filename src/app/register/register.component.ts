import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../model/iappuser';
import {Router} from '@angular/router';
import {IUserRegister} from '../model/IUserRegister';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {RegisterService} from '../service/register.service';
import {noWhitespaceValidator} from './noWhitespaceValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // form: any = {};
  // user!: IUserRegister;
  // constructor(
  //   private registerService: RegisterService,
  //   private router: Router
  // ) { }
  //
  // ngOnInit() {
  // }
  //
  // createNewUser(): void {
  //   this.user = new IUserRegister()
  //   this.user.username = this.form.username;
  //   this.user.password = this.form.password;
  //   this.user.firstName = this.form.firstName;
  //   this.user.lastName = this.form.lastName;
  //   this.user.email = this.form.email;
  //   this.user.gender = this.form.gender;
  //   this.user.phone = this.form.phone;
  //   console.log(this.user);
  //   this.registerService.register(this.user).subscribe(data => {
  //       alert('Tạo tài khoản thành công!');
  //       this.router.navigate(['/login']);
  //     },
  //     error => {
  //       alert('Tài khoản đã tồn tại!');
  //       console.log(error);
  //     });
  // }
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")])
  });

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.registerService.register(user).subscribe(() => {
      alert('Sign Up Success!');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      alert('Account already exists')
      console.log(err);
    });
    console.log(user);
  }

  private setNewUser() {
    const user: IUserRegister = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone
    };
    return user;
  }
}
