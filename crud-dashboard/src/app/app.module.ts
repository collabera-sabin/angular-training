import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableEditComponent } from './table-edit/table-edit.component';
import { CrudDashboardComponent } from './crud-dashboard/crud-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudCreateComponent } from './crud-create/crud-create.component';
import { CrudDeleteComponent } from './crud-delete/crud-delete.component';
import { CrudReadComponent } from './crud-read/crud-read.component';
import { CrudUpdateComponent } from './crud-update/crud-update.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableEditComponent,
    CrudDashboardComponent,
    CrudCreateComponent,
    CrudDeleteComponent,
    CrudReadComponent,
    CrudUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
