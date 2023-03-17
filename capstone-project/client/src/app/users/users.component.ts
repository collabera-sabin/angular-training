import { Component } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  editing: boolean = false;
  users: Array<any> = [];
  target: any = null;
  operation: string = "";
  loading: number = 0;
  roles: Array<string>;
  public user: any;

  constructor(private apiService: APIService) {
    this.user = apiService.userData;
    this.roles = apiService.roles;
  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.loading += 1
    this.apiService.getTable("Users")
      .subscribe(response => {
        this.users = response
        this.loading -= 1
      })
  }

  perform() {
    switch (this.operation) {
      case "Add": {
        this.loading += 1
        this.apiService.create("Users", this.target).subscribe((x) => {
          this.refresh()
          this.loading -= 1
        })
        break
      }
      case "Edit": {
        this.loading += 1
        this.apiService.edit("Users", this.target).subscribe((x) => {
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
      role: "",
      isConfirmed: "",
      username: "",
      address: "",
      phone: "",
      passwordHash: "",
      passwordSalt: ""
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
    this.apiService.delete("Users", id).subscribe((x) => {
      this.loading -= 1
      this.refresh()
    })
  }
}
