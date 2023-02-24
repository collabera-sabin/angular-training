import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent {
  institutions: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getData()
      .subscribe(response => {
        this.institutions = response;
      });
  }
}
