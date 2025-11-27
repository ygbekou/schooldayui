import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Constants } from 'app/app.constants';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { Reception } from 'app/models/immo/Reception';
import { ReceptionService } from 'app/services/immo/reception.service';
import { MaterialsAcquiredService } from 'app/services/immo/materials-acquired.service';
import { MaterialsAcquired } from 'app/models/immo/MaterialsAcquired';
import { MaterialDropdown } from '../dropdowns/immo/dropdown.material';
import { VendorDropdown } from '../dropdowns/immo/dropdown.vendor';
import { MaterialBrandDropdown } from '../dropdowns/immo/dropdown.material-brand';
import { MaterialAcquired } from 'app/models/immo/MaterialAcquired';
import { MaterialAcquiredService } from 'app/services/immo/material-acquired.service';
import { FileUploader } from '../fileUploader';

@Component({
  selector: 'app-immo-reception',
  templateUrl: '../../pages/immo/immoReception.html',
  providers: [ReceptionService,Constants, MaterialsAcquiredService, MaterialAcquiredService]
})
export class ImmoReception implements OnInit {

  @ViewChild(FileUploader) fileUploader:FileUploader;

  public reception: Reception;
  public receptions: Reception[];
  public selectedreception: Reception;

  public materialsAcquireds: MaterialsAcquired[];
  public materialsAcquired: MaterialsAcquired;
  public selectedMaterialsAcquired: MaterialsAcquired;

  public materialAcquireds: MaterialAcquired[];
  public materialAcquired: MaterialAcquired;
  public selectedMaterialAcquired: MaterialAcquired;


  msg: string;

  public error: String = '';

  displayDialog: boolean;
  displayDialogMaterialsAcquired: boolean;
  displayDialogMaterialAcquired: boolean;

  newreception: boolean;
  newMaterialsAcquired: boolean;
  newMaterialAcquired: boolean;

  wait: boolean;

  cols: any[];
  colsMaterialsAcquired: any[];
  colsMaterialAcquired: any[];
  
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

  public materialDropdown: MaterialDropdown;
  public vendorDropdown: VendorDropdown;
  public materialBrandDropdown: MaterialBrandDropdown;

  constructor
    (
    private receptionService: ReceptionService,
    private materialsAcquiredService: MaterialsAcquiredService,
    private materialAcquiredService: MaterialAcquiredService,
    private changeDetectorRef: ChangeDetectorRef,
    private materialDropdown1: MaterialDropdown,
    private vendorDropdown1: VendorDropdown,
    private materialBrandDropdown1: MaterialBrandDropdown
    ) {
    //this.subjectDropdown = sbjDropdon;
    this.materialDropdown = materialDropdown1;
    this.vendorDropdown = vendorDropdown1;
    this.materialBrandDropdown = materialBrandDropdown1;
  }
  ngOnDestroy() {
    this.receptions = null;
    this.error = null;
    this.selectedreception = null;
    this.reception = null;
    this.cols = null;
    this.wait = false;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.receptions = [];
    if (this.user == null) {
      this.user = new User();
    }

    
    this.cols = [
      { field: 'purchaseOrderNumber', header: 'N° bon de Commande', sortable: 'true', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  },
      // { field: 'orderDate', header: 'Date de commande', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Date'  },
      { field: 'slipNumber', header: 'N° Bordereau', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  },
      // { field: 'supplierInvoiceNumber', header: 'N° Facture Founisseur', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  },
      // { field: 'receptionDate', header: 'Date de reception', sortable: 'false', filter: 'true', style: { 'width': '20%' }, type: 'Date' },
      // { field: 'procesVerbaleNumber', header: 'N° Proces Verbale', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  },
      
      { field: 'amountPurchase', header: 'Montant Achat', sortable: 'false', filter: 'true', style: { 'width': '20%' }, type: 'Text' },
      { field: 'amountCustoms', header: 'Montant de la Douane', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  },
      { field: 'amountTotal', header: 'Montant total', sortable: 'false', filter: 'true', style: { 'width': '20%' }, 'type' : 'Text'  }
      
      ];


      this.colsMaterialsAcquired = [
        { field: 'material.name', header: 'Materiel', sortable: 'true', filter: 'true', style: { 'width': '19%' }, 'type' : 'Text'  },
        { field: 'materialBrand.name', header: 'Marque', sortable: 'false', filter: 'true', style: { 'width': '19%' }, 'type' : 'Text'  },
        
        { field: 'quantity', header: 'Quantité', sortable: 'false', filter: 'true', style: { 'width': '10%' }, 'type' : 'Text'  },
        { field: 'unitPrice', header: 'Prix unitaire', sortable: 'false', filter: 'true', style: { 'width': '10%' }, 'type' : 'Text'  },
        
        { field: 'amountPurchase', header: 'Montant Achat', sortable: 'false', filter: 'true', style: { 'width': '14%' }, type: 'Text' },
        { field: 'amountCustoms', header: 'Montant de la Douane', sortable: 'false', filter: 'true', style: { 'width': '14%' }, 'type' : 'Text'  },
        { field: 'amountTotal', header: 'Montant total', sortable: 'false', filter: 'true', style: { 'width': '14%' }, 'type' : 'Text'  }
        
        ];

        this.colsMaterialAcquired = [
          { field: 'identificationCode', header: 'Identifiant', sortable: 'true', filter: 'true', style: { 'width': '30%' }, 'type' : 'Text'  },
          { field: 'serialNumber', header: 'Numéro de série', sortable: 'false', filter: 'true', style: { 'width': '30%' }, 'type' : 'Text'  },
         
          { field: 'lastAssignmentDate', header: 'Dernière affectation', sortable: 'false', filter: 'true', style: { 'width': '25%' }, 'type' : 'Date'  },
          { field: 'isAffected', header: 'Est affecté', sortable: 'false', filter: 'true', style: { 'width': '15%' }, 'type' : 'Boolean'  },
          

          ];


    this.getAll();
  }

  showDialogToAdd() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newreception = true;
    this.reception = new Reception();
      this.displayDialog = true;
    /* } */
  }

  public getAll(): void {
    this.receptions = [];
    this.receptionService.getAll()
      .subscribe((data: Reception[]) => this.receptions = data,
        error => console.log(error),
        () => console.log('Get all reception complete'));
  }

  save() {
    try {
      this.error = '';
      console.log('reception :' + this.reception)
      this.receptionService.save(this.reception)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.reception = result;
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
      this.receptionService.delete(this.reception)
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
    if (this.newreception)
      this.receptions.push(this.reception);
    else
      this.receptions[this.findSelectedIndex()] = this.reception;

    var onTheFly: Reception[] = [];
    onTheFly.push(...this.receptions);
    this.receptions = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.receptions.splice(this.findSelectedIndex(), 1);
    var onTheFly: Reception[] = [];
    onTheFly.push(...this.receptions);
    this.receptions = onTheFly;
    this.resetData();
  }

  resetData() {
    this.reception = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

 

  findSelectedIndex(): number {
    return this.receptions.indexOf(this.selectedreception);
  }


  changePriceInout(evt: string): void {  
    let amountPurchase: number = (this.reception.amountPurchase === undefined || this.reception.amountPurchase === null) ? 0 : Number(this.reception.amountPurchase);
    let amountCustoms: number = (this.reception.amountCustoms === undefined || this.reception.amountCustoms === null) ? 0 : Number(this.reception.amountCustoms);
    
    this.reception.amountTotal = amountPurchase + amountCustoms;
  }

   /* Méthode appelée lorqu'une ligne de reception dans le tableau est déroulée */
   onRowReceptionSelected(evt) {
    this.newreception = false;
    this.reception = this.clone(evt.data);
    this.displayDialog = true;
    if (this.reception.orderDate != null) {
      this.reception.orderDate = new Date(this.reception.orderDate);
    }
    if (this.reception.receptionDate != null) {
      this.reception.receptionDate = new Date(this.reception.receptionDate);
    }

  }

  onRowReception(evt) {
    this.reception = this.clone(evt.data);

    if (this.reception.orderDate != null) {
      this.reception.orderDate = new Date(this.reception.orderDate);
    }
    if (this.reception.receptionDate != null) {
      this.reception.receptionDate = new Date(this.reception.receptionDate);
    }

    this.materialsAcquiredService.getByIdReception(this.reception.id)
      .subscribe((data: MaterialsAcquired[]) => this.materialsAcquireds = data,
        error => console.log(error),
        () => console.log('Get materials acquired by reception complete'));

  }
  
  clone(e: Reception): Reception {
    let areception = new Reception();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  showDialogToUploadDocumentsBonCommande (data) {
    this.fileUploader.showDialogToUploadDoc("immobilisation_commande", data);
  }

  showDialogToUploadDocumentsFactureFournisseur (data) {
    this.fileUploader.showDialogToUploadDoc("immobilisation_facture_fournisseur", data);
  }








  //Materials Acquired

  showDialogToAddMaterialsAcquired() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newMaterialsAcquired = true;
    this.materialsAcquired = new MaterialsAcquired();
      this.displayDialogMaterialsAcquired = true;
    /* } */
  }


  saveMaterialsAcquired() {
    try {
      this.error = '';
      this.materialsAcquired.reception = this.reception;
      this.materialsAcquired.dateEntryIntoStore = this.reception.receptionDate;
      console.log('reception :' + this.reception);
      console.log('materialsAcquired :' + this.materialsAcquired);
      this.wait = true;
      this.materialsAcquiredService.save(this.materialsAcquired)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.materialsAcquired = result;
            this.putInTableMaterialsAcquired();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialogMaterialsAcquired = true;
          }
          this.wait = false;
        });
    }
    catch (e) {
      console.log(e);
    }


  }

  public getByIdReception(idReception: number): void {
    this.materialsAcquireds = [];
    this.materialsAcquiredService.getByIdReception(idReception)
      .subscribe((data: MaterialsAcquired[]) => this.materialsAcquireds = data,
        error => console.log(error),
        () => console.log('Get materials acquired by reception complete'));
  }


  deleteMaterialsAcquired() {
    try {
      this.error = '';
      this.materialsAcquiredService.delete(this.materialsAcquired)
        .subscribe(result => {
          if (result) {
            this.removeFromTableMaterialsAcquired();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialogMaterialsAcquired = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTableMaterialsAcquired() {
    if (this.newMaterialsAcquired)
      this.materialsAcquireds.push(this.materialsAcquired);
    else
      this.materialsAcquireds[this.findMatrialsSelectedIndex()] = this.materialsAcquired;
      

    var onTheFly: MaterialsAcquired[] = [];
    onTheFly.push(...this.materialsAcquireds);
    this.materialsAcquireds = onTheFly;

    this.resetDataMaterialsAcquired();
  }

  removeFromTableMaterialsAcquired() {
    this.materialsAcquireds.splice(this.findMatrialsSelectedIndex(), 1);
    var onTheFly: MaterialsAcquired[] = [];
    onTheFly.push(...this.materialsAcquireds);
    this.materialsAcquireds = onTheFly;
    this.resetDataMaterialsAcquired();
  }

  resetDataMaterialsAcquired() {
    this.materialsAcquired = null;
    this.displayDialogMaterialsAcquired = false;
    this.changeDetectorRef.detectChanges();
  }

  findMatrialsSelectedIndex(): number {
    return this.materialsAcquireds.indexOf(this.selectedMaterialsAcquired);
  }

/* Méthode appelée lorqu'une ligne de materilsAcquired dans le tableau est déroulée */
  onRowMatrialsAcquiredSelected(evt){
    this.newreception = false;
    this.materialsAcquired = this.cloneMaterialsAcquired(evt.data);
    this.displayDialogMaterialsAcquired = true;


    if (this.materialsAcquired.dateEntryIntoStore != null) {
      this.materialsAcquired.dateEntryIntoStore = new Date(this.materialsAcquired.dateEntryIntoStore);
    }


  }
  onRowMatrialsAcquired(evt) {
    this.materialsAcquired = this.cloneMaterialsAcquired(evt.data);


    if (this.materialsAcquired.dateEntryIntoStore != null) {
      this.materialsAcquired.dateEntryIntoStore = new Date(this.materialsAcquired.dateEntryIntoStore);
    }

    this.materialAcquiredService.getByIdMaterialsAcquired(this.materialsAcquired.id)
      .subscribe((data: MaterialAcquired[]) => this.materialAcquireds = data,
        error => console.log(error),
        () => console.log('Get material acquired by materials acquired complete'));

  }
  



  cloneMaterialsAcquired(e: MaterialsAcquired): MaterialsAcquired {
    let aMaterialsAcquired = new MaterialsAcquired();
    for (let prop in e) {
      aMaterialsAcquired[prop] = e[prop];
    }
    return aMaterialsAcquired;
  }


  changePriceMaterialsAcquiredInout(evt: string): void {  
    let amountPurchase: number = (this.materialsAcquired.amountPurchase === undefined || this.materialsAcquired.amountPurchase === null) ? 0 : Number(this.materialsAcquired.amountPurchase);
    let amountCustoms: number = (this.materialsAcquired.amountCustoms === undefined || this.materialsAcquired.amountCustoms === null) ? 0 : Number(this.materialsAcquired.amountCustoms);
    let quantity: number = (this.materialsAcquired.quantity === undefined || this.materialsAcquired.quantity === null) ? 0 : Number(this.materialsAcquired.quantity);
    
    this.materialsAcquired.amountTotal = amountPurchase + amountCustoms;

    if(quantity != 0){
      this.materialsAcquired.unitPrice = Math.ceil((this.materialsAcquired.amountTotal/quantity));
    }else{
      this.materialsAcquired.unitPrice = 0;
    }

  }











  //Material Acquired

  showDialogToAddMaterialAcquired() {
    /* if (this.user != null && this.user.role == 10) { */
      this.newMaterialAcquired = true;
    this.materialAcquired = new MaterialAcquired();
      this.displayDialogMaterialAcquired = true;
    /* } */
  }


  saveMaterialAcquired() {
    try {
      this.error = '';
      this.materialAcquired.materialsAcquired = this.materialsAcquired;
      //this.materialAcquired. = this.;
      console.log('materialsAcquired :' + this.materialsAcquired);
      console.log('materialAcquired :' + this.materialAcquired);
      this.materialAcquiredService.save(this.materialAcquired)
        .subscribe(result => {
          if (result.id > 0) {
            //this.msg = Constants.saveSuccess;
            this.materialAcquired = result;
            this.putInTableMaterialAcquired();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialogMaterialAcquired = true;
          }
        });
    }
    catch (e) {
      console.log(e);
    }


  }

  public getByIdMaterialsAcquired(IdMaterialsAcquired: number): void {
    this.materialAcquireds = [];
    this.materialAcquiredService.getByIdMaterialsAcquired(IdMaterialsAcquired)
      .subscribe((data: MaterialAcquired[]) => this.materialAcquireds = data,
        error => console.log(error),
        () => console.log('Get material acquired by materials required complete'));
  }


  deleteMaterialAcquired() {
    try {
      this.error = '';
      this.materialAcquiredService.delete(this.materialAcquired)
        .subscribe(result => {
          if (result) {
            this.removeFromTableMaterialAcquired();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialogMaterialAcquired = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTableMaterialAcquired() {
    if (this.newMaterialAcquired)
      this.materialAcquireds.push(this.materialAcquired);
    else
      this.materialAcquireds[this.findMatrialSelectedIndex()] = this.materialAcquired;

    var onTheFly: MaterialAcquired[] = [];
    onTheFly.push(...this.materialAcquireds);
    this.materialAcquireds = onTheFly;

    this.resetDataMaterialAcquired();
  }

  removeFromTableMaterialAcquired() {
    this.materialAcquireds.splice(this.findMatrialSelectedIndex(), 1);
    var onTheFly: MaterialAcquired[] = [];
    onTheFly.push(...this.materialAcquireds);
    this.materialAcquireds = onTheFly;
    this.resetDataMaterialAcquired();
  }

  resetDataMaterialAcquired() {
    this.materialAcquired = null;
    this.displayDialogMaterialAcquired = false;
    this.changeDetectorRef.detectChanges();
  }

  findMatrialSelectedIndex(): number {
    return this.materialAcquireds.indexOf(this.selectedMaterialAcquired);
  }

/* Méthode appelée lorqu'une ligne de materilsAcquired dans le tableau est déroulée */
  onRowMatrialSelected(evt){
    this.newMaterialsAcquired = false;
    this.materialAcquired = this.cloneMaterialAcquired(evt.data);
    this.displayDialogMaterialAcquired = true;


    if (this.materialAcquired.lastAssignmentDate != null) {
      this.materialAcquired.lastAssignmentDate = new Date(this.materialAcquired.lastAssignmentDate);
    }

    if (this.materialAcquired.firstReleaseDateInStore != null) {
      this.materialAcquired.firstReleaseDateInStore = new Date(this.materialAcquired.firstReleaseDateInStore);
    }


  }



  cloneMaterialAcquired(e: MaterialAcquired): MaterialAcquired {
    let aMaterialAcquired = new MaterialAcquired();
    for (let prop in e) {
      aMaterialAcquired[prop] = e[prop];
    }
    return aMaterialAcquired;
  }

}
