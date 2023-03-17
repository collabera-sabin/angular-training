import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorListComponent } from './error-list/error-list.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AttendanceComponent } from './attendance/attendance.component';
import { TrainingHistoryComponent } from './training-history/training-history.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { AccountDetailsComponent } from './account-details/account-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    TrainingsComponent,
    FeedbackComponent,
    ErrorListComponent,
    ContactComponent,
    UsersComponent,
    AttendanceComponent,
    TrainingHistoryComponent,
    ViewAttendanceComponent,
    ViewFeedbacksComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("auth-token"),
        allowedDomains: ["localhost:7271"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
