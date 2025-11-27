import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { News } from '../models/news';
import { NewsSingle } from './newsSingle';
import { NewsService } from '../services/news.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({ 
  selector: 'app-news-short-list',
  templateUrl: '../pages/newsShortList.html',
  providers: [NewsService, Constants]
})
export class NewsShortList implements OnInit, OnDestroy {

  first3: News[];
  threePlus: News[][];
  @ViewChild(NewsSingle) newsSingle: NewsSingle;
  constructor(private newsService: NewsService) {

  }
  ngOnDestroy() {
    this.first3 = null;
    this.threePlus = null; 
  }
  ngOnInit() {
    //first 3
    this.newsService.getFirst3()
      .subscribe((data: News[]) => this.first3 = data,
      error => console.log(error),
      () => console.log('Get first 3 News complete'));

    //After 3
    this.newsService.get3Plus()
      .subscribe((data: News[][]) => this.threePlus = data,
      //.subscribe((data: News[][]) => console.log(data),
      error => console.log(error),
      () => console.log('Get After 3 News complete' + this.threePlus));
  }

  setCurrentNews(aNews) {
    Cookie.set('newsId',aNews.id);
  }
}
