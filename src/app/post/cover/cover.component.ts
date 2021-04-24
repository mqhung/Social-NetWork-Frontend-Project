import { Component, OnInit } from '@angular/core';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  currentUser: IAppUser;

  constructor(private postService: PostService) {
    this.postService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  }

}
