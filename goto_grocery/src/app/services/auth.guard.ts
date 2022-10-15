import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let url: string = state.url;
        return this.checkUserLogin(route, url);
    }

    async checkUserLogin(route: ActivatedRouteSnapshot, url: any): Promise<boolean> {
        let authToken = this.tokenService.getToken();
        if (authToken === null || authToken?.token === null) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}