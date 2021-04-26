import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {IAppUser} from '../model/IAppUser';
import {Subscription} from 'rxjs';
import {IUserToken} from '../model/IUserToken';
import {IUserRegister} from '../model/IUserRegister';
import {FormControl, FormGroup} from '@angular/forms';
import {JwtService} from '../service/auth/jwt.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  // currentUser: IUserToken;
  // user: IUserRegister;
  // updateForm: FormGroup;
  // arrayPicture: any;
  // fb: any;
  //
  // constructor(
  //   private router: Router,
  //   private authenticationService: JwtService,
  //   private userService: UserService,
  //   private storage: AngularFireStorage
  // ) {
  //
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
  //     name: new FormControl(''),
  //     email: new FormControl(''),
  //     phoneNumber: new FormControl(''),
  //   })
  // }
  //
  // getUser() {
  //   this.authenticationService.currentUser.subscribe(x => {
  //     this.currentUser = x;
  //     this.userService.getUser(x.id).subscribe(value => {
  //       this.user = value;
  //       console.log(this.user);
  //       this.updateForm = new FormGroup({
  //         firstName: new FormControl(this.user.firstName),
  //         lastName: new FormControl(this.user.lastName),
  //         email: new FormControl(this.user.email),
  //         phoneNumber: new FormControl(this.user.phoneNumber),
  //       })
  //     });
  //   });
  // }
  //
  // setInfo() {
  //   let newUser: IUserRegister = {
  //     id: this.user.id,
  //     username: this.user.username,
  //     password: this.user.password,
  //     firstName: this.updateForm.get('firstName').value,
  //     lastName: this.updateForm.get('lastName').value,
  //     email: this.updateForm.get('email').value,
  //     phoneNumber: this.updateForm.get('phoneNumber').value,
  //     avatar: this.user.avatar
  //   }
  //   return newUser;
  // }
  //
  // update() {
  //   let userNewInfo = this.setInfo();
  //   this.userService.updateUser(this.user.id, userNewInfo).subscribe(() => {
  //     alert("Update success!");
  //   }, error => {
  //     console.log(error);
  //   })
  // }
  //
  //
  // saveImg(value) {
  //   var n = Date.now();
  //   const file = value.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.arrayPicture = fileRef.getDownloadURL();
  //         this.arrayPicture.subscribe(url => {
  //           if (url) {
  //             this.user.avatar = url;
  //           }
  //           console.log(this.user.avatar);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }
  user: any;
  id =  0;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
        console.log(data)
        this.id = data.id;
      },
      error => {
        console.log(error);
      });

    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }

  onSubmit(): void {
    console.log(this.user);
    this.userService.updateUser(this.id, this.user).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/post/timeline');
      },
      error => {
        console.log(error);
      });
  }

}
