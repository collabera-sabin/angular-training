import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-crud-delete',
  templateUrl: './crud-delete.component.html',
  styleUrls: ['./crud-delete.component.scss']
})
export class CrudDeleteComponent {
  id: any = ""

  constructor(private dataService: DataService) {

  }

  doDelete() {
    this.dataService.deleteData(
      this.id,
    ).subscribe((response) => {
      console.log(response)
    })
  }
}
