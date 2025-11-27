import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies'; 
@Component({
  selector: 'app-admin-event',
  templateUrl: '../pages/adminEvent.html',
  providers: [EventService]
})
export class AdminEvent implements OnInit, OnDestroy {

  public events: Event[];
  public error: String = '';
  public selectedEvent: Event;
  displayDialog: boolean;
  event: Event = new Event();
  newEvent: boolean;
  cols: any[];
  
  ADD_LABEL:  string = Constants.ADD_LABEL;
  DELETE_LABEL:  string = Constants.DELETE_LABEL;
  SAVE_LABEL:  string = Constants.SAVE_LABEL;
  
  constructor(private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef) {

  }
  ngOnDestroy() {
    this.events = null;
    this.error = null;
    this.selectedEvent = null;
    this.event = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      { field: 'title', header: Constants.TITLE, sortable: 'false', filter: 'true' },
      { field: 'description', header: Constants.DESCRIPTION, sortable: 'false', filter: 'false' },
      { field: 'startsAt', header: Constants.DEBUT, type: 'Date', sortable: 'true' },
      { field: 'endsAt', header: Constants.FIN, type: 'Date', sortable: 'true' },
      { field: 'address', header: Constants.LIEU, sortable: 'true', filter: 'true' },
      { field: 'city', header: Constants.VILLE, sortable: 'true', filter: 'true' },
      { field: 'status', header: Constants.ACTIVE, sortable: 'true', filter: 'true' }
    ];
  }

  public getAll(): void {
    this.events = [];
    this.eventService.getAll()
      .subscribe((data: Event[]) => this.events = data,
      error => console.log(error),
      () => console.log('Get all Events complete'));
  }


  showDialogToAdd() {
    this.newEvent = true;
    this.event = new Event();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.eventService.save(this.event)
        .subscribe(result => {
          if (result.id > 0) {
            this.event = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.eventService.delete(this.event)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newEvent)
      this.events.push(this.event);
    else
      this.events[this.findSelectedIndex()] = this.event;

    var onTheFly : Event [] = [];
    onTheFly.push(...this.events);
    this.events = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.events.splice(this.findSelectedIndex(), 1);
    var onTheFly : Event [] = [];
    onTheFly.push(...this.events);
    this.events = onTheFly;
    this.resetData();
  }

  resetData() {
    this.event = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newEvent = false;
    this.event = this.clone(evt.data);
    this.event.startsAt = new Date(this.event.startsAt);
    this.event.endsAt = new Date(this.event.endsAt);
    this.displayDialog = true;
  }

  clone(e: Event): Event {
    let anEvent = new Event();
    for (let prop in e) {
      anEvent[prop] = e[prop];
    }
    return anEvent;
  }

  findSelectedIndex(): number {
    return this.events.indexOf(this.selectedEvent);
  }
}
