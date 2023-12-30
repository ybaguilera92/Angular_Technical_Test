import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectMultipleService {

  constructor(private httpClient: HttpClient) { 

  }
  get(): Observable<[]> {
    return this.httpClient
      .get<[]>(`https://sales-dev.crm.digits-inc.com/api/Tax`)
      .pipe(
        retry(2),

      )
  }
}
