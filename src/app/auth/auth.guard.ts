import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.authService.user$
      .map( user => {
        if ( user && user.uid) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      });
  }
}
