import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyPortalContactRoutingModule } from './lazy-portal-contact-routing.module';
import { PortalContactComponent } from '../portal-contact/portal-contact.component';


@NgModule({
  declarations: [
    PortalContactComponent
  ],
  imports: [
    CommonModule,
    LazyPortalContactRoutingModule
  ]
})
export class LazyPortalContactModule { }
