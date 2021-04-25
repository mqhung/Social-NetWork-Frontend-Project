import {Component, OnInit} from '@angular/core';
import {IAppUser} from '../../model/IAppUser';
import {PostService} from '../../service/post/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: IAppUser;


  constructor(private postService: PostService) {
    this.postService.getAllPostStatus().subscribe(next =>{
      for (let i = 0; i < next.length; i++) {
      }
    })
  }

  ngOnInit(): void {
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;

    });
  }

}
