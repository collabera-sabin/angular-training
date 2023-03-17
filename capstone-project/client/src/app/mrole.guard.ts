import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MRoleGuard implements CanActivate {
  constructor (private apiService: APIService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.apiService.userData.role !== "Manager") {
      this.apiService.errorProvider$.next("Insufficient rights!");
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

}
