import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { PersonnalPageComponent } from './personal-page/personnal-page.component';
import {CoverComponent} from './cover/cover.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navibar.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { FooterComponent } from './footer/footer.component';
import {ListCommentComponent} from './list-comment/list-comment.component';
import {UserComponent} from './user/user.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ListLikerPostComponent } from './list-liker-post/list-liker-post.component';


@NgModule({
  declarations: [
    NewFeedComponent,
    PersonnalPageComponent,
    CoverComponent,
    NavbarComponent,
    AddPostComponent,
    ListPostComponent,
    GuestPageComponent,
    FooterComponent,
    ListCommentComponent,
    UserComponent,
    EditPostComponent,
    ListLikerPostComponent
  ],
  exports: [
    NavbarComponent,
    CoverComponent,
    FooterComponent,
    UserComponent,
    ListPostComponent,
    ListCommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PostModule { }
