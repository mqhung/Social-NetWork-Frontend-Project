import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {Router} from '@angular/router';
import {CommentService} from '../../service/comment.service';
import {Comment} from '../../model/comment';

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

  constructor(private router: Router,
              private commentService: CommentService,
  ) {
  }

  ngOnInit(): void {
    this.comments.postId = this.postId;
  }

  @Input()
  postId: number;

  createComment() {
    // @ts-ignore
    // this.comments.content = this.tempContent;
    this.commentService.createComment(this.comments).subscribe(() => {
      // this.router.navigate(['/']);
    });
  }
}
