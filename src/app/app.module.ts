import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { FriendComponent } from './friend/friend.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptorService} from './service/auth/jwt-interceptor.service';
import {LogoutComponent} from './logout/logout.component';
import {HandlefriendComponent} from './handlefriend/handlefriend.component';
import {UserInfoComponent} from './user-info/user-info.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MutualFriendComponent } from './mutual-friend/mutual-friend.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import {PostModule} from './post/post.module';
import { TestchatComponent } from './testchat/testchat.component';


@NgModule({
  declarations: [
    AppComponent,
    FriendComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    UserInfoComponent,
    HandlefriendComponent,
    UserEditComponent,
    MutualFriendComponent,
    UserPasswordComponent,
    TestchatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PostModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
  exports: [
    FriendComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
