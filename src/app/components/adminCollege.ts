import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { College } from '../models/college';
import { CollegeService } from '../services/college.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { DataTableModule, DialogModule, InputTextareaModule, SelectItem, ConfirmationService } from 'primeng/primeng';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CycleDropdown } from './dropdowns/dropdown.cycle';

@Component({
  selector: 'app-admin-college',
  templateUrl: '../pages/adminCollege.html',
  providers: [CollegeService, CycleDropdown, ConfirmationService]
})
export class AdminCollege implements OnInit, OnDestroy {

  public colleges: College[];
  public error: String = '';
  public selectedCollege: College;
  cycleDropdown: CycleDropdown;
  displayDialog: boolean;
  college: College = new College();
  newCollege: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  collegeTypes: SelectItem[];
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  constructor(
    private collegeService: CollegeService,
    private cyDropdown: CycleDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {
    this.cycleDropdown = cyDropdown;
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: { 'width': '50%', 'overflow': 'visible' } },
      { field: 'duration', header: Constants.DUREE, sortable: 'true', filter: 'false', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'openDate', header: Constants.DATE_OUVERTURE, type: 'Date', sortable: 'true', filter: 'false', style: { 'width': '15%', 'overflow': 'visible' } },
      { field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'false', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'ordreAffichageMenuSiteWeb', header: "Ordre Aff.", sortable: 'true', filter: 'false', style: { 'width': '5%', 'overflow': 'visible' } }
    ];

    this.collegeTypes = [];
    this.collegeTypes.push({ label: 'Ecole', value: '0' });
    this.collegeTypes.push({ label: 'Professionelle', value: '1' });
    this.collegeTypes.push({ label: 'LMD', value: '2' });
  }

  ngOnDestroy() {
    this.colleges = null;
    this.error = null;
    this.selectedCollege = null;
    this.college = null;
    this.cols = null;
  }

  public getAll(): void {
    this.colleges = [];
    this.collegeService.getAll()
      .subscribe((data: College[]) => this.colleges = data,
        error => console.log(error),
        () => console.log('Get all Colleges complete'));
  }

  showDialogToAdd() {
    this.newCollege = true;
    this.college = new College();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      console.log(this.college);
      this.collegeService.save(this.college)
        .subscribe(result => {
          if (result.id > 0) {
            this.college = result;
            this.putInTable();
          } else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    } catch (e) {
      console.log(e);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement?',
      accept: () => {
        this.delete();
      }
    });
  }

  delete() {
    try {
      this.error = '';
      this.collegeService.delete(this.college)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          } else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    } catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newCollege)
      this.colleges.push(this.college);
    else
      this.colleges[this.findSelectedIndex()] = this.college;

    var onTheFly: College[] = [];
    onTheFly.push(...this.colleges);
    this.colleges = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.colleges.splice(this.findSelectedIndex(), 1);
    var onTheFly: College[] = [];
    onTheFly.push(...this.colleges);
    this.colleges = onTheFly;
    this.resetData();
  }

  resetData() {
    this.college = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCollege = false;
    this.college = this.clone(evt.data);
    this.college.openDate = new Date(this.college.openDate);
    this.displayDialog = true;
  }

  clone(e: College): College {
    let aCollege = new College();
    for (let prop in e) {
      aCollege[prop] = e[prop];
    }
    return aCollege;
  }

  findSelectedIndex(): number {
    return this.colleges.indexOf(this.selectedCollege);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("college", data);
  }
}
