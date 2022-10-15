import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken = this.tokenService.getToken();
        if (authToken !== null && authToken?.token !== null) {
            // req.headers.append("Authorization", `Bearer ${token}`);
            req = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
                    .set("Authorization", `Bearer ${authToken}`)
            });
        }
        return next.handle(req).pipe(catchError(res => {
            if (res.ok === false && res.status === 401) {
                this.tokenService.clearToken();
                this.router.navigate(['login']);
            }
            return throwError(() => res);
        }))
    }
}