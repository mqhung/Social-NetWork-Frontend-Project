import { Component, OnInit } from '@angular/core';
import {IAppUser} from '../model/IAppUser';
import {PostService} from '../service/post/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  PUBLIC  =1;
  FRIEND_ONLY = 2;
  PRIVATE = 3;
  // postList: IPost[] = [];
  currentUser: IAppUser;
  constructor(public postService: PostService,
              private router: Router) {
    postService.getAllFriendPost().subscribe(next =>{
      this.postService.postListNewFeed = next.reverse();
    });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });

    this.isLogin();
  }

  ngOnInit(): void {
  }

  isLogin(){
    let loginUser = localStorage.getItem("currentUser");
    if (loginUser == null) {
      this.router.navigate(['/login']);
    }
  }





}
