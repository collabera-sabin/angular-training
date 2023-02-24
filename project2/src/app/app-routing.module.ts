import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstitutionPageComponent } from './institution-page/institution-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'institution/:q',
    component: InstitutionPageComponent
  },
  { path: 'contact', loadChildren: () => import('./lazy-portal-contact/lazy-portal-contact.module').then(m => m.LazyPortalContactModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
