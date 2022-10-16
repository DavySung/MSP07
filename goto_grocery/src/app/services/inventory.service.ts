import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductDTO } from '../models/ProductDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/ResponseDTO';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventory: ProductDTO;
  baseURL = environment.backendAPI + "/products";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseURL + "/get");
  }

  create(product: ProductDTO): Observable<any> {
    return this.http.post(this.baseURL + "/create", product);
  }

  update(product: ProductDTO): Observable<any> {
    return this.http.post<any>(this.baseURL + "/update", product);
  }

  delete(product: ProductDTO): Observable<any> {
    return this.http.post(this.baseURL + "/delete", product);

  }

}