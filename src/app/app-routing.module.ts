import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendComponent} from './friend/friend.component';

const routes: Routes = [
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(module => module.PostModule)
  },
  {
    path: 'listFriend/:id',
    component: FriendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
