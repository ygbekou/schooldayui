import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Author } from '../models/author';
import { AuthorService } from '../services/author.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies'; 
import { ImmoReception } from './immo/ImmoReception';


@Component({
  selector: 'app-admin-immo',
  templateUrl: '../pages/adminImmobilization.html',
  providers: [AuthorService]
})
export class AdminImmobilization implements OnInit, OnDestroy {

  public authors: Author[];
  public error: String = '';
  public selectedAuthor: Author;
  displayDialog: boolean;
  author: Author = new Author();
  newAuthor: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL; 
  ADD_IMAGE: string=Constants.ADD_IMAGE;

  @ViewChild(ImmoReception) adminImmoReception: ImmoReception;
  constructor
    (
    private authorService: AuthorService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    this.authors = null;
    this.error = null;
    this.selectedAuthor = null;
    this.author = null;
    this.cols = null;
  }

  ngOnInit() {
    this.cols = [
      { field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true' },
      { field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true' }
    ];
  }

  public getAll(): void {
    this.authors = [];
    this.authorService.getAll()
      .subscribe((data: Author[]) => this.authors = data,
      error => console.log(error),
      () => console.log('Get all Authors complete'));
  }


  showDialogToAdd() {
    this.newAuthor = true;
    this.author = new Author();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.authorService.save(this.author)
        .subscribe(result => {
          if (result.id > 0) {
            this.author = result;
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
      this.authorService.delete(this.author)
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

   onTabChange(evt) {
      if (evt.index == 0) {
        
      } else if (evt.index == 1) {
        
      } else if (evt.index == 2) {
       
      } else if (evt.index == 3) {
       
      } else if (evt.index == 4) {
       
      }else if(evt.index == 5){
        
      }
    }


  putInTable() {
    if (this.newAuthor)
      this.authors.push(this.author);
    else
      this.authors[this.findSelectedIndex()] = this.author;

    var onTheFly : Author [] = [];
    onTheFly.push(...this.authors);
    this.authors = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.authors.splice(this.findSelectedIndex(), 1);
     var onTheFly : Author [] = [];
    onTheFly.push(...this.authors);
    this.authors = onTheFly;
    this.resetData();
  }

  resetData() {
    this.author = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAuthor = false;
    this.author = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Author): Author {
    let aAuthor = new Author();
    for (let prop in e) {
      aAuthor[prop] = e[prop];
    }
    return aAuthor;
  }

  findSelectedIndex(): number {
    return this.authors.indexOf(this.selectedAuthor);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("author", data);
  }
}
