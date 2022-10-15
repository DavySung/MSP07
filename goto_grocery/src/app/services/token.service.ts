import { Injectable } from "@angular/core";
import { AuthToken } from "../models/AuthToken";
import { LocalStorageService } from "./global.service";
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private currentUserSubject = new BehaviorSubject<AuthToken | null>(null);

    constructor(private localStorageService: LocalStorageService) {
        var token = this.getToken();
        if (token) {
            this.currentUserSubject.next(token)
        }
    }

    getToken() {
        let tokenObj = this.localStorageService.getItem('auth_token');
        if (tokenObj === null) return null;

        let parsed: AuthToken = JSON.parse(tokenObj!);
        return parsed;
    }

    setToken(authToken: AuthToken) {
        console.log(authToken)
        this.localStorageService.setItem('auth_token', JSON.stringify(authToken.token));
        this.currentUserSubject.next(authToken);
    }

    clearToken() {
        this.localStorageService.removeItem('auth_token');

        if (this.currentUserSubject.value) {
            this.currentUserSubject.next(null);
        }
    }

    isLoggedIn() { return this.currentUserSubject.asObservable(); }

    public get IsAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    public get role(): string | null {
        let tokenObj = this.getToken()
        if (tokenObj === null) return null;

        const decoded: any = jwt_decode(tokenObj.token);

        return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
}