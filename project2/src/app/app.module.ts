import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { InstitutionComponent } from './institution/institution.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './button/button.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { DepartmentComponent } from './department/department.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    InstitutionsComponent,
    InstitutionComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    HomeComponent,
    InfoComponent,
    DepartmentComponent,
    InstitutionPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
