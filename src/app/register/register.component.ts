import { Component, OnInit } from '@angular/core';
import {IUser} from '../model/iuser';
import {Router} from '@angular/router';
import {IUserRegister} from '../model/IUserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // form: any = {};
  // signUpInfor !: IUserRegister;
  // isSignUpFailed = false;
  // errorMessage = '';
  constructor(
    // private authService: AuthService,
    // private router: Router
  ) { }
  //
  ngOnInit(): void {
  }
  //
  // onSubmit() {
  //   this.signUpInfor = new IUserRegister(this.form.username, this.form.password, this.form.firstName, this.form.lastName, this.form.email, this.form.address, this.form.dateOfBirth);
  //   this.authService.signUp(this.signUpInfor).pipe(first()).subscribe(
  //     data => {
  //       this.isSignUpFailed = false;
  //       this.router.navigate(['login']);
  //     },
  //     error => {
  //       this.errorMessage = error.message;
  //       this.isSignUpFailed = true;
  //     }
  //   )
  // }
}
