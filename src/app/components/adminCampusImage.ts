import { Component, OnInit,OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CampusImage } from '../models/campusImage';
import { CampusImageService } from '../services/campusImage.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FileUploader } from './fileUploader';
import { DataTableModule, DialogModule, InputTextareaModule,CheckboxModule } from 'primeng/primeng';
import { User } from '../models/User';  
@Component({ 
  selector: 'app-admin-campusimage',
  templateUrl: '../pages/adminCampusImage.html',
  providers: [CampusImageService]
})
export class AdminCampusImage implements OnInit,OnDestroy {

  public campusImages: CampusImage[];
  public error: String = '';
  public selectedCampusImage: CampusImage;
  displayDialog: boolean;
  campusImage: CampusImage = new CampusImage();
  newCampusImage: boolean;
  cols : any[];
  @ViewChild(FileUploader) fileUploader:FileUploader;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
  (
    private campusImageService: CampusImageService, 
    private changeDetectorRef : ChangeDetectorRef
  ) {

  }
  ngOnInit() {
     this.cols = [
        {field: 'title', header: Constants.GROUP, sortable : 'false', filter : 'true'},
        {field: 'description', header: Constants.DESCRIPTION, sortable : 'false', filter : 'true'},
        {field: 'status', header:Constants.ACTIVE, sortable : 'true', filter : 'true'},
        {field: 'rank', header: Constants.RANK, sortable : 'true', filter : 'true'}
    ];
  }
  ngOnDestroy() {
    this.campusImages = null;
    this.error = null;
    this.selectedCampusImage = null;
    this.campusImage = null;
    this.cols = null;
  }
  public getAll(): void {
    this.campusImages = [];
    this.campusImageService.getAll()
      .subscribe((data: CampusImage[]) => this.campusImages = data,
      error => console.log(error),
      () => console.log('Get all CampusImages complete'));
  }


  showDialogToAdd() {
    this.newCampusImage = true;
    this.campusImage = new CampusImage();
    this.displayDialog = true;
  }

  save() {
    try {
         this.error = '';
        this.campusImageService.save(this.campusImage)
        .subscribe(result => {
          if (result.id > 0) {            
            this.campusImage = result;
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
          this.campusImageService.delete(this.campusImage)
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
    if (this.newCampusImage)
      this.campusImages.push(this.campusImage);
    else
      this.campusImages[this.findSelectedIndex()] = this.campusImage;

    var onTheFly : CampusImage [] = [];
    onTheFly.push(...this.campusImages);
    this.campusImages = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.campusImages.splice(this.findSelectedIndex(), 1);
    var onTheFly : CampusImage [] = [];
    onTheFly.push(...this.campusImages);
    this.campusImages = onTheFly;
    this.resetData();
  }
  
  resetData() {
    this.campusImage = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCampusImage = false;
    this.campusImage = this.clone(evt.data);
    this.displayDialog = true;
  }

   clone(e: CampusImage): CampusImage {
        let aCampusImage = new CampusImage();
        for(let prop in e) {
            aCampusImage[prop] =e[prop];
        }
        return aCampusImage;
    }
  
  findSelectedIndex(): number {
    return this.campusImages.indexOf(this.selectedCampusImage);
  }
  
  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("gallery", data);
  }

}
