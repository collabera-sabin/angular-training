import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent {
  editing: boolean = false
  trainings: Array<any> = []
  target: any = null
  operation: string = ""
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
    this.apiService.getTable("Trainings")
      .subscribe(response => {
        this.trainings = response
        this.loading -= 1
      })
  }

  getObject() {
    return {
      startDate: this.target.startDate + ((this.target.startDate.indexOf('T') < 0)?"T00:00:00Z":""),
      ownerId: this.target.ownerId,
      name: this.target.name,
      id: this.target.id,
      scope: this.target.scope
    }
  }

  perform() {
    switch (this.operation) {
      case "Add": {
        this.loading += 1
        this.apiService.create("Trainings", this.getObject()).subscribe((x) => {
          this.refresh()
          this.loading -= 1
        })
        break
      }
      case "Edit": {
        this.loading += 1
        this.apiService.edit("Trainings", this.getObject()).subscribe((x) => {
          this.loading -= 1
          this.refresh()
        })
        break
      }
    }
    this.target = null
  }

  doAdd() {
    this.target = {
      name: "",
      startDate: "",
      scope: "",
      ownerId: parseInt(this.apiService.userData.nameid.toString()),
      owner: null
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
    this.apiService.delete("Trainings", id).subscribe((x) => {
      this.loading -= 1
      this.refresh()
    })
  }
  toggleApply(target: any) {
    this.loading += 1
    if (target.applied) {
      this.apiService.del(`/api/Trainings/${target.id}/cancel`).subscribe((x) => {
        this.loading -= 1
        this.refresh()
      })
    } else {
      this.apiService.post(`/api/Trainings/${target.id}/apply`).subscribe((x) => {
        this.loading -= 1
        this.refresh()
      })
    }
  }
  checkAttendance(id: number) {
    this.router.navigate(["attendance", id]);
  }
  viewHistory() {
    this.router.navigate(["history"]);
  }
}
