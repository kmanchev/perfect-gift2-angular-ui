import { Component, OnInit } from '@angular/core';
import { Event } from '../events/event.model';
import { EVENTS } from '../events/events.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events = EVENTS;
  selectedEvent: Event;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  onSelect(event: Event): void {
    console.log(event);
    this.router.navigate(['/eventDetails/' + event.id]);
  }

}