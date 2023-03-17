import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BroleGuard } from './brole.guard';
import { ContactComponent } from './contact/contact.component';
import { HRoleGuard } from './hrole.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrainingHistoryComponent } from './training-history/training-history.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { UsersComponent } from './users/users.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';

const routes: Routes = [
  {
    path: "",
    component: TrainingsComponent
  },
  {
    path: "trainings",
    component: TrainingsComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "account",
    component: AccountDetailsComponent
  },
  {
    path: "history",
    component: TrainingHistoryComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [BroleGuard]
  },
  {
    path: "attendance/:id",
    component: AttendanceComponent,
    canActivate: [BroleGuard]
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "view/attendance/:uid/:tid",
    component: ViewAttendanceComponent
  },
  {
    path: "view/feedbacks/:uid/:tid",
    component: ViewFeedbacksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
