import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MemberDTO } from '../models/MemberDTO';
import { MemberRegisterDTO } from '../models/MemberRegisterDTO';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { ResponseDTO } from '../models/ResponseDTO';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    baseURL = environment.backendAPI;

    constructor(private http: HttpClient,) { }

    //will return all the members from backend
    async getMembersDetails() {
        return await firstValueFrom(
            this.http.get<any>(`${this.baseURL}/members/get`)
        );
    }

    //will delete a transaction
    async deleteMember(member: MemberDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/members/delete`, member, options)
        );
    }

    //will create a transaction
    async createMember(member: MemberRegisterDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/members/create`, member, options)
        );
    }

    //will update a transaction
    async updateMember(member: MemberDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/members/update`, member, options)
        );
    }
}