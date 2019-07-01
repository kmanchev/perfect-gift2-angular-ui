import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';
import { EVENTS } from '../events/events.mock';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events = EVENTS;
  selectedEvent: Event;

  constructor(
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.messageService.sendMessage('loggedIn');
  }

  /* toggleShowEvents() {
    if (this.shouldShowEvents) {
      this.messageService.sendMessage('hide events');
      this.shouldShowEvents = false;
    } else {
      this.messageService.sendMessage('show events');
      this.shouldShowEvents = true;
    }
    
  } */

  onSelect(event: Event): void {
    console.log(event);
    this.router.navigate(['/eventDetails/' + event.id]);
  }

}