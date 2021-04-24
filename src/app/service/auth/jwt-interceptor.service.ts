import { Injectable } from '@angular/core';
import {JwtService} from './jwt.service';
import {HttpEvent, HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private jwtService: JwtService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const currentUser = this.jwtService.currentUserValue;
    if (currentUser && currentUser.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
