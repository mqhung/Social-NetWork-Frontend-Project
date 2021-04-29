import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {PostService} from '../../service/post/post.service';
import {LikeCommentService} from '../../service/like-comment.service';
import {JwtService} from '../../service/auth/jwt.service';
import {ILikeComment} from '../../model/ilike-comment';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-like-comment',
  templateUrl: './like-comment.component.html',
  styleUrls: ['./like-comment.component.css']
})
export class LikeCommentComponent implements OnInit {
  @Input() comment: Comment;
  likeComment = {
    id: 0,
    commentId: 0,
    likerId: 0,
  };
  likedCommentList: ILikeComment[];

  commentLiked: boolean;
  constructor(private userService: UserService, private postService: PostService,
              private likeCommentService: LikeCommentService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
  }

  likeComments(){
    this.likeComment.commentId = this.comment.id;
    console.log(this.comment.id);
    this.likeComment.likerId = this.jwtService.currentUserValue.id;
    this.likeCommentService.newLikeComment(this.likeComment).subscribe(
      response => {
        this.commentLiked = true;
        this.comment.commentLike++;
      }
    )
  }

  unLikeComments(){
    this.likeCommentService.findAllLikeCommentByCommentId(this.comment.id).subscribe(
      response => {
        this.likedCommentList = <ILikeComment[]> response;
        for (let i = 0; i < this.likedCommentList.length; i++) {
          if(this.likedCommentList[i].likerId == this.jwtService.currentUserValue.id
          && this.likedCommentList[i].commentId == this.comment.id){
            this.likeCommentService.unLikeComment(this.likedCommentList[i].id).subscribe(
              response => {
                this.commentLiked = false;
                this.comment.commentLike--;
              }
            )
          }
        }
      }
    )
  }

  checkCommentLike(){
    this.commentLiked = false;
    this.likeCommentService.findAllLikeCommentByCommentId(this.comment.id).subscribe(
      response => {
        this.likedCommentList = <ILikeComment[]> response;
        for (let i = 0; i <this.likedCommentList.length; i++) {
          if(this.likedCommentList[i].likerId == this.jwtService.currentUserValue.id){
            this.commentLiked = true;
          }
        }
      }
    )
  }
}
