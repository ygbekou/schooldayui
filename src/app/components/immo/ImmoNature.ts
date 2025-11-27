import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { Nature } from 'app/models/immo/Nature';
import { NatureService } from 'app/services/immo/nature.service';
import { NatureDropdown } from '../dropdowns/immo/dropdown.nature';

@Component({
  selector: 'app-immo-nature',
  templateUrl: '../../pages/immo/immoNature.html',
  providers: [NatureService,Constants]
})
export class ImmoNature implements OnInit, OnDestroy {

  public nature: Nature;
  public natures: Nature[];
  public selectedNature: Nature;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newNature: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public NatureDropdown: NatureDropdown;
 

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
    private NatureService: NatureService,
    private changeDetectorRef: ChangeDetectorRef,
    private NatureDropdown1: NatureDropdown
   
    ) {
    this.NatureDropdown = NatureDropdown1;
  }
  ngOnDestroy() {
    this.natures = null;
    this.error = null;
    this.selectedNature = null;
    this.nature = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.natures = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Libellé ', sortable: 'true', filter: 'true', style: { 'width': '50%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '50%' }, 'type' : 'Raw'  },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newNature = true;
    this.nature = new Nature();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.natures = [];
    this.NatureService.getAll()
      .subscribe((data: Nature[]) => this.natures = data,
        error => console.log(error),
        () => console.log('Get all Nature complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('Nature :' + this.nature)
      this.wait = true;
      this.NatureService.save(this.nature)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.nature = result;
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
      this.NatureService.delete(this.nature)
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
    if (this.newNature)
      this.natures.push(this.nature);
    else
      this.natures[this.findSelectedIndex()] = this.nature;

    var onTheFly: Nature[] = [];
    onTheFly.push(...this.natures);
    this.natures = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.natures.splice(this.findSelectedIndex(), 1);
    var onTheFly: Nature[] = [];
    onTheFly.push(...this.natures);
    this.natures = onTheFly;
    this.resetData();
  }

  resetData() {
    this.nature = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newNature = false;
    this.nature = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Nature): Nature {
    let areception = new Nature();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.natures.indexOf(this.selectedNature);
  }


}
