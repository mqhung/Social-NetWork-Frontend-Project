import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PostService} from '../../service/post/post.service';
import {IPost} from '../../model/IPost';
import {IAppUser} from '../../model/IAppUser';

@Component({
  selector: 'app-personnal-page',
  templateUrl: './personnal-page.component.html',
  styleUrls: ['./personnal-page.component.css']
})
export class PersonnalPageComponent implements OnInit {

  postList: IPost[] = [];

  currentUser: any;



  constructor(private storage: AngularFireStorage,
              private router: Router,
              private postService: PostService) {
    this.postService.getAllPost().subscribe(next => {
        this.postList = next;
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

}
