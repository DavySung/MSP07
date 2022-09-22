import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductDTO } from '../models/ProductDTO';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    baseURL = environment.backendAPI;

    constructor(private http: HttpClient) { }

    //will return all the members from backend
    async getInventory() {
        return await firstValueFrom(
            this.http.get<ProductDTO[]>(`${this.baseURL}/getInventory`)
        );
    }

}