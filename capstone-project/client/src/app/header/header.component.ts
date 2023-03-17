import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isNavbarCollapsed: boolean = true;
  public loggedIn$ = new Observable<boolean>();
  public roll$ = new Observable<string>();

  toggleNavbar() {
    this.isNavbarCollapsed = ! this.isNavbarCollapsed
  }
 
  constructor(private api: APIService, private router: Router, private location: Location) {
    this.loggedIn$ = api.loggedIn$.asObservable();
    this.roll$ = api.roll$.asObservable();
  }

  logout() {
    this.api.logout();
    this.router.navigate(['login']);
  }

  goBack() {
    this.location.back();
  }
}
