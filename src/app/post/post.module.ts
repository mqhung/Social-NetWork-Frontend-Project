import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { PersonnalPageComponent } from './personal-page/personnal-page.component';
import {ListCommentComponent} from './list-comment/list-comment.component';
import {CreateCommentComponent} from './create-comment/create-comment.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NewFeedComponent,
    PersonnalPageComponent,
    ListCommentComponent,
    CreateCommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule
  ]
})
export class PostModule { }
