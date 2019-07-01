import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MessageService } from '../_services/message.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  title = 'Navigation Bar';
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService) {
    this.isLoggedIn = false;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.subscription = this.messageService.getMessage().subscribe(message => {

      if (message) {
        if (message.text == "loggedIn") {
          this.isLoggedIn = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }

}