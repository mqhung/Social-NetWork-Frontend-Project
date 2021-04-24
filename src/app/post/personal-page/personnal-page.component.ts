import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PostService} from '../../service/post/post.service';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';
import {IPostStatus} from '../../model/i-post-status';

@Component({
  selector: 'app-personnal-page',
  templateUrl: './personnal-page.component.html',
  styleUrls: ['./personnal-page.component.css']
})
export class PersonnalPageComponent implements OnInit {


  currentUser: IAppUser;


  constructor(
    private router: Router,
    private postService: PostService) {
    this.isLogin();
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }
 isLogin(){
   let loginUser = localStorage.getItem("currentUser");
   if (loginUser == null) {
     this.router.navigate(['/login']);
   }
 }
}
