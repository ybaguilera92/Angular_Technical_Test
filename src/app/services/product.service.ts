import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, retry } from 'rxjs';
import { EnviromentsService } from './enviroments.service';
import { Product } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers = new HttpHeaders();
  onItemChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient, private environment: EnviromentsService) {
    this.onItemChanged = new BehaviorSubject({});
  }

  getProducts(limit: number): Observable<any> {
    return this.http
      .get<Product>(`${this.environment.getEnviroment().apiUrl}?limit=${limit}`)
      .pipe(
        retry(2)
      );
  }
  getOrder(order: string): Observable<any> {
    return this.http
      .get<Product>(`${this.environment.getEnviroment().apiUrl}?sort=${order}`)
      .pipe(
        retry(2)
      );
  }
  getAll(): Observable<any> {
    return this.http
      .get<Product>(`${this.environment.getEnviroment().apiUrl}`)
      .pipe(
        retry(2)
      );
  }
}
