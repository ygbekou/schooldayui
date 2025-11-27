import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { Faqs } from '../models/faqs';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-faqs',
  templateUrl: '../pages/faqs.html',
  providers: [FaqService, Constants]
})
export class FaqPage implements OnInit, OnDestroy {
  constructor(private faqService: FaqService) {

  }
  faqs: Faqs[] = [];
  ngOnDestroy() {
    this.faqs = null;
  }
  ngOnInit() {
    this.faqService.getActiveFaqs()
      .subscribe((data: Faqs[]) => this.faqs = data,
      error => console.log(error),
      () => console.log('Get active Faq complete'));
  }
}
