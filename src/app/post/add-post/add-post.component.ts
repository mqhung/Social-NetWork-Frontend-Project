import {Component, Input, OnInit} from '@angular/core';
import {IPost} from '../../model/IPost';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {ListPostComponent} from '../list-post/list-post.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input()
  userId: number;
  post: IPost = {
    id: null,
    appUser: null,
    content: '',
    createdTime: null,
    image: null,
    status: null,
  };
  currentUser: IAppUser;

  constructor(              private storage: AngularFireStorage,
              private postService: PostService,
              private router: Router) {
    postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
    });
  }

  ngOnInit(): void {
  }


  title = 'cloudsStorage';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  onFileSelected(event) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);

        }
      });
  }

  createPost() {
    this.post.image = this.fb;
    this.postService.addNewPost(this.post).subscribe(posted => {
      this.deleteImage();
      this.post.content = '';

      this.router.navigate(['/timeline']);

    });
  }

  deleteImage() {
    this.fb = null;
  }
}
