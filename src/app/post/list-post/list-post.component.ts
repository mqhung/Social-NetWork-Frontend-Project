import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/IPost';
import {PostService} from '../../service/post/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {

  @Input()
  currentUserId: number;

  postList: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {

    this.postService.getAllPostByUserId(this.currentUserId).subscribe(next => {
      this.postList = next;
    });

  }

}
