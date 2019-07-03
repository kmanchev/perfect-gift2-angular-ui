import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';

const routes: Routes = [
  { path: '', component: EventsListComponent, canActivate: [AuthGuard] },
  { path: "image/:url", component: ImageDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "events", component: EventsListComponent, canActivate: [AuthGuard]},
  { path: 'createEvent', component: EventCreateComponent, canActivate: [AuthGuard]},
  { path: "eventDetails/:id", component: EventDetailsComponent, canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
