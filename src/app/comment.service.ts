import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpCLine: HttpClient) {
  }

  getAllComment(): Observable<Comment[]> {
    return this.httpCLine.get<Comment[]>(API_URL + '/comments');
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.httpCLine.post<Comment>(API_URL + '/comments/create/postId', comment);
  }

  getById(id: number): Observable<Comment> {
    return this.httpCLine.get<Comment>(API_URL + `/comments/${id}`);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.httpCLine.put<Comment>(API_URL + `/comments/edit/${id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.httpCLine.delete<Comment>(API_URL + `/comments/delete/${id}`);
  }
}
