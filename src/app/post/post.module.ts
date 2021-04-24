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
import {UserComponent} from './user/user.component';


@NgModule({
  declarations: [
    NewFeedComponent,
    PersonnalPageComponent,
    CoverComponent,
    NavbarComponent,
    AddPostComponent,
    ListPostComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PostModule { }
