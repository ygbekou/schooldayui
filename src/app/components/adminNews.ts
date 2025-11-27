import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/User';  
@Component({
  selector: 'app-admin-news',
  templateUrl: '../pages/adminNews.html',
  providers: [NewsService]
})
export class AdminNews implements OnInit, OnDestroy {

  public newss: News[];
  public error: String = '';
  public selectedNews: News;
  displayDialog: boolean;
  news: News = new News();
  newNews: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private newsService: NewsService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
      
  }
  ngOnInit() {
    this.cols = [
      { field: 'title', header: Constants.TITLE, sortable: 'true', filter: 'true', style:  {'width':'25%'} },    
      { field: 'author', header: Constants.AUTEUR, sortable: 'true', filter: 'true'  , style:  {'width':'20%'}},
      { field: 'newsDate', header: Constants.DATE, type: 'Date', sortable: 'true' },
      { field: 'ranking', header: Constants.RANK, sortable: 'true', filter: 'true' },
      { field: 'status', header:Constants.ACTIVE, sortable: 'true', filter: 'true' }
    ];
  }

  ngOnDestroy() {
    this.newss = null;
    this.error = null;
    this.selectedNews= null;
    this.news = null;
    //this.cols=null;
  }

  public getAll(): void {
    this.newss = [];
    this.newsService.getAll()
      .subscribe((data: News[]) => this.newss = data,
      error => console.log(error),
      () => console.log('Get all News complete'));
  }


  showDialogToAdd() {
    this.newNews = true;
    this.news = new News();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.newsService.save(this.news)
        .subscribe((result) => {

          // console.log(result);
          if (result.id > 0) {
            this.news = result;
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
      this.newsService.delete(this.news)
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
    if (this.newNews)
      this.newss.push(this.news);
    else
      this.newss[this.findSelectedIndex()] = this.news;
    
    var onTheFly : News [] = [];
    onTheFly.push(...this.newss);
    this.newss = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.newss.splice(this.findSelectedIndex(), 1);
     var onTheFly : News [] = [];
    onTheFly.push(...this.newss);
    this.newss = onTheFly;
    this.resetData();
  }

  resetData() {
    this.news = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newNews = false;
    this.news = this.clone(evt.data);
    this.news.newsDate = new Date(this.news.newsDate);
    this.displayDialog = true;
  }

  clone(e: News): News {
    let aNews = new News();
    for (let prop in e) {
      aNews[prop] = e[prop];
    }
    return aNews;
  }

  findSelectedIndex(): number {
    return this.newss.indexOf(this.selectedNews);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("news", data);
  }

  setCurrentNews(aNews) {
    Cookie.set('newsId', aNews.id);
  }
}
