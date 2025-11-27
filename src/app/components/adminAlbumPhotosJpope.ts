import { Component, OnInit,OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FileUploader } from './fileUploader';
import { DataTableModule, DialogModule, InputTextareaModule,CheckboxModule } from 'primeng/primeng';
import { User } from '../models/User';  
import { PhotoJpopeService } from 'app/services/photoJpope.service';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { PhotoJpope } from 'app/models/photoJpope';
import { SchoolYear } from 'app/models/schoolYear';
@Component({ 
  selector: 'app-admin-album-photos-jpope',
  templateUrl: '../pages/adminAlbumPhotosJpope.html',
  providers: [PhotoJpopeService, SchoolYearDropdown]
})
export class AdminAlbumPhotosJpope implements OnInit,OnDestroy {

  public photoJpopes: PhotoJpope[];
  public error: String = '';
  public selectedPhotoJpope: PhotoJpope;
  displayDialog: boolean;
  photoJpope: PhotoJpope = new PhotoJpope();
  newPhotoJpope: boolean;
  cols : any[];
  @ViewChild(FileUploader) fileUploader:FileUploader;
  
  public schoolYearDropdown: SchoolYearDropdown;
  theSchoolYear: SchoolYear;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
  (
    private photoJpopeService: PhotoJpopeService, 
    private schYearDropdown: SchoolYearDropdown,
    private changeDetectorRef : ChangeDetectorRef
  ) {
    this.schoolYearDropdown = schYearDropdown;
  }
  ngOnInit() {
     this.cols = [
        { field: 'schoolYear.year', header: Constants.SCHOOL_YEAR, sortable: 'false', filter: 'true', style: { 'overflow': 'visible' } },
        {field: 'title', header: Constants.GROUP, sortable : 'false', filter : 'true'},
        {field: 'description', header: Constants.DESCRIPTION, sortable : 'false', filter : 'true'},
        {field: 'status', header:Constants.ACTIVE, sortable : 'true', filter : 'true'},
        {field: 'rank', header: Constants.RANK, sortable : 'true', filter : 'true'}
    ];
  }
  ngOnDestroy() {
    this.photoJpopes = null;
    this.error = null;
    this.selectedPhotoJpope = null;
    this.photoJpope = null;
    this.cols = null;
  }
  public getAll(): void {
    this.photoJpopes = [];
    this.photoJpopeService.getAll()
      .subscribe((data: PhotoJpope[]) => this.photoJpopes = data,
      error => console.log(error),
      () => console.log('Get all PhotoJpopes complete'));
  }


  showDialogToAdd() {
    this.newPhotoJpope = true;
    this.photoJpope = new PhotoJpope();
    this.displayDialog = true;
  }

  save() {
      console.log(this.photoJpope);
    try {
         this.error = '';
        this.photoJpopeService.save(this.photoJpope)
        .subscribe(result => {
          if (result.id > 0) {            
            this.photoJpope = result;
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
          this.photoJpopeService.delete(this.photoJpope)
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
    if (this.newPhotoJpope)
      this.photoJpopes.push(this.photoJpope);
    else
      this.photoJpopes[this.findSelectedIndex()] = this.photoJpope;

    var onTheFly : PhotoJpope [] = [];
    onTheFly.push(...this.photoJpopes);
    this.photoJpopes = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.photoJpopes.splice(this.findSelectedIndex(), 1);
    var onTheFly : PhotoJpope [] = [];
    onTheFly.push(...this.photoJpopes);
    this.photoJpopes = onTheFly;
    this.resetData();
  }
  
  resetData() {
    this.photoJpope = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPhotoJpope = false;
    this.photoJpope = this.clone(evt.data);
    this.displayDialog = true;
  }

   clone(e: PhotoJpope): PhotoJpope {
        let aPhotoJpope = new PhotoJpope();
        for(let prop in e) {
            aPhotoJpope[prop] =e[prop];
        }
        return aPhotoJpope;
    }
  
  findSelectedIndex(): number {
    return this.photoJpopes.indexOf(this.selectedPhotoJpope);
  }
  
  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("jpope", data);
  }

}
