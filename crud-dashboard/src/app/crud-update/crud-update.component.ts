import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-crud-update',
  templateUrl: './crud-update.component.html',
  styleUrls: ['./crud-update.component.scss']
})
export class CrudUpdateComponent {
  id: any = ""
  name: any = ""
  cost: any = ""

  constructor(private dataService: DataService) {

  }

  doUpdate() {
    console.log("updating")
    this.dataService.updateData({
      p_id: this.id,
      p_name: this.name,
      p_cost: this.cost
    }).subscribe((response) => {
      console.log(response)
    })
  }
}
