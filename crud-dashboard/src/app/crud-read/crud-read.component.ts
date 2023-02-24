import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-crud-read',
  templateUrl: './crud-read.component.html',
  styleUrls: ['./crud-read.component.scss']
})
export class CrudReadComponent {
  products: Array<any> = []

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.dataService.getData()
      .subscribe(response => {
        console.log(response);
        this.products = response;
      });
  }
}
