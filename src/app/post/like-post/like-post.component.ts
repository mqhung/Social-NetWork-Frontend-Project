import {Component, Input, OnInit} from '@angular/core';
import {ILikePost} from "../../model/ilike-post";
import {IPost} from "../../model/IPost";
import {ActivatedRoute} from "@angular/router";
import {LikePostService} from "../../service/like-post.service";
import {JwtService} from "../../service/auth/jwt.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-like-post',
  templateUrl: './like-post.component.html',
  styleUrls: ['./like-post.component.css']
})
export class LikePostComponent implements OnInit {

  @Input() post: IPost;

  likePost: ILikePost = {
    id: 0,
    postId: 0,
    likerId: 0,
  };

  constructor(private actRoute: ActivatedRoute, private likePostService: LikePostService, private jwtService: JwtService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  liked: boolean;
  likeList: ILikePost[];

  checkLikedStatus() {
    this.liked = false;
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = <ILikePost[]>res;
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.actRoute.snapshot.params.id == null || !window.location.href.includes('timeline')) {
            if (this.likeList[i].likerId === this.jwtService.currentUserValue.id) {
              this.liked = true;
            }
          } else {
            if (this.likeList[i].postId === parseInt(this.actRoute.snapshot.params.id)) {
              if (this.likeList[i].likerId === this.jwtService.currentUserValue.id) {
                this.liked = true;
              }
            }
          }
        }
      }
    )
  }

  likeAPost() {
    this.likePost.postId = this.post.id;
    this.likePost.likerId = this.jwtService.currentUserValue.id;
    this.likePostService.newLikePost(this.likePost).subscribe(
      res => {
        this.checkLikedStatus();
        this.post.postLike++;
      }
    );
  }

  unLikeAPost() {
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = <ILikePost[]>res;
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.likeList[i].likerId === this.jwtService.currentUserValue.id && this.likeList[i].postId === this.post.id) {
            this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
            this.post.postLike--;
            this.liked = false;
          }
        }
      }
    )
  }
}
