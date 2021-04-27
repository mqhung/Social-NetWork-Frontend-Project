import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {PostService} from '../../service/post/post.service';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {

  postList: IPost[] = [];
  currentUser: IAppUser;
  constructor(private postService: PostService,
              private router: Router) {
   postService.getAllFriendPost().subscribe(next =>{
     this.postList = next.reverse();
   });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }
  deletePost(postId: number) {
    if (confirm('delete this post')){
      this.postService.deletePost(postId).subscribe(() => {
        this.router.navigate(['/new-feed']);
      });

    }
  }
}
