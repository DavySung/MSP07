import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TransactionDTO } from '../models/TransactionDTO';
import { CreateTransactionDTO } from '../models/CreateTransactionDTO';
import { ResponseDTO } from '../models/ResponseDTO';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class SalesService {
    baseURL = environment.backendAPI;

    constructor(private http: HttpClient) { }

    //will return all the members from backend
    async getTransactions() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.get<TransactionDTO[]>(`${this.baseURL}/transactions/get`, options)
        );
    }

    //will delete a transaction
    async deleteTransactions(transaction: TransactionDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/transactions/delete`, transaction, options)
        );
    }

    //will create a transaction
    async createTransactions(transaction: CreateTransactionDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/transactions/create`, transaction, options)
        );
    }

    //will update a transaction
    async updateTransactions(transaction: TransactionDTO) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        return await firstValueFrom(
            this.http.post<ResponseDTO>(`${this.baseURL}/transactions/update`, transaction, options)
        );
    }

}