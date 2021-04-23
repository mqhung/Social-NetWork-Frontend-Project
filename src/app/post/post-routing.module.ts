import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonnalPageComponent} from './personal-page/personnal-page.component';
import {NewFeedComponent} from './new-feed/new-feed.component';
import {ListCommentComponent} from './list-comment/list-comment.component';
import {CreateCommentComponent} from './create-comment/create-comment.component';

const routes: Routes = [
  {
    path: 'timeline',
    component: PersonnalPageComponent
  },
  {
    path: 'new-feed',
    component: NewFeedComponent
  },
  // {
  //   path: 'show',
  //   component: ListCommentComponent
  // },
  {
    path: 'create',
    component: CreateCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
