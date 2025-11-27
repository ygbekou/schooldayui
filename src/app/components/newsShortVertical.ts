import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { News } from '../models/news';
import { NewsSingle } from './newsSingle';
import { NewsService } from '../services/news.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({ 
  selector: 'app-news-short-vert',
  templateUrl: '../pages/newsShortVetical.html',
  providers: [NewsService, Constants]
})
export class NewsShortVertical implements OnInit, OnDestroy {

  latestNews: News[]; 
  constructor(private newsService: NewsService) {

  }
  ngOnDestroy() {
    this.latestNews = null; 
  }
  ngOnInit() {
    //first 3
    this.newsService.getLatestNews()
      .subscribe((data: News[]) => this.latestNews = data,
      error => console.log(error),
      () => console.log('Get first 3 News complete'));
 
  }

  setCurrentNews(aNews) {
    Cookie.set('newsId',aNews.id);
  }
}
