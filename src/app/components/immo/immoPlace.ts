import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { Place } from 'app/models/immo/Place';
import { PlaceService } from 'app/services/immo/place.service';
import { PlaceDropdown } from '../dropdowns/immo/dropdown.place';

@Component({
  selector: 'app-immo-place',
  templateUrl: '../../pages/immo/immoPlace.html',
  providers: [PlaceService,Constants]
})
export class immoPlace implements OnInit, OnDestroy {

  public place: Place;
  public places: Place[];
  public selectedPlace: Place;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newPlace: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public placeDropdown: PlaceDropdown;
 

  DETAIL: string = Constants.DETAIL;
  LEVELS: string = Constants.LEVELS;
  SUBJECT: string = Constants.SUBJECT;
  NAME: string = Constants.NAME;
  DESCRIPTION: string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private PlaceService: PlaceService,
    private changeDetectorRef: ChangeDetectorRef,
    private PlaceDropdown1: PlaceDropdown
   
    ) {
    this.placeDropdown = PlaceDropdown1;
  }
  ngOnDestroy() {
    this.places = null;
    this.error = null;
    this.selectedPlace = null;
    this.place = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.places = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'code', header: 'Code ', sortable: 'true', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  },
      { field: 'name', header: 'Nom ', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Raw'  },
      { field: 'parent.name', header: 'Parent', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Text'  },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newPlace = true;
    this.place = new Place();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.places = [];
    this.PlaceService.getAll()
      .subscribe((data: Place[]) => this.places = data,
        error => console.log(error),
        () => console.log('Get all Place complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('Place :' + this.place)
      this.wait = true;
      this.PlaceService.save(this.place)
        .subscribe(result => {
         if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.place = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
          this.wait = false;
          
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.PlaceService.delete(this.place)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
            this.placeDropdown.getAll();
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
    if (this.newPlace)
      this.places.push(this.place);
    else
      this.places[this.findSelectedIndex()] = this.place;

    var onTheFly: Place[] = [];
    onTheFly.push(...this.places);
    this.places = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.places.splice(this.findSelectedIndex(), 1);
    var onTheFly: Place[] = [];
    onTheFly.push(...this.places);
    this.places = onTheFly;
    this.resetData();
  }

  resetData() {
    this.place = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPlace = false;
    this.place = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Place): Place {
    let areception = new Place();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.places.indexOf(this.selectedPlace);
  }


}
