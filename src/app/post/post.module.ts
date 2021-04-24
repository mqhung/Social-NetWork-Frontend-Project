import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { PersonnalPageComponent } from './personal-page/personnal-page.component';
import {AppModule} from '../app.module';
import {UserComponent} from './user/user.component';


@NgModule({
  declarations: [
    NewFeedComponent,
    PersonnalPageComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
  ]
})
export class PostModule { }
