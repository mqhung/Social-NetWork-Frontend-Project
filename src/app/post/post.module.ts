import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { PersonnalPageComponent } from './personal-page/personnal-page.component';
import {CoverComponent} from './cover/cover.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    NewFeedComponent,
    PersonnalPageComponent,
    CoverComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    HttpClientModule
  ]
})
export class PostModule { }
