import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-institution-page',
  templateUrl: './institution-page.component.html',
  styleUrls: ['./institution-page.component.scss']
})
export class InstitutionPageComponent {
  loaded: boolean = false;
  institution: any;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const q = params['q'];
      this.getData(q);
    })
  }

  getData(q: string) {
    this.dataService.getData().subscribe((r) => {});
    this.dataService.getInstitutionData(q)
      .subscribe(response => {
        this.institution = response[0];
        this.loaded = true;
      });
  }
}
