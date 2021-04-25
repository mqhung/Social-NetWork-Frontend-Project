import {Component, Input, OnInit} from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {PostService} from '../../service/post/post.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.css']
})
export class GuestPageComponent implements OnInit {


  guestUserId: number;

  guestUser: IAppUser;

  constructor(private postService: PostService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {

    this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
      let id = +paraMap.get('id');
      this.guestUserId = id;
      this.postService.getCurrentUser().subscribe(next =>{
        let currentUserId = next.id;
        if (currentUserId==this.guestUserId){
          this.router.navigate(['/timeline'])
        }
      })
    });
  }

  ngOnInit(): void {
    this.postService.getUserById(this.guestUserId).subscribe(next => {
      this.guestUser = next;
    });
  }


}
