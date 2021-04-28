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

  // postList: IPost[] = [];
  currentUser: IAppUser;
  constructor(public postService: PostService,
              private router: Router) {
   postService.getAllFriendPost().subscribe(next =>{
     this.postService.postListNewFeed = next.reverse();
     // this.postService.postListTimeline =null;
   });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }
  deletePost(postId: number) {
    if (confirm('delete this post')){
      this.postService.deletePost(postId).subscribe(post => {
        for (let i = 0; i < this.postService.postListNewFeed.length; i++) {
          if (this.postService.postListNewFeed[i].id==post.id){
            this.postService.postListNewFeed.splice(i,1)
          }
        }
        // this.router.navigate(['/new-feed']);
      });

    }
  }
}
