import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { MaterialBrand } from 'app/models/immo/MaterialBrand';
import { MaterialBrandService } from 'app/services/immo/material-brand.service';
import { MaterialBrandDropdown } from '../dropdowns/immo/dropdown.material-brand';

@Component({
  selector: 'app-immo-material-brand',
  templateUrl: '../../pages/immo/immoMaterialBrand.html',
  providers: [MaterialBrandService,Constants]
})
export class immoMaterialBrand implements OnInit, OnDestroy {

  public materialBrand: MaterialBrand;
  public materialBrands: MaterialBrand[];
  public selectedMaterialBrand: MaterialBrand;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newMaterialBrand: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public MaterialBrandDropdown: MaterialBrandDropdown;
 

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
    private MaterialBrandService: MaterialBrandService,
    private changeDetectorRef: ChangeDetectorRef,
    private MaterialBrandDropdown1: MaterialBrandDropdown
   
    ) {
    this.MaterialBrandDropdown = MaterialBrandDropdown1;
  }
  ngOnDestroy() {
    this.materialBrands = null;
    this.error = null;
    this.selectedMaterialBrand = null;
    this.materialBrand = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.materialBrands = [];
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
      this.newMaterialBrand = true;
    this.materialBrand = new MaterialBrand();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.materialBrands = [];
    this.MaterialBrandService.getAll()
      .subscribe((data: MaterialBrand[]) => this.materialBrands = data,
        error => console.log(error),
        () => console.log('Get all MaterialBrand complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('MaterialBrand :' + this.materialBrand)
      this.wait = true;
      this.MaterialBrandService.save(this.materialBrand)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.materialBrand = result;
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
      this.MaterialBrandService.delete(this.materialBrand)
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
    if (this.newMaterialBrand)
      this.materialBrands.push(this.materialBrand);
    else
      this.materialBrands[this.findSelectedIndex()] = this.materialBrand;

    var onTheFly: MaterialBrand[] = [];
    onTheFly.push(...this.materialBrands);
    this.materialBrands = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.materialBrands.splice(this.findSelectedIndex(), 1);
    var onTheFly: MaterialBrand[] = [];
    onTheFly.push(...this.materialBrands);
    this.materialBrands = onTheFly;
    this.resetData();
  }

  resetData() {
    this.materialBrand = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newMaterialBrand = false;
    this.materialBrand = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: MaterialBrand): MaterialBrand {
    let areception = new MaterialBrand();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.materialBrands.indexOf(this.selectedMaterialBrand);
  }


}
