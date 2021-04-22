import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  // @ts-ignore
  // comments: Comment = {
  //   id: 0,
  //   appUser: '',
  //   postId: '',
  //   content: '',
  //   createdTime: ''
  // };

  constructor(private router: Router,
              private commentService: CommentService,
  ) {
  }

  ngOnInit(): void {
  }

  // createComment() {
  //   this.commentService.createComment(this.comments).subscribe(() => {
  //     this.router.navigate(['/']);
  //   });
  // }

}
