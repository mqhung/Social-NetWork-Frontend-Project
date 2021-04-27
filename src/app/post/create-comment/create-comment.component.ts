import {Component, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CommentService} from '../../service/comment.service';
import {Comment} from '../../model/comment';
import {PostService} from '../../service/post/post.service';
import {ListCommentComponent} from '../list-comment/list-comment.component';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
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
              private postService: PostService,
              // public listComment: ListCommentComponent
  ) {
    this.postService.getCurrentUser().subscribe(next => {
      this.comments.appUser = next;

    });
  }

  ngOnInit(): void {
    this.comments.postId = this.postId;
  }

  @Output()
  listComment: Comment[];

  createComment() {
    this.commentService.createComment(this.comments).subscribe(next => {
      this.comments.content = '';
      // this.router.navigate(['timeline']);
      // this.comments = next;
      // this.commentService.getAllComment(this.postId).subscribe(next => {
       let  listCommentComponent: ListCommentComponent;
        listCommentComponent.comments.push(next);
      // });
    });
  }
}
