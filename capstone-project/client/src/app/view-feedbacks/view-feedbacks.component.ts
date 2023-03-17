import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.scss']
})
export class ViewFeedbacksComponent {
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
    this.apiService.get(`/api/Feedbacks/view/${this.uid}/${this.tid}`)
      .subscribe(response => {
        this.records = response
        this.loading -= 1
      })
  }
}
