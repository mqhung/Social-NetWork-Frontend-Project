import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../model/comment';
import {CommentService} from '../../service/comment.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  comments: Comment[] = [];
  // sub: Subscription;
  // id: number;
  // comment: Comment = {
  //   id: 0,
  //   appUser: {
  //     id: 0,
  //     username: '',
  //     password: '',
  //     birthday: null,
  //     firstName: '',
  //     lastName: '',
  //     gender: '',
  //     phone: 0,
  //     email: 'dattb28@gmail.com',
  //     address: '',
  //     avatar: '',
  //     createdDate: null,
  //     blocked: false,
  //     appRole: {
  //       id: 0,
  //       name: ''
  //     }
  //   },
  //   postId: 0,
  //   content: '',
  //   createdTime: null
  // };
  @Input()
  postId: number;

  constructor(private router: Router,
              private commentService: CommentService,
              private activatedRouter: ActivatedRoute) {
    // this.sub = this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
    //   this.id = Number(paraMap.get('id'));
    //   this.getById(this.id);
    // });

  }

  ngOnInit(): void {
    this.showComment();
  }

  showComment() {
    this.commentService.getAllComment(this.postId).subscribe(commentList => {
      this.comments = commentList;
    });
  }

  // getById(id: number) {
  //   this.commentService.getById(id).subscribe(comment => {
  //     this.comment = comment;
  //   });
  // }
  //
  // edit() {
  //   this.commentService.updateComment(this.comment.id, this.comment).subscribe(() => {
  //     this.router.navigate(['/timeline']);
  //   });
  // }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.router.navigate(['/new-feed']);
    });
  }

}
