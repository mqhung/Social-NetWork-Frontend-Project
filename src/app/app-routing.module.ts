import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCommentComponent} from './comment/list-comment/list-comment.component';
import {CreateCommentComponent} from './comment/create-comment/create-comment.component';

const routes: Routes = [
  {
    path: '',
    component: ListCommentComponent
  },
  {
    path: 'create',
    component: CreateCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
