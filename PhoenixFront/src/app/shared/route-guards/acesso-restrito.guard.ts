import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoRestritoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      let tokenExpirado = true;

      if (token) {
        tokenExpirado = this.checarTokenExpirado(token);
      }

      if (tokenExpirado) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
  }

  checarTokenExpirado(token: string): boolean {
    try {
      const expiracaoToken = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date()).getTime() / 1000)) >= expiracaoToken;
    }
    catch (e) {
      return true;
    }
  }
}
