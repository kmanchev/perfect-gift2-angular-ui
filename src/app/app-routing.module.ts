import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  { path: "image/:id", component: ImageDetailComponent },
  { path: "events", component: EventsListComponent},
  { path: "eventDetails/:id", component: EventDetailsComponent},
  { path: "", redirectTo: "/events", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
