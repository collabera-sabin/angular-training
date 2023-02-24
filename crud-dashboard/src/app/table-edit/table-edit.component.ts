import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent {
  editing: boolean = false
  products: Array<any> = []
  target: any = null
  operation: string = ""
  loading: number = 0
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.loading += 1
    this.dataService.getData()
      .subscribe(response => {
        console.log(response);
        this.products = response;
        this.loading -= 1
      });
  }

  perform() {
    switch(this.operation) {
      case "Add": {
        this.loading += 1
        this.dataService.postData(this.target).subscribe((x) => {
          this.refresh()
          this.loading -= 1
        });
        break;
      }
      case "Edit": {
        this.loading += 1
        this.dataService.updateData(this.target).subscribe((x) => {
          this.loading -= 1
          this.refresh()
        });
        break;
      }
    }
    this.target = null
  }

  doAdd() {
    this.target = {
      "p_id": "",
      "p_name": "",
      "p_cost": ""
    }
    this.editing = true
    this.operation = "Add"
  }

  doEdit(target: any) {
    this.target = target
    this.editing = true
    this.operation = "Edit"
  }

  doDelete(id: number) {
    this.loading += 1
    this.dataService.deleteData(id).subscribe((x) => {
      this.loading -= 1
      this.refresh()
    })
  }
}
// /fetch
// /insert -> JSON
// /update -> JSON
// /delete -> JSON