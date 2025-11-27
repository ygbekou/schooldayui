import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { Features } from 'app/models/immo/Features';
import { FeaturesService } from 'app/services/immo/features.service';
import { FeaturesDropdown } from '../dropdowns/immo/dropdown.features';

@Component({
  selector: 'app-immo-features',
  templateUrl: '../../pages/immo/immoFeatures.html',
  providers: [FeaturesService,Constants]
})
export class immoFeatures implements OnInit, OnDestroy {

  public feature: Features;
  public features: Features[];
  public selectedfeatures: Features;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newfeatures: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public FeaturesDropdown: FeaturesDropdown;
 

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
    private FeaturesService: FeaturesService,
    private changeDetectorRef: ChangeDetectorRef,
    private FeaturesDropdown1: FeaturesDropdown
   
    ) {
    this.FeaturesDropdown = FeaturesDropdown1;
  }
  ngOnDestroy() {
    this.features = null;
    this.error = null;
    this.selectedfeatures = null;
    this.feature = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.features = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Libellé ', sortable: 'true', filter: 'true', style: { 'width': '50%' }, 'type' : 'Text'  },
      { field: 'value', header: 'Valeur', sortable: 'false', filter: 'true', style: { 'width': '50%' }, 'type' : 'Text' },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newfeatures = true;
    this.feature = new Features();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.features = [];
    this.FeaturesService.getAll()
      .subscribe((data: Features[]) => this.features = data,
        error => console.log(error),
        () => console.log('Get all Features complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('feature :' + this.feature.name)
      console.log('feature :' + this.feature.value)
      this.wait = true;
      this.FeaturesService.save(this.feature)
        .subscribe(result => {
         if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.feature = result;
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
      this.FeaturesService.delete(this.feature)
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
    if (this.newfeatures)
      this.features.push(this.feature);
    else
      this.features[this.findSelectedIndex()] = this.feature;

    var onTheFly: Features[] = [];
    onTheFly.push(...this.features);
    this.features = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.features.splice(this.findSelectedIndex(), 1);
    var onTheFly: Features[] = [];
    onTheFly.push(...this.features);
    this.features = onTheFly;
    this.resetData();
  }

  resetData() {
    this.feature = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newfeatures = false;
    this.feature = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Features): Features {
    let areception = new Features();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.features.indexOf(this.selectedfeatures);
  }


}
