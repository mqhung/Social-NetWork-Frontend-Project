import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentComponent} from './comment/comment.component';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent
  },
  {
    path: 'create',
    component: CommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
