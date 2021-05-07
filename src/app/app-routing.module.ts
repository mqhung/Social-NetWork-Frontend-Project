import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FriendComponent} from './friend/friend.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {HandlefriendComponent} from './handlefriend/handlefriend.component';
import {MutualFriendComponent} from "./mutual-friend/mutual-friend.component";
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ViewImageComponent} from './view-image/view-image.component';
import {MessageComponent} from './message/message.component';
import {UserPasswordComponent} from './user-password/user-password.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(module => module.PostModule)
  },
  {
    path: 'listFriend/:id',
    component: FriendComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'mutual-friends/:id',
    component: MutualFriendComponent
  },
  {
    path: 'listPendingFriend',
    component: HandlefriendComponent
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'user/:id/about',
    component: UserInfoComponent
  },
  {
    path: 'image',
    component: ViewImageComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'user/:id/password',
    component: UserPasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
