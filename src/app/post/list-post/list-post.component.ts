import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/IPost';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from "../../model/IAppUser";

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

  constructor(private postService: PostService) {
    this.postService.getCurrentUser().subscribe(next =>{
      this.currentUser =next;
    })
  }

  ngOnInit(): void {

    this.postService.getAllPostByUserId(this.guestUserId).subscribe(next => {
      this.postList = next;
    });

  }

}
