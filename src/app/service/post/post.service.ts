import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPost} from '../../model/IPost';
import {Observable} from 'rxjs';
import {IAppUser} from '../../model/IAppUser';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {

  }

  private postURL = environment.URL + 'post/';

  getAllPost(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postURL + 'get-all-post').pipe();

  }

  getAllPostByUserId(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postURL + 'get-all-post-by-user-id' + id).pipe();
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(this.postURL + 'get-post/' + id).pipe();
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.postURL + 'delete-post/' + id).pipe();
  }

  addNewPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.postURL + 'create-new-post', post);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(this.postURL + 'update-post', post);
  }

  getCurrentUser(): Observable<IAppUser> {
    return this.http.get<IAppUser>(this.postURL + 'get-current-user').pipe();
  }
}
