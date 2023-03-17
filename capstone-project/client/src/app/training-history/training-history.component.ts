import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.scss']
})
export class TrainingHistoryComponent {
  trainings: Array<any> = []
  loading: number = 0
  public user: any

  constructor(private apiService: APIService, private router: Router) {
    this.user = apiService.userData;
  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.loading += 1
    this.apiService.get("/api/Trainings/all")
      .subscribe(response => {
        this.trainings = response
        this.loading -= 1
      })
  }

  checkAttendance(id: number) {
    this.router.navigate(["attendance", id])
  }

  markAttendance(id: number) {
    this.loading += 1
    this.apiService.post(`/api/Attendence/mark/${id}`, {})
      .subscribe(response => {
        this.refresh()
        this.loading -= 1
      })
  }

  giveFeedback(id: number) {
    let feedback = prompt("Your feedback:");
    this.loading += 1
    this.apiService.post(`/api/Feedbacks/send/${id}`, {feedback})
      .subscribe(response => {
        this.refresh()
        this.loading -= 1
      })
  }
}
