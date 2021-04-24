import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonnalPageComponent} from './personal-page/personnal-page.component';
import {NewFeedComponent} from './new-feed/new-feed.component';

const routes: Routes = [
  {
    path: 'timeline',
    component: PersonnalPageComponent
  },
  {
    path: 'new-feed',
    component: NewFeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
