import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Comment} from '../../model/comment';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  sub: Subscription;
  id: number;
  comment: Comment = {
    id: 0,
    appUser: null,
    postId: 0,
    content: '',
    createdTime: null
  };

  constructor(private router: Router,
              private commentService: CommentService,
              private activatedRouter: ActivatedRoute) {
    this.sub = this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = Number(paraMap.get('id'));
      this.getById(this.id);
    });
  }

  ngOnInit(): void {
  }

  getById(id: number) {
    this.commentService.getById(id).subscribe(comment => {
      this.comment = comment;
    });
  }


  edit() {
    this.commentService.updateComment(this.comment.id, this.comment).subscribe(() => {
      this.router.navigate(['/timeline']);
      this.router.navigate(['/new-feed']);
    });
  }

}
