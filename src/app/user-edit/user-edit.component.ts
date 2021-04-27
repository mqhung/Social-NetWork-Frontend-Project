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
  currentUser: IUserToken;
  user: IUserRegister;
  updateForm: FormGroup;
  arrayPicture: any;
  fb: any;

  constructor(
    private router: Router,
    private authenticationService: JwtService,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {
    this.user = {

    }
    this.prepareForm();
    this.getUserCurrent();
  }

  prepareForm() {
    this.updateForm = new FormGroup({
      firstName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  getUserCurrent() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUser(x.id).subscribe(value => {
        this.user = value;
        console.log(this.user);
        this.updateForm = new FormGroup({
          firstName: new FormControl(this.user.firstName),
          lastName: new FormControl(this.user.lastName),
          email: new FormControl(this.user.email),
          phone: new FormControl(this.user.phone),
        })
      });
    });
  }

  setInfo() {
    let newUser: IUserRegister = {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      firstName: this.updateForm.get('firstName').value,
      lastName: this.updateForm.get('lastName').value,
      email: this.updateForm.get('email').value,
      phone: this.updateForm.get('phone').value,
      avatar: this.user.avatar
    }
    return newUser;
  }

  update() {
    this.user.avatar = this.fb;
    let userNewInfo = this.setInfo();
    this.userService.updateUser(this.user.id, userNewInfo).subscribe(() => {
      alert("Update success!");
    }, error => {
      console.log(error);
    })
  }


  saveImg(value) {
    var n = Date.now();
    const file = value.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.arrayPicture = fileRef.getDownloadURL();
          this.arrayPicture.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.user.avatar);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }


}
