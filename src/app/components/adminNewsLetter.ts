import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { NewsLetter } from 'app/models/newsLetter';
import { UserService } from 'app/services';
@Component({
  selector: 'app-admin-news-letter',
  templateUrl: '../pages/adminNewsLetter.html'
})
export class AdminNewsLetter implements OnInit, OnDestroy {

  public newsLetters: NewsLetter[];
  public error: String = '';

  cols: any[];
 
  
  constructor
    (
    private userService : UserService
    ) {
      
  }
  ngOnInit() {
    this.cols = [
    { field: 'createDate', header: "Date d'ajout", type: 'Date', sortable: 'true',style:  {'width':'30%'} },
      { field: 'email', header: "email", sortable: 'true', filter: 'true', style:  {'width':'70%'} } 
      
    ];

    this.getAll();
  }

  ngOnDestroy() {
    this.newsLetters = null;
    this.error = null;
  }

  public getAll(): void {
    this.newsLetters = [];
    this.userService.getAllNewsLetterEmail()
      .subscribe((data: NewsLetter[]) => this.newsLetters = data,
      error => console.log(error),
      () => console.log('Get all NewsLetters complete'));
  }



  setCurrentNews(aNews) {
    Cookie.set('newsId', aNews.id);
  }
}
