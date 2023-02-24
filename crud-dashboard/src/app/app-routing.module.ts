import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCreateComponent } from './crud-create/crud-create.component';
import { CrudDashboardComponent } from './crud-dashboard/crud-dashboard.component';
import { CrudDeleteComponent } from './crud-delete/crud-delete.component';
import { CrudReadComponent } from './crud-read/crud-read.component';
import { CrudUpdateComponent } from './crud-update/crud-update.component';
import { TableEditComponent } from './table-edit/table-edit.component';

const routes: Routes = [
  {
    path: "table",
    component: TableEditComponent
  },
  {
    path: "crud",
    component: CrudDashboardComponent,
    children: [
      {
        path: "create",
        component: CrudCreateComponent
      },
      {
        path: "read",
        component: CrudReadComponent
      },
      {
        path: "update",
        component: CrudUpdateComponent
      },
      {
        path: "delete",
        component: CrudDeleteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
