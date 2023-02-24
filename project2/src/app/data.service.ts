import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'http://localhost:3000/i';
  institutions:Array<string> = [];
  public loaded$ = new BehaviorSubject<Array<string>>([]);

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
      .pipe(
        map((data: any) => {
          this.institutions = data.map((x: any) => x.name);
          return data
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })).pipe(
          map((x) => {
            this.loaded$.next(this.institutions)
            return x;
          })
        );
  }

  getInstitutionData(q: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${q}`)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}





