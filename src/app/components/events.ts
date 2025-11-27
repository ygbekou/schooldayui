import { Component,LOCALE_ID,  OnInit, OnDestroy } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { Constants } from '../app.constants';
import { DataListModule } from 'primeng/primeng';

@Component({
  selector: 'app-event-list',
  templateUrl: '../pages/events.html',
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" },EventService, Constants]
})
export class Events implements OnInit, OnDestroy {
  public events: Event[];
  constructor(private eventService: EventService) {

  }

  ngOnInit() {
    this.getActiveEvents();
  }

  ngOnDestroy() {
    this.events = null;
  }
  private getActiveEvents(): void {
    this.eventService.getActiveEvents()
      .subscribe((data: Event[]) => this.events = data,
      error => console.log(error),
      () => console.log('Get All Events Complete'));
  }

}
