import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({ 
  selector: 'app-news-list',
  templateUrl: '../pages/news.html',
  providers: [NewsService, Constants]
})
export class Newss implements OnInit, OnDestroy {
 public newss: News[];
  constructor(private newsService: NewsService) {

  }

  ngOnInit() {
    this.getAll();
  }
  ngOnDestroy() {
    this.newss = null; 
  }
  private getAll(): void {
    this.newsService.getAll()
      .subscribe((data: News[]) => this.newss = data,
      error => console.log(error),
      () => console.log('Get All news Complete'));
  }

   setCurrentNews(aNews) {
    Cookie.set('newsId',aNews.id);
  }
}
