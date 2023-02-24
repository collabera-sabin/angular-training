import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://tenam.onrender.com';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fetch`)
      .pipe(
        map(x => x),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert`, data)
      .pipe(
        map(x => x),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
  deleteData(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, {p_id: id})
      .pipe(
        map(x => x),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
  updateData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, data)
      .pipe(
        map(x => x),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}
