import {Component, Input, OnInit} from '@angular/core';
import {LikePostService} from "../../service/like-post.service";
import {IAppUser} from "../../model/IAppUser";

@Component({
  selector: 'app-list-liker-post',
  templateUrl: './list-liker-post.component.html',
  styleUrls: ['./list-liker-post.component.css']
})
export class ListLikerPostComponent implements OnInit {

  constructor(private likePostService: LikePostService) {
  }

  ngOnInit(): void {
    // this.getLikerList();
  }

  @Input() postId;
  likerList: IAppUser[];

  // getLikerList() {
  //   this.likePostService.findLikerByPostId(this.postId).subscribe(
  //     res => {
  //       this.likerList = <IAppUser[]>res;
  //     }
  //   )
  // }
}
