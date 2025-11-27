import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { VendorService } from 'app/services/immo/vendor.service';
import { Vendor } from 'app/models/immo/Vendor';

@Component({
  selector: 'app-immo-vendor',
  templateUrl: '../../pages/immo/immoVendor.html',
  providers: [VendorService,Constants]
})
export class ImmoVendor implements OnInit {

  public vendor: Vendor;
  public vendors: Vendor[];
  public selectedVendor: Vendor;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newVendor: boolean;
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
    private VendorService: VendorService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.vendors = null;
    this.error = null;
    this.selectedVendor = null;
    this.vendor = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.vendors = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Libellé', sortable: 'true', filter: 'true', style: { 'width': '30%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '70%' },type:'Raw' }
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newVendor = true;
    this.vendor = new Vendor();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.vendors = [];
    this.VendorService.getAll()
      .subscribe((data: Vendor[]) => this.vendors = data,
        error => console.log(error),
        () => console.log('Get all Vendor complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('Vendor :' + this.vendor)
      this.wait = true;
      this.VendorService.save(this.vendor)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.vendor = result;
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
      this.VendorService.delete(this.vendor)
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
    if (this.newVendor)
      this.vendors.push(this.vendor);
    else
      this.vendors[this.findSelectedIndex()] = this.vendor;

    var onTheFly: Vendor[] = [];
    onTheFly.push(...this.vendors);
    this.vendors = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.vendors.splice(this.findSelectedIndex(), 1);
    var onTheFly: Vendor[] = [];
    onTheFly.push(...this.vendors);
    this.vendors = onTheFly;
    this.resetData();
  }

  resetData() {
    this.vendor = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newVendor = false;
    this.vendor = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Vendor): Vendor {
    let aVendor = new Vendor();
    for (let prop in e) {
      aVendor[prop] = e[prop];
    }
    return aVendor;
  }

  findSelectedIndex(): number {
    return this.vendors.indexOf(this.selectedVendor);
  }


}
