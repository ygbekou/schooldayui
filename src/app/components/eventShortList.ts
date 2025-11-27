import {LOCALE_ID, Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { Constants } from '../app.constants';

@Component({ 
  selector: 'app-event-short',
  templateUrl: '../pages/eventShortList.html',
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" },EventService, Constants]
})
export class eventShortList implements OnInit {
  public events: Event[];
  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    this.getLatestEvents();
  }

  private getLatestEvents(): void {
    this.eventService.getLatestEvents()
      .subscribe((data: Event[]) => this.events = data,
      error => console.log(error),
      () => console.log('Get Latest Events Complete'));
  }

}
