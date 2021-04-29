import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {
  private likeComment_URL = environment.URL + 'like/comment/'
  constructor(private HttpClient: HttpClient) { }

  newLikeComment(likeComment){
    return this.HttpClient.post(this.likeComment_URL, likeComment);
  }

  findAllLikeComment(){
    return this.HttpClient.get(this.likeComment_URL);
  }

  unLikeComment(id){
    return this.HttpClient.delete(this.likeComment_URL + id)
  }

  findAllLikeCommentByCommentId(commentId: number) {
    return this.HttpClient.get(this.likeComment_URL + 'findByCommentId/' + commentId)
  }

  findLikerByCommentId(commentId: any) {
    return this.HttpClient.get(this.likeComment_URL + 'findLikerByCommentId/' + commentId)
  }
}
