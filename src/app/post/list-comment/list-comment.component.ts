import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../comment';
import {CommentService} from '../comment.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  comments: Comment[] = [];
  @Input()
  postId: number;

  constructor(private commentService: CommentService,
              private activatedRouter: ActivatedRoute) {
    // this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
    //   let id = +paraMap.get('postId');
    //   // @ts-ignore
    //   this.showComment(id);
    // });

  }

  ngOnInit(): void {
    this.showComment();
  }

  showComment(){
    this.commentService.getAllComment(this.postId).subscribe(commentList => {
      this.comments = commentList;
    });
  }

}
