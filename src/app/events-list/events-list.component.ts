import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';
import { EVENTS } from '../events/events.mock';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: Event[] = [];
  selectedEvent: Event;
  userId: string;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    var loggedUser = JSON.parse(localStorage.getItem('currentUser'));

    //this is needed in order to update the navbar to visible
    this.messageService.sendMessage('loggedIn');
    this.userService.getAllEvents(loggedUser._id).pipe(first())
    .subscribe(
      data => {
        this.events = data;
        console.log("dance");
        console.log(this.events);
      },
      error => {
        console.log("dance2");
        console.error(error);
      });
  }

  onSelect(event: Event): void {
    this.router.navigate(['/eventDetails/' + event.id]);
  }

}