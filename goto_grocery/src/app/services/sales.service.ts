import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TransactionDTO } from '../models/TransactionDTO';
import { CreateTransactionDTO } from '../models/CreateTransactionDTO';
import { ResponseDTO } from '../models/ResponseDTO';
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
            this.http.get<TransactionDTO[]>(`${this.baseURL}/transactions/get`)
        );
    }
    //will delete a transaction
    async deleteTransactions(transaction: TransactionDTO) {
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/transactions/delete`, transaction)
        );
    }
    //will create a transaction
    async createTransactions(transaction: CreateTransactionDTO) {
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/transactions/create`, transaction)
        );
    }

}