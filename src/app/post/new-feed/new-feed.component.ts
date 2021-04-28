import {Component, Input, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {PostService} from '../../service/post/post.service';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';
import {ActivatedRoute, Router} from '@angular/router';
import {ILikePost} from "../../model/ilike-post";
import {LikePostService} from "../../service/like-post.service";

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {

  postList: IPost[] = [];
  currentUser: IAppUser;
  constructor(private postService: PostService,private likePostService: LikePostService,private actRoute: ActivatedRoute,
              private router: Router) {
   postService.getAllFriendPost().subscribe(next =>{
     this.postList = next.reverse();
   });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }
  deletePost(postId: number) {
    if (confirm('delete this post')){
      this.postService.deletePost(postId).subscribe(() => {
        this.router.navigate(['/new-feed']);
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
  // @Input() post: IPost;
  // checkLikedStatus() {
  //   this.liked = false;
  //   this.likePostService.findAllLikePost().subscribe(
  //     res => {
  //       this.likeList = <ILikePost[]>res;
  //       for (let i = 0; i < this.likeList.length; i++) {
  //         if (this.actRoute.snapshot.params.id == null || !window.location.href.includes('timeline')) {
  //           if (this.likeList[i].likerId === this.currentUser.id) {
  //             this.liked = true;
  //           }
  //         } else {
  //           if (this.likeList[i].likerId === this.currentUser.id) {
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
  //   // this.likePost.likerId = this.currentUser.id;
  //   this.likePostService.newLikePost(this.likePost).subscribe(
  //     res => {
  //       this.checkLikedStatus();
  //       this.post.postLike++;
  //       // this.router.navigate(['/timeline']);
  //     }
  //   );
  // }
  //
  // unLikeAPost() {
  //   this.likePostService.findAllLikePost().subscribe(
  //     res => {
  //       this.likeList = <ILikePost[]>res;
  //       for (let i = 0; i < this.likeList.length; i++) {
  //         if (this.likeList[i].likerId === this.currentUser.id && this.likeList[i].postId === this.post.id) {
  //           this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
  //           this.post.postLike--;
  //           this.liked = false;
  //         }
  //       }
  //     }
  //   )
  // }
}
