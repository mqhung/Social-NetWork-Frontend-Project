import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {IUserToken} from '../../model/IUserToken';
import {Observable} from 'rxjs';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  currentUser: IUserToken;

  constructor(
    private router: Router,
    private jwtService: JwtService
  ) {
    this.jwtService.currentUser.subscribe(currentUser=>{
      this.currentUser = currentUser;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.currentUser){
      return true;
    }
    else{
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}}) ;
      return false;
    }
  }
}
