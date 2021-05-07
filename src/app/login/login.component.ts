import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtService} from '../service/auth/jwt.service';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  returnUrl: string;
  adminUrl: string;
  error = '';
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private jwtService: JwtService) {
    console.log(this.jwtService.currentUserValue);

  }

  ngOnInit() {
    this.returnUrl = '/post/new-feed';
    this.adminUrl = '/admin'
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.jwtService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate([this.adminUrl])
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        err=> {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
             alert('Wrong username or password!');
            } else if (err.status === 406) {
              alert('Your account has been blocked!');
            }
          }
        });
  }

}
