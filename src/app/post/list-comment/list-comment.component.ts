import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../model/comment';
import {CommentService} from '../../service/comment.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {Subscription} from 'rxjs';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {FriendService} from '../../service/friend.service';

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
  comment: Comment = {
    id: 0,
    appUser: null,
    postId: 0,
    content: '',
    createdTime: null,
    commentLike: null
  };
  userFriend: IAppUser;
  userPosted: IAppUser;
  currentUser: IAppUser;
  @Input()
  postId: number;

  constructor(private router: Router,
              private commentService: CommentService,
              private postService: PostService
  ) {
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
    this.postService.getPostById(this.postId).subscribe(next => {
      this.userPosted = next.appUser;
    });
    this.showComment();
    this.comment.postId = this.postId;
  }

  showComment() {
    this.commentService.getAllComment(this.postId).subscribe(commentList => {
      this.comments = commentList;
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(deleteComment => {
      this.showComment();
    });
  }

  createComment() {
    if (this.comment.createdTime == null) {
      this.commentService.createComment(this.comment).subscribe(next => {
        this.comments.push(next);
        this.comment.content = '';
        this.comment.createdTime = null;
      });
    } else {
      this.updateComment();
      this.comment.createdTime = null;
      this.comment.content = '';
    }

  }

  updateComment() {
    this.commentService.updateComment(this.comment.id, this.comment).subscribe(() => {
      this.showComment();
    });
  }

  getCommentById(id: number) {
    this.commentService.getById(id).subscribe(next => {
      this.comment = next;
      for (let i = 0; i < this.comments.length; i++) {
        if (next.id == this.comments[i].id) {
          this.comments.splice(i, 1);
        }
      }
    });
  }
}
