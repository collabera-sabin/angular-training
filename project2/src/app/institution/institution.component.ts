import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {
  @Input() data:any
  @Input() skipLink:boolean = false

  ngOnInit(): void {
  }
}
