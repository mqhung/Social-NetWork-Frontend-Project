import {Component, Input} from '@angular/core';
import {IPost} from '../../model/IPost';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {ActivatedRoute, Router} from '@angular/router';
import {LikePostService} from "../../service/like-post.service";
import {ILikePost} from "../../model/ilike-post";
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

  postList: IPost[] = [];

  // @Input() post: IPost;

  constructor(private postService: PostService, private likePostService: LikePostService, private actRoute: ActivatedRoute,
              private router: Router, private jwtService: JwtService, private userService: UserService) {
  }

  ngOnInit(): void {
    // this.checkLikedStatus();
    this.checkLiked(this.id_post, this.id_user);
    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postList = next.reverse();

    });

    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;

    });

  }

  deletePost(postId: number) {
    if (confirm('delete this post')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.router.navigate(['/timeline']);
      });
    }
  }

  // likePost = {
  //   id: null,
  //   postId: null,
  //   likerId: null,
  // };
  //
  // liked: boolean;
  // likeList: ILikePost[];

  // checkLikedStatus() {
  //   this.liked = false;
  //   this.likePostService.findAllLikePost().subscribe(
  //     res => {
  //       this.likeList = <ILikePost[]>res;
  //       for (let i = 0; i < this.likeList.length; i++) {
  //         if (this.actRoute.snapshot.params.id == null || !window.location.href.includes('timeline')) {
  //           if (this.likeList[i].likerId === this.jwtService.currentUserValue.id) {
  //             this.liked = true;
  //           }
  //         } else {
  //           if (this.likeList[i].likerId === this.jwtService.currentUserValue.id) {
  //             this.liked = true;
  //           }
  //         }
  //       }
  //     }
  //   )
  // }
  //
  // likeAPost() {
  //   this.likePost.postId = this.post.id;
  //   this.likePost.likerId = this.jwtService.currentUserValue.id;
  //   this.likePostService.newLikePost(this.likePost).subscribe(
  //     res => {
  //       this.checkLikedStatus();
  //       this.post.postLike++;
  //       this.router.navigate(['/timeline']);
  //     }
  //   );
  // }
  //
  // unLikeAPost() {
  //   this.likePostService.findAllLikePost().subscribe(
  //     res => {
  //       this.likeList = <ILikePost[]>res;
  //       for (let i = 0; i < this.likeList.length; i++) {
  //         if (this.likeList[i].likerId === this.jwtService.currentUserValue.id && this.likeList[i].postId === this.post.id) {
  //           this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
  //           this.post.postLike--;
  //           this.liked = false;
  //         }
  //       }
  //     }
  //   )
  // }

  @Input() id_post: number;
  id_user: any;
  checkLike: any;
  like: ILikePost = {};
  likess: any;
  // posts: IPost = {};
  user: IAppUser[];
  // users: any;
  id_like: any;
  count_like: any = 0;

  checkLiked(id_post: number, id_user: number) {
    this.likePostService.getLike(id_post, id_user).subscribe(value => {
      this.countLike(id_post);
      this.getUserLikePost(id_post);
      if (value == null) {
        this.checkLike = false;
      } else {
        this.checkLike = true;
        this.id_like = value.id;
      }
    }, error => {
      this.checkLike = false;
    });
  }


  likes(id_post: number, id_user: number) {
    this.postService.getPostById(id_post).subscribe(value => {
      this.like.postId = value;
      console.log(value);
      this.userService.findUserById(id_user).subscribe(value1 => {
        // @ts-ignore
        this.like.userId = value1;
        console.log(value1);
        this.likePostService.create(this.like).subscribe(value2 => {
          console.log(value2);
          this.checkLiked(id_post, id_user);
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));
  }

  unlike(id_like: number) {
    this.likePostService.delete(id_like).subscribe(value => {
      this.checkLiked(this.id_post, this.id_user);
    }, error => console.log(error));
  }

  countLike(id_post: number) {
    this.likePostService.countLike(id_post).subscribe(value => {
      this.count_like = value;
    }, error => console.log(error));
  }

  getUserLikePost(id_post: number) {
    this.likePostService.getAllByPost(id_post).subscribe(value => {
      this.likess = value;
      console.log(value);
    }, error => console.log(error));
  }

}
