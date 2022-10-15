import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthToken } from '../models/AuthToken';
import { LoginDTO } from '../models/LoginDTO';
import { ResponseDTO } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';


import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseURL = environment.backendAPI;


    constructor(private http: HttpClient, private tokenService: TokenService) { }

    async login(loginDto: LoginDTO) {
        return await firstValueFrom(this.http.post<AuthToken>(`${this.baseURL}/authenticate/login`, loginDto));
    }
};
