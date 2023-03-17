import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent {
  records: Array<any> = []
  loading: number = 0
  uid: number = -1
  tid: number = -1
  public user: any

  constructor(private apiService: APIService, private route: ActivatedRoute) {
    this.user = apiService.userData;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid = parseInt(params['uid']);
      this.tid = parseInt(params['tid']);
      this.refresh();
    })
  }

  refresh() {
    this.loading += 1
    this.apiService.get(`/api/Attendence/view/${this.uid}/${this.tid}`)
      .subscribe(response => {
        this.records = response
        this.loading -= 1
      })
  }

  change(fid: number, event: Event) {
    this.loading += 1
    this.apiService.put(`/api/Attendence/set/${this.tid}/${fid}/${(event.target as HTMLInputElement).value}`, {})
      .subscribe(response => {
        this.refresh()
        this.loading -= 1
      })
  }
}
