import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { CategoryMaterial } from 'app/models/immo/CategoryMaterial';
import { CategoryMaterialService } from 'app/services/immo/category-material.service';
import { CategoryMaterialDropdown } from '../dropdowns/immo/dropdown.category-material';

@Component({
  selector: 'app-immo-categoryMaterial',
  templateUrl: '../../pages/immo/immoCategoryMaterial.html',
  providers: [CategoryMaterialService,Constants]
})
export class immoCategoryMaterial implements OnInit, OnDestroy {

  public category: CategoryMaterial;
  public categories: CategoryMaterial[];
  public selectedCategory: CategoryMaterial;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newCategory: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public categoryMaterialDropdown: CategoryMaterialDropdown;
 

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
    private CategoryMaterialService: CategoryMaterialService,
    private changeDetectorRef: ChangeDetectorRef,
    private categoryMaterialDropdown1: CategoryMaterialDropdown
   
    ) {
    this.categoryMaterialDropdown = categoryMaterialDropdown1;
  }
  ngOnDestroy() {
    this.categories = null;
    this.error = null;
    this.selectedCategory = null;
    this.category = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.categories = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'name', header: 'Libellé ', sortable: 'true', filter: 'true', style: { 'width': '33%' }, 'type' : 'Text' },
      { field: 'parent.name', header: 'Categorie Mère', sortable: 'false', filter: 'true', style: { 'width': '33%' }, 'type' : 'Text' },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '34%' }, 'type' : 'Raw' },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newCategory = true;
    this.category = new CategoryMaterial();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.categories = [];
    this.CategoryMaterialService.getAll()
      .subscribe((data: CategoryMaterial[]) => this.categories = data,
        error => console.log(error),
        () => console.log('Get all CategoryMaterial complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('CategoryMaterial :' + this.category)
      this.wait = true;
      this.CategoryMaterialService.save(this.category)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.category = result;
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
      this.CategoryMaterialService.delete(this.category)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
            this.categoryMaterialDropdown.getAll();
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
    if (this.newCategory)
      this.categories.push(this.category);
    else
      this.categories[this.findSelectedIndex()] = this.category;

    var onTheFly: CategoryMaterial[] = [];
    onTheFly.push(...this.categories);
    this.categories = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.categories.splice(this.findSelectedIndex(), 1);
    var onTheFly: CategoryMaterial[] = [];
    onTheFly.push(...this.categories);
    this.categories = onTheFly;
    this.resetData();
  }

  resetData() {
    this.category = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCategory = false;
    this.category = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: CategoryMaterial): CategoryMaterial {
    let areception = new CategoryMaterial();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.categories.indexOf(this.selectedCategory);
  }


}
