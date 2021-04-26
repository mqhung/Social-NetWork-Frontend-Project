import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CommentService} from '../../service/comment.service';
import {Comment} from '../../model/comment';
import {PostService} from '../../service/post/post.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  // tempContent: string;
  comments: Comment = {
    id: 0,
    appUser: null,
    postId: 0,
    content: '',
    createdTime: null

  };

  @Input()
  postId: number;


  constructor(private router: Router,
              private commentService: CommentService,
              private postService: PostService
  ) {
    this.postService.getCurrentUser().subscribe(next => {
      this.comments.appUser = next;
    });
  }

  ngOnInit(): void {
    this.comments.postId = this.postId;
  }


  createComment() {
    this.commentService.createComment(this.comments).subscribe(() => {
      // this.router.navigate(['timeline']);
      this.postService.getCurrentUser().subscribe(next => {
        this.comments.appUser = next;
      });
    });
  }
}
