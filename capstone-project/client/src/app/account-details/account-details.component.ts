import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  user: any
  loading: number = 0

  constructor(private apiService: APIService, private location: Location) {
  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.loading += 1
    this.apiService.get("/api/Users/details")
      .subscribe(response => {
        this.user = response
        this.loading -= 1
      })
  }
  edit() {
    this.loading += 1
    this.apiService.put("/api/Users/details", this.user)
      .subscribe(response => {
        this.location.back()
        this.loading -= 1
      })
  }
}
