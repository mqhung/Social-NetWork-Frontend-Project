import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from './comment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getAllComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(API_URL + '/comments');
  }

  createComment(comment: Comment, postId: number): Observable<Comment> {
    return this.httpClient.post<Comment>(API_URL + `/comments/create/${postId}`, comment);
  }

  getById(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(API_URL + `/comments/${id}`);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(API_URL + `/comments/edit/${id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(API_URL + `/comments/delete/${id}`);
  }
}
