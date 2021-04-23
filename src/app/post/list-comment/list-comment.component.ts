import {Component, OnInit} from '@angular/core';
import {Comment} from '../comment';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  comment: Comment[] = [];

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
  }

  showComment(postId: number): Comment[] {
    this.commentService.getAllComment(postId).subscribe(comments => {
      this.comment = comments;
    });
    return this.comment;
  }

}
