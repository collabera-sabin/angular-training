import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  editing: boolean = false
  records: Array<any> = []
  target: any = null
  operation: string = ""
  loading: number = 0
  selectedManager: any = null

  managers: Array<any> = []

  trainingID: number = -1;
  user: any

  constructor(private apiService: APIService, private route: ActivatedRoute, private router: Router) {
    this.user = apiService.userData;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.trainingID = parseInt(params['id']);
      this.refresh();
      if (this.user.role == 'HR') {
        this.getManagerList();
      }
    });
  }

  refresh() {
    this.loading += 1
    this.apiService.get(`/api/Attendence/${this.trainingID}`).subscribe(response => {
      this.records = response;
      this.loading -= 1;
    })
  }

  getManagerList() {
    this.loading += 1
    this.apiService.get(`/api/Users/getManagers`).subscribe(response => {
      this.managers = response;
      this.loading -= 1;
    })
  }

  approve(uid: number, tid: number) {
    this.loading += 1;
    this.apiService.put(`/api/Trainings/${tid}/${uid}/approve`).subscribe(response => {
      this.refresh();
      this.loading -= 1;
    })
  }

  reject(uid: number, tid: number) {
    this.loading += 1;
    this.apiService.put(`/api/Trainings/${tid}/${uid}/reject`).subscribe(response => {
      this.refresh();
      this.loading -= 1;
    })
  }

  assign() {
    this.loading += 1;
    this.apiService.post(`/api/Trainings/${this.trainingID}/${this.selectedManager}/assignManager`).subscribe(response => {
      this.refresh();
      this.loading -= 1;
    })
  }

  viewAttendance(uid: number, tid: number) {
    this.router.navigate(["view/attendance", uid, tid])
  }

  viewFeedbacks(uid: number, tid: number) {
    this.router.navigate(["view/feedbacks", uid, tid])
  }
}
