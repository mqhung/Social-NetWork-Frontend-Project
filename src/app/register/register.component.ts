import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../model/iappuser';
import {Router} from '@angular/router';
import {IUserRegister} from '../model/IUserRegister';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {RegisterService} from '../service/register.service';
import {noWhitespaceValidator} from './noWhitespaceValidator';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          alert('Account already exists');
        } else if (err.status === 500) {
          alert('Register error!');
        }
      }
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
      phone: this.registerForm.value.phone,
      createdDate: Date.now()
    };
    return user;
  }
}
