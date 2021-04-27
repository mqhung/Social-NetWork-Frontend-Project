import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonnalPageComponent} from './personal-page/personnal-page.component';
import {NewFeedComponent} from './new-feed/new-feed.component';
import {GuestPageComponent} from './guest-page/guest-page.component';
import {EditPostComponent} from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: 'timeline',
    component: PersonnalPageComponent
  },
  {
    path: 'new-feed',
    component: NewFeedComponent
  },
  {
    path: 'user/:id',
    component: GuestPageComponent
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
