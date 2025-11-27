import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { TestimonyService } from '../services/testimony.service';
import { Constants } from '../app.constants';
import { Testimony } from '../models/testimony';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: '../pages/testimonialList.html',
  providers: [TestimonyService, Constants]
})
export class TestimonialList implements OnInit {
  testimonies: Testimony[] = [];
  activeT: Testimony ;
  constructor
    (
    private testimonyService: TestimonyService
    ) {
  }
  ngOnInit() {
    this.testimonyService.getActiveTestimonies()
      .subscribe((data: Testimony[]) => {
        console.log('Testimonies count=' + data.length);
        for (let i = 0; i < data.length; i++) {
          if (i == 0) {
            this.activeT = data[0];
          } else {
            this.testimonies.push(data[i]);
          }
        }
      },
      error => console.log(error),
      () => console.log('Get all Testimonies complete'));
  }
}
