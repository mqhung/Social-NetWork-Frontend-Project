import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/IPost';
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

  postList: IPost[] = [];

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postList = next.reverse();

    });

    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;

    });

  }

  deletePost(postId: number) {
    if (confirm('delete this post')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.router.navigate(['/timeline']);
      });
    }
  }

}
