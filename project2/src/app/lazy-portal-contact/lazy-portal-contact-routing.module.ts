import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalContactComponent } from '../portal-contact/portal-contact.component';

const routes: Routes = [{ path: '', component: PortalContactComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyPortalContactRoutingModule { }
