import {Component, Input, OnInit} from '@angular/core';

import { Router} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  comments: Comment = {
    id: 0,
    appUser: {
      id: 0,
      username: '',
      password: '',
      birthday: null,
      firstName: '',
      lastName: '',
      gender: '',
      phone: 0,
      email: '',
      address: '',
      avatar: '',
      createdDate: null,
      blocked: false,
      appRole: {
        id: 0,
        name: ''
      }
    },
    postId: 0,
    content: '',
    createdTime: null

  };

  constructor(private router: Router,
              private commentService: CommentService,
  ) {
    //goi onload
  }

  ngOnInit(): void {
    this.createComment();
  }

  @Input()
  postId: number;

  createComment() {
    // @ts-ignore
    this.commentService.createComment(this.comments.postId, this.comments).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
