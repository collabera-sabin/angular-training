import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-crud-create',
  templateUrl: './crud-create.component.html',
  styleUrls: ['./crud-create.component.scss']
})
export class CrudCreateComponent {
  id: any = ""
  name: any = ""
  cost: any = ""

  constructor(private dataService: DataService) {

  }

  doCreate() {
    this.dataService.postData({
      p_id: this.id,
      p_name: this.name,
      p_cost: this.cost
    }).subscribe((response) => {
      console.log(response)
    })
  }
}
