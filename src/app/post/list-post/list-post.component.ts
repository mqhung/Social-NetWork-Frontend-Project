import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class ListPostComponent {

  @Input()
  guestUserId: number;
  guest = -1;
  currentUser: IAppUser = {
    id: -1,
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
    appRole: null
  };


  isFriend = false;

  PUBLIC = 1;
  FRIEND_ONLY = 2;
  PRIVATE = 3;


  constructor(public postService: PostService,
              private friendService: FriendService) {
    // this.postService.getCurrentUser().subscribe(next => {
    //   this.currentUser = next;
    // });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });

  }

  ngOnInit(): void {
    // this.friendService.checkFriend(this.currentUser.id, this.guestUserId).subscribe(next => {
    //   let friend = 2;
    //   if (next == friend) {
    //     this.isFriend = true;
    //     console.log(this.isFriend)
    //
    //   }
    // });
    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postService.postListTimeline = next.reverse();

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
      });
    }
  }

}
