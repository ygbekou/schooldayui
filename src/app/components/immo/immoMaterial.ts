import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { Material } from 'app/models/immo/Material';
import { MaterialService } from 'app/services/immo/material.service';
import { MaterialDropdown } from '../dropdowns/immo/dropdown.material';
import { AccountDropdown } from '../dropdowns/immo/dropdown.account';
import { CategoryMaterialDropdown } from '../dropdowns/immo/dropdown.category-material';
import { NatureDropdown } from '../dropdowns/immo/dropdown.nature';

@Component({
  selector: 'app-immo-material',
  templateUrl: '../../pages/immo/immoMaterial.html',
  providers: [MaterialService,Constants]
})
export class immoMaterial implements OnInit, OnDestroy {

  public material: Material;
  public materials: Material[];
  public selectedMaterial: Material;
  msg: string;

  public error: String = '';
  displayDialog: boolean;
  newMaterial: boolean;
  wait: boolean;
  cols: any[];
  public user: User;

  public MaterialDropdown: MaterialDropdown;
  public accountDropdown: AccountDropdown;
  public natureDropdown: NatureDropdown;
  public categoryMaterialDropdown: CategoryMaterialDropdown;
 

  DETAIL: string = Constants.DETAIL;
  LEVELS: string = Constants.LEVELS;
  SUBJECT: string = Constants.SUBJECT;
  NAME: string = Constants.NAME;
  DESCRIPTION: string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  anneeStr = "";
  constructor
    (
    private MaterialService: MaterialService,
    private changeDetectorRef: ChangeDetectorRef,
    private MaterialDropdown1: MaterialDropdown,
    private accountDropdown1: AccountDropdown,
    private natureDropdown1: NatureDropdown,
    private categoryMaterialDropdown1: CategoryMaterialDropdown
   
    ) {
    this.MaterialDropdown = MaterialDropdown1;
    this.accountDropdown = accountDropdown1;
    this.natureDropdown = natureDropdown1;
    this.categoryMaterialDropdown = categoryMaterialDropdown1;
  }
  ngOnDestroy() {
    this.materials = null;
    this.error = null;
    this.selectedMaterial = null;
    this.material = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.materials = [];
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
        { field: 'code', header: 'Code ', sortable: 'true', filter: 'true', style: { 'width': '14%' }, 'type' : 'Text'  },
      { field: 'name', header: 'Libellé ', sortable: 'false', filter: 'true', style: { 'width': '17%' }, 'type' : 'Text'  },
      { field: 'lifetime', header: 'Durée de Vie', sortable: 'false', filter: 'true', style: { 'width': '10%' }, 'type' : 'Text'  },
      { field: 'rate', header: "Taux d'Amort.", sortable: 'false', filter: 'true', style: { 'width': '10%' }, 'type' : 'Text'  },
      { field: 'accountingAccount.name', header: 'Compte comptable', sortable: 'false', filter: 'true', style: { 'width': '17%' }, 'type' : 'Text'  },
      { field: 'categoryMaterial.name', header: 'Categorie ', sortable: 'false', filter: 'true', style: { 'width': '17%' }, 'type' : 'Text'  },
      { field: 'description', header: 'Description', sortable: 'false', filter: 'true', style: { 'width': '18%' }, 'type' : 'Raw'  },
    ];

    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newMaterial = true;
    this.material = new Material();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.materials = [];
    this.MaterialService.getAll()
      .subscribe((data: Material[]) => this.materials = data,
        error => console.log(error),
        () => console.log('Get all Material complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('Material :' + this.material)
      this.wait = true;
      this.MaterialService.save(this.material)
        .subscribe(result => {
         if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.material = result;
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
      this.MaterialService.delete(this.material)
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
    if (this.newMaterial)
      this.materials.push(this.material);
    else
      this.materials[this.findSelectedIndex()] = this.material;

    var onTheFly: Material[] = [];
    onTheFly.push(...this.materials);
    this.materials = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.materials.splice(this.findSelectedIndex(), 1);
    var onTheFly: Material[] = [];
    onTheFly.push(...this.materials);
    this.materials = onTheFly;
    this.resetData();
  }

  resetData() {
    this.material = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newMaterial = false;
    this.material = this.clone(evt.data);
    this.displayDialog = true;

    this.calculTaux();
  }

  clone(e: Material): Material {
    let areception = new Material();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndex(): number {
    return this.materials.indexOf(this.selectedMaterial);
  }

  calculTaux(evt: string = null): void {  
    let duree: number = (this.material.lifetime === undefined || this.material.lifetime === null) ? 0 : Number(this.material.lifetime);
    
    let annee = Math.floor(duree/12);
    let mois = duree%12;
    this.anneeStr = "";

    if(annee > 0){
      this.anneeStr += annee + "ans "
    }

    if(mois > 0){
      this.anneeStr += mois + "mois"
    }

    if(duree != 0){
      this.material.rate = 100/(duree/12);
    }else{
      this.material.rate = 0;
    }


    

  }

}
