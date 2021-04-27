import {Component, OnInit} from '@angular/core';
import {PostService} from '../../service/post/post.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {IPostStatus} from '../../model/i-post-status';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: IPost;
  id: number;

  listPostStatus: IPostStatus[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private storage: AngularFireStorage,
    private activatedRouter: ActivatedRoute) {
    this.activatedRouter.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = +paraMap.get('id');
    });
    this.postService.getPostById(this.id).subscribe(next => {
      this.post = next;
    });
    this.postService.getAllPostStatus().subscribe(next => {
      for (let i = 0; i < next.length; i++) {
        this.listPostStatus.push(next[i]);

      }
    });
  }

  ngOnInit(): void {
    // console.log(this.post);
  }


  title = 'cloudsStorage';
  selectedFile: File = null;
  img;
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
              this.img = url;
            }
            console.log(this.img);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);

        }
      });
  }

  updatePost() {
    if (this.img!=null){
      this.post.image = this.img;
    }
    this.postService.addNewPost(this.post).subscribe(() => {
      this.router.navigateByUrl('/post/timeline');

    });
  }

  deleteImage() {
    this.post.image = null;
    this.img = null;
  }
}
