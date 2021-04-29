import {Component, Input} from '@angular/core';
import {IPost} from '../../model/IPost';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {ActivatedRoute, Router} from '@angular/router';
import {ILikePost} from "../../model/ilike-post";
import {LikePostService} from "../../service/like-post.service";
import {JwtService} from "../../service/auth/jwt.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {

  @Input()
  guestUserId: number;

  currentUser: IAppUser;

  PUBLIC = 1;
  FRIEND_ONLY = 2;
  PRIVATE = 3;


  constructor(public postService: PostService,
              private router: Router, private actRoute: ActivatedRoute, private likePostService: LikePostService, private jwtService: JwtService, private userService: UserService) {
    // this.postList = this.postService.postList;
  }

  ngOnInit(): void {

    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postService.postListTimeline = next.reverse()
      // this.postService.postListNewFeed =null
    });

    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });

  }

  deletePost(postId: number) {
    if (confirm('delete this post')) {
      this.postService.deletePost(postId).subscribe(next => {
        for (let i = 0; i < this.postService.postListTimeline.length; i++) {
          if (next.id == this.postService.postListTimeline[i].id) {
            this.postService.postListTimeline.splice(i, 1);
          }
        }

        // this.router.navigate(['/timeline']);
      });
    }
  }

  likePost: ILikePost = {
    id: null,
    postId: null,
    likerId: null,
  };

  @Input() post: IPost;
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

  likeAPost(id: number) {
    this.likePost.postId = id;
    this.likePost.likerId = this.jwtService.currentUserValue.id;
    this.likePostService.newLikePost(this.likePost).subscribe(
      res => {
        this.checkLikedStatus();
        this.post.postLike++;
      }
    );
  }

  unLikeAPost(id: number) {
    // this.likePost.postId = id;
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = <ILikePost[]>res;
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.likeList[i].likerId === this.jwtService.currentUserValue.id && this.likeList[i].postId === id) {
            this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
            this.post.postLike--;
            this.liked = false;
          }
        }
      }
    )
  }


}
