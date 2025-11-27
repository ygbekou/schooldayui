import {Component, OnInit, OnDestroy} from '@angular/core';
import {NewsService} from '../services/news.service';
import {News} from '../models/news';
import {Constants} from '../app.constants';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-single',
  templateUrl: '../pages/newsSingle.html',
  providers: [NewsService, Constants]
})
export class NewsSingle implements OnInit, OnDestroy {
  constructor(private newsService: NewsService, private route: ActivatedRoute,
    private router: Router) {

  }
  news: News = new News();
  first3: News[];

  ngOnDestroy() {
    this.news = null;
    this.first3 = null;
  }
  ngOnInit() {
    if (!(this.news.id > 0)) {
      this.newsService.getNews(Cookie.get('newsId'))
        .subscribe(result => {
          if (result.id > 0) {
            this.news = result;
          }
        });

      //first 3
      this.newsService.getFirst3()
        .subscribe((data: News[]) => this.first3 = data,
        error => console.log(error),
        () => console.log('Get first 3 News complete'));
    }


    this.route
      .queryParams
      .subscribe(params => {
        const newsId = params['id'];
        if (newsId) {
          //alert(newsId)
          this.newsService.getNews(newsId)
            .subscribe(result => {
              if (result.id > 0) {
                this.news = result;
              }
            });
        }
        console.log('Query param page: ', newsId);
      });

  }
  setCurrentNews(aNews) {
    this.news = aNews;
  }
}
