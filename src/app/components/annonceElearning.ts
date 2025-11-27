import {LOCALE_ID, Component, OnInit } from '@angular/core';
import { Constants } from '../app.constants';

@Component({ 
  selector: 'app-annonce-elearning',
  templateUrl: '../pages/annonceElearning.html',
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, Constants]
})
export class AnnonceElearning implements OnInit {

  constructor( ) {

  }

  ngOnInit() {

  }

}
