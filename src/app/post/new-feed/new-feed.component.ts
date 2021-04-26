import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {PostService} from '../../service/post/post.service';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {

  postList: IPost[] = [];
  currentUser: IAppUser;
  constructor(private postService: PostService) {
   postService.getAllFriendPost().subscribe(next =>{
     this.postList = next;
   });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }

}
