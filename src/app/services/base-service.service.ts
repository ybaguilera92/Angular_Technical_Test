import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


export class BaseService<T> {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string,
    ) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    get(): Observable<T[]> {
        return this.httpClient
            .get<T[]>(`${this.url}/${this.endpoint}/`)
            .pipe(
                retry(2),

            )
    }

    getById(id: any): Observable<T> {
        return this.httpClient
            .post<T>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
            .pipe(
                retry(2),

            )
    }

    create(item: T): Observable<T> {
        return this.httpClient.post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
            .pipe(
                retry(2),

            )
    }

    update(item: T, parm: string): Observable<T> {
        return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${parm}/`, JSON.stringify(item), this.httpOptions)
            .pipe(
                retry(2),

            )
    }

    delete(item: T) {
        return this.httpClient.post<T>(`${this.url}/${this.endpoint}/${item}/Remove`, this.httpOptions)
            .pipe(
                retry(2),

            )
    }

}