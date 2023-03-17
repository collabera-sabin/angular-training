import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: APIService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.apiService.getToken();
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          withCredentials: 'true',
          'Access-Control-Allow-Origin': 'http://localhost:4200'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          withCredentials: 'true',
          'Access-Control-Allow-Origin': 'http://localhost:4200'
        }
      });
    }
    return next.handle(request);
  }
}
