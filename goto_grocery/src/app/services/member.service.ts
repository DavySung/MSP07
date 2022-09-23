import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MemberDTO } from '../models/MemberDTO';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class MemberService {
    baseURL = environment.backendAPI;

    constructor(private http: HttpClient,) { }

    //will return all the members from backend
    async getMembersDetails() {
        return await firstValueFrom(
            this.http.get<MemberDTO[]>(`${this.baseURL}/getMembers`)
        );
    }

}