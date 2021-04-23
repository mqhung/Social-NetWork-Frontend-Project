import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CommentService} from '../comment.service';
import {Comment} from '../comment';
import {Subscription} from 'rxjs';

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
      birthday: '',
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      avatar: '',
      createdDate: '',
      blocked: false,
      roles: {
        id: 0,
        name: ''
      }
    },
    postId: 0,
    content: '',
    createdTime: ''

  };

  constructor(private router: Router,
              private commentService: CommentService,
  ) {
  }

  ngOnInit(): void {
  }

  createComment() {
    // @ts-ignore
    this.commentService.createComment(this.comments.postId, this.comments).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
