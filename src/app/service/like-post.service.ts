import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ILikePost} from "../model/ilike-post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikePostService {
  private API_URL = environment.URL + 'likepost'

  constructor(private http: HttpClient) {
  }

  // newLikePost(likePost: ILikePost): Observable<ILikePost> {
  //   return this.http.post<ILikePost>(this.API_URL + '/create', likePost)
  // }
  //
  // findAllLikePost() {
  //   return this.http.get(this.API_URL)
  // }
  //
  // unLikeAPost(id: number): Observable<any> {
  //   return this.http.delete(this.API_URL + '/delete/' + id)
  // }
  //
  // findLikerByPostId(postId) {
  //   return this.http.get(this.API_URL + '/findLikerByPostId/' + postId)
  // }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id);
  }

  create(likePost: ILikePost): Observable<ILikePost> {
    return this.http.post<ILikePost>(this.API_URL, likePost);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id);
  }


  getLike(id1: number, id2: number): Observable<ILikePost> {
    return this.http.get(this.API_URL + '/find?id1=' + id1 + '&id2=' + id2);
  }

  countLike(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/count/' + id);
  }

  getAllByPost(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/list/' + id);
  }
}
