import {Component, Input} from '@angular/core';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {Router} from '@angular/router';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {

  @Input()
  guestUserId: number;

  currentUser: IAppUser;

  PUBLIC = 1;
  FRIEND_ONLY = 2;
  PRIVATE = 3;


  constructor(public postService: PostService,
              private router: Router) {
    // this.postList = this.postService.postList;
  }

  ngOnInit(): void {

    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postService.postListTimeline = next.reverse()
      // this.postService.postListNewFeed =null
    });

    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });

  }

  deletePost(postId: number) {
    if (confirm('delete this post')) {
      this.postService.deletePost(postId).subscribe(next => {
        for (let i = 0; i < this.postService.postListTimeline.length; i++) {
          if (next.id == this.postService.postListTimeline[i].id) {
            this.postService.postListTimeline.splice(i, 1);
          }
        }

        // this.router.navigate(['/timeline']);
      });
    }
  }

}
