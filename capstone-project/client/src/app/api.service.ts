import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ITokenData } from './interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  public URL = 'https://localhost:5001';
  private authTokenKey = 'auth-token';
  public errorProvider$ = new Subject<string>();
  public loggedIn$ = new BehaviorSubject<boolean>(false);
  public roll$ = new BehaviorSubject<string>("Guest");
  public userData: ITokenData
  public roles = ['HR', 'Manager', 'Student', 'Guest'];

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem("user");
    if (user) {
      this.userData = JSON.parse(user);
    } else {
      this.userData = {
        unique_name: "",
        nameid: "-1",
        role: "Guest"
      };
    }
  }

  getToken(): string | null {
    let token = localStorage.getItem(this.authTokenKey);
    this.loggedIn$.next(token != null);
    if (token != null) {
      this.decodeToken(token);
    }
    return token;
  }
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }
  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem("user");
    this.userData.role = "Guest";
  }
  decodeToken(token: string): void {
    this.userData = jwt_decode(token);
    localStorage.setItem("user", JSON.stringify(this.userData));
  }
  manageErrors() {
    return catchError((error: any) => {
      if (error.error?.errors && Object.keys(error.error?.errors).length > 0) {
        for (let entry of Object.entries(error.error?.errors)) {
          this.errorProvider$.next(entry[1] as string);
        }
      } else {
        switch (error.status) {
          case 0:
            this.errorProvider$.next("Server connection error!");
            break;
          case 401:
            this.errorProvider$.next("Insufficient rights!");
            if (this.userData.role.length == 0 || this.userData.role == "Guest") {
              this.errorProvider$.next("Please login!");
              this.router.navigate(["login"]);
            }
            break;
          case 403:
            this.errorProvider$.next("Role restricted!");
            break;
          default:
            this.errorProvider$.next(error.message);
        }
      }
      return throwError(() => error);
    })
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/api/Users/login`, { username: email, password }).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken(res.token);
        this.roll$.next(this.userData.role.toString());
        this.loggedIn$.next(true);
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          return throwError(() => new Error('Invalid email or password.'));
        } else {
          return throwError(() => new Error('Something went wrong. Please try again later.'));
        }
      })
    ).pipe(this.manageErrors());
  }
  logout() {
    this.removeToken();
    this.loggedIn$.next(false);
    this.roll$.next("Guest");
  }
  register(payload: any): Observable<any> {
    return this.http.post(`${this.URL}/api/Users/register`, payload).pipe(this.manageErrors());
  }
  getTrainings(): Observable<any> {
    return this.http.get<Array<any>>(`${this.URL}/api/Trainings`).pipe(this.manageErrors());
  }
  getTable(table: string): Observable<any> {
    return this.http.get<Array<any>>(`${this.URL}/api/${table}`).pipe(this.manageErrors());
  }
  create(table: string, object: any): Observable<any> {
    return this.http.post(`${this.URL}/api/${table}`, object).pipe(this.manageErrors());
  }
  edit(table: string, object: any): Observable<any> {
    return this.http.put(`${this.URL}/api/${table}/${object.id}`, object).pipe(this.manageErrors());
  }
  delete(table: string, id: number): Observable<any> {
    return this.http.delete(`${this.URL}/api/${table}/${id}`).pipe(this.manageErrors());
  }
  get(url: string, data: any = {}): Observable<any> {
    return this.http.get(`${this.URL}${url}`, data).pipe(this.manageErrors());
  }
  post(url: string, data: any = {}): Observable<any> {
    return this.http.post(`${this.URL}${url}`, data).pipe(this.manageErrors());
  }
  put(url: string, data: any = {}): Observable<any> {
    return this.http.put(`${this.URL}${url}`, data).pipe(this.manageErrors());
  }
  del(url: string, data: any = {}): Observable<any> {
    return this.http.delete(`${this.URL}${url}`, data).pipe(this.manageErrors());
  }
}
