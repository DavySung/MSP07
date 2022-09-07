import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TransactionDTO } from './models/TransactionDTO';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SalesService {
    baseURL = environment.backendAPI;

    constructor(private http: HttpClient) { }

    //will return all the members from backend
    async getTransactions() {
        return await firstValueFrom(
            this.http.get<TransactionDTO[]>(`${this.baseURL}/getInventory`)
        );
    }

}