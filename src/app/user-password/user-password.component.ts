import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ConfirmedValidator} from './password-validators';
import {JwtService} from '../service/auth/jwt.service';
import {IUserRegister} from '../model/IUserRegister';
import {IUserToken} from '../model/IUserToken';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Subscription} from 'rxjs';
import {IAppUser} from '../model/IAppUser';


@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  // user: IUserRegister;
  // currentUser: IUserRegister;
  // sub: Subscription;
  // currentUserToken: IUserToken;
  // newPasswordForm: FormGroup = new FormGroup({
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  // });
  //
  // constructor(private userService: UserService,
  //             private router: Router,
  //             private fb: FormBuilder,
  //             private activatedRoute: ActivatedRoute,
  //             private authService: JwtService) {
  //
  // }
  //
  // ngOnInit() {
  //   this.getUser();
  // }
  //
  // getUser() {
  //       this.userService.getCurrentUser().subscribe(
  //         response => {
  //           this.user = <IUserRegister> response;
  //           console.log(this.user);
  //         },
  //         error => console.error(error)
  //       );
  //     }
  //
  // changePassword() {
  //   const user = this.setNewUser();
  //   this.authService.currentUser.subscribe(
  //     currentUser => {
  //       console.log(currentUser);
  //       this.userService.updatePassword(currentUser.username, user).subscribe(() => {
  //         alert('Change password success');
  //         this.newPasswordForm.reset();
  //         this.router.navigate(['/login']);
  //       }, err => {
  //         console.log(err);
  //       });
  //     }
  //   );
  // }
  //
  // private setNewUser() {
  //   const user: IUserRegister = {
  //     username:'',
  //     password: this.newPasswordForm.value.password,
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     address: '',
  //     birthday: '',
  //     gender: ''
  //   };
  //   return user;
  // }

  sub: Subscription;

  user: IUserRegister = {
    roles: [{
      id: 0,
      name: '',
    }],
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    phone: '',
    avatar:'',
    birthday:'',
    blocked: false
  };


  constructor(private router: Router,
              private userService: UserService,
              private activatedRouter: ActivatedRoute,
  ) {
    this.sub = this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
        this.user.id = Number(paraMap.get('id'));
        this.getUserById(this.user.id);
      }
    );
  }


  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  private getUserById(id: number) {
    this.userService.getUser(id).subscribe(a => {
      this.user = a;
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(id: number) {
    this.userService.resetPassword(this.user).subscribe(() => {

    });
    alert('Change password success');
    this.router.navigate(['/']);

  }

}
