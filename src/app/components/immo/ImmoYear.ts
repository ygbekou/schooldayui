import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { YearService } from 'app/services/immo/year.service';
import { Year } from 'app/models/immo/Year';

@Component({
  selector: 'app-immo-year',
  templateUrl: '../../pages/immo/immoYear.html',
  providers: [YearService,Constants]
})
export class ImmoYear implements OnInit {

  public year: Year;
  public years: Year[];
  public selectedYear: Year;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newYear: boolean;
  wait: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

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
    private YearService: YearService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.years = null;
    this.error = null;
    this.selectedYear = null;
    this.year = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.years = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Année', sortable: 'true', filter: 'true', style: { 'width': '100%' }, 'type' : 'Text'  },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newYear = true;
    this.year = new Year();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.years = [];
    this.YearService.getAll()
      .subscribe((data: Year[]) => this.years = data,
        error => console.log(error),
        () => console.log('Get all Year complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('Year :' + this.year)
      this.wait = true;
      this.YearService.save(this.year)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.year = result;
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
      this.YearService.delete(this.year)
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
    if (this.newYear)
      this.years.push(this.year);
    else
      this.years[this.findSelectedIndex()] = this.year;

    var onTheFly: Year[] = [];
    onTheFly.push(...this.years);
    this.years = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.years.splice(this.findSelectedIndex(), 1);
    var onTheFly: Year[] = [];
    onTheFly.push(...this.years);
    this.years = onTheFly;
    this.resetData();
  }

  resetData() {
    this.year = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newYear = false;
    this.year = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Year): Year {
    let aYear = new Year();
    for (let prop in e) {
      aYear[prop] = e[prop];
    }
    return aYear;
  }

  findSelectedIndex(): number {
    return this.years.indexOf(this.selectedYear);
  }


}
