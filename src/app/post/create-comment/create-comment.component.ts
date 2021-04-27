import {Component, Input, OnInit, Output} from '@angular/core';
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
  comment: Comment = {
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
              private postService: PostService,
              // public listComment: ListCommentComponent
  ) {
    this.postService.getCurrentUser().subscribe(next => {
      this.comment.appUser = next;

    });
  }

  ngOnInit(): void {
    this.comment.postId = this.postId;
  }

  showComment() {
    this.commentService.getAllComment(this.postId).subscribe(commentList => {
      // @ts-ignore
      this.comments = commentList;
    });
  }

  createComment() {
    this.commentService.createComment(this.comment).subscribe(() => {
      // this.comments.content = '';
      // this.router.navigate(['timeline']);
      // this.comments = next;
      // this.commentService.getAllComment(this.postId).subscribe(next => {
      //  let  listCommentComponent: ListCommentComponent;
      //   listCommentComponent.comments.push(next);
      // });
      // this.postService.getCurrentUser().subscribe(next => {
      //   this.comments.appUser = next;
      // });
      this.showComment();
    });
  }
}
