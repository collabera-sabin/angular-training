import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  @Input() data:any;
  @Input() full:boolean = false;
  @Input() sub:number = 0;

  ngOnInit(): void {
  }
}
