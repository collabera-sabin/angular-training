import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public loaded$: Observable<Array<string>>
  public selected: string = ''
  constructor(private dataService: DataService, private router: Router) {
    this.loaded$ = dataService.loaded$.asObservable();
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((endpoint: NavigationEnd) => {
      const urlSegment = this.router.parseUrl(endpoint.url);
      if (urlSegment.root.children['primary']) {
        try {
          this.selected = urlSegment.root.children['primary'].segments[1].path;
        } catch (e) {
          this.selected = '';
          dataService.getData().subscribe();
        }
      } else {
        this.selected = '';
      }
    });
  }
  ngOnInit() {}
}
