import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ConfirmedValidator} from './password-validators';
import {JwtService} from '../service/auth/jwt.service';
import {IUserRegister} from '../model/IUserRegister';
import {IUserToken} from '../model/IUserToken';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Subscription} from 'rxjs';
import {IAppUser} from '../model/IAppUser';

class AuthenticationService {
}

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  user: IUserRegister
  // currentUser: IUserRegister;
  // sub: Subscription;
  // // currentUser: IUserToken;
  // newPasswordForm: FormGroup = new FormGroup({
  //   password: new FormControl('' )
  // });
  //
  // constructor(private userService: UserService,
  //             private router: Router,
  //             private fb: FormBuilder,
  //             private activatedRoute: ActivatedRoute,
  //             private jwtService: JwtService) {
  //
  // }
  //
  // ngOnInit() {
  //   this.getUser()
  // }
  //
  // getUser() {
  //   this.userService.getCurrentUser().subscribe(
  //     response => {
  //       this.user = <IUserRegister> response;
  //       console.log(this.user);
  //     },
  //     error => console.error(error)
  //   );
  // }
  //
  // changePassword() {
  //   const user = this.setNewUser();
  //   this.jwtService.currentUser.subscribe(
  //     currentUser => {
  //       console.log(currentUser);
  //       this.userService.updatePassword(currentUser.id, user).subscribe(() => {
  //         alert('Đổi mật khẩu thành công');
  //         this.newPasswordForm.reset();
  //         this.router.navigate(['/post/timeline']);
  //       }, err => {
  //         console.log(err);
  //       });
  //     }
  //   );
  // }
  //
  // private setNewUser() {
  //   const user: IUserRegister = {
  //     password: this.newPasswordForm.value.password,
  //   };
  //   return user;
  // }


  // currentUser: IUserToken;
  // idUserCurrent: any;
  // user: IUserRegister;
  // updateForm: FormGroup;
  //
  //
  // constructor(
  //   private router: Router,
  //   private jwtService: JwtService,
  //   private userService: UserService
  // ) {
  //   this.checkLogin();
  // }
  //
  // ngOnInit(): void {
  //   this.user = {
  //
  //   }
  //   this.prepareForm();
  //   this.getUser();
  // }
  //
  // prepareForm() {
  //   this.updateForm = new FormGroup({
  //     password: new FormControl('')
  //
  //   })
  // }
  //
  // checkLogin(){
  //   if (localStorage.getItem('USERNAME') == null) {
  //     this.router.navigate(['login']);
  //   } else {
  //     this.idUserCurrent = localStorage.getItem('ID');
  //     this.userService.getUser(this.idUserCurrent).subscribe(value => {
  //       this.user = value;
  //       this.updateForm.patchValue(this.user);
  //     });
  //   }
  // }
  //
  // getUser() {
  //   this.jwtService.currentUser.subscribe(x => {
  //     this.currentUser = x;
  //     this.userService.getUser(x.id).subscribe(value => {
  //       this.user = value;
  //       console.log(this.user);
  //       this.updateForm = new FormGroup({
  //         password: new FormControl(this.user.password),
  //       })
  //     });
  //   });
  // }
  //
  // setInfo() {
  //   let newUser: IUserRegister = {
  //     id: this.user.id,
  //     username: this.user.username,
  //     password: this.updateForm.get('password').value,
  //   }
  //   return newUser;
  // }
  //
  // update() {
  //   let userNewInfo = this.setInfo();
  //   this.userService.updateUser(this.user.id, userNewInfo).subscribe(() => {
  //     alert("Update success!");
  //     this.router.navigate(['/post/timeline']);
  //   }, error => {
  //     alert('Error')
  //     console.log(error);
  //   })
  // }


  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,) {

    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
      this.userService.getCurrentUser().subscribe(
        response => {
          this.user = <IUserRegister> response;
          console.log(this.user);
        },
        error => console.error(error)
      );
    }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.userService.updatePassword(this.user.id, this.user).subscribe(() => {
      console.log(this.user.id, this.user);
          alert("Update success!");
          this.router.navigate(['/post/timeline']);
        }, error => {
          alert('Error')
          console.log(error);
        })
  }
}
