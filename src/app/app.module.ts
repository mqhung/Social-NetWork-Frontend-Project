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
import { UserInfoComponent } from './user-info/user-info.component';
import {PostModule} from './post/post.module';
import {HandlefriendComponent} from './handlefriend/handlefriend.component';


@NgModule({
  declarations: [
    AppComponent,
    FriendComponent,
    RegisterComponent,
    LoginComponent,
    UserInfoComponent,
    HandlefriendComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
