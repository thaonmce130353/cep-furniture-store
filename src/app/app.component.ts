import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Furniture store';
  currentRoute: string;
  isManagePage: boolean = false;

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      // if (event instanceof NavigationStart) {
      //   console.log("Change detect");

      // }
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute === "/management") {
          this.isManagePage = true;
        } else {
          this.isManagePage = false;
        }
      }

      // if (event instanceof NavigationError) {
      //   console.log(event.error);
      // }
    });
  }
}
