import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: 'module.id',
  selector: 'app-home',
  templateUrl: '../pages/home.html'
})

export class Home {
  title = 'Home Page';
  schoolName = '';

  constructor(private route: ActivatedRoute) {

    console.log('Home Page loading ...')
    this.route.params.subscribe(params => {
      this.schoolName = params['schoolName'];
    });
  }
}
