import { Constants } from '../../app.constants';
import { User } from '../../models/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-search-component',
  template: `<form (ngSubmit)="search()" #searchForm="ngForm">
              <div class="ui-grid ui-grid-responsive ui-fluid">
                <div class="ui-grid-row">
                  <div class="ui-grid-col-10">
                    <input type="text" pInputText class="form-control" id="searchT"
                      required [(ngModel)]="schText" (ngModelChange)="sendData($event)"
                      placeholder="{{SEARCH_TEXT}}" name="searchT"
                      #searchT="ngModel">
                  </div>
                  <div class="ui-grid-col-2">
                    <button type="button" pButton icon="fa-search" (click)="search()"
                      label="Go" style="margin-top: 0px; height: 35px;"></button>
                  </div>
                </div>
            
              </div>
            </form>`
})
  
  
export class SearchComponent implements OnInit {
  
  @Input('user') user: User;
   
  @Input()
  public search: Function; 
  
  @Output() 
  parentSearchText: EventEmitter<string> = new EventEmitter<string>();
  
  @Input()
  public schText: string;
  
   public SEARCH_TEXT: string = "Entrer le nom du produit ou une partie du nom";
  
  constructor() {

  }
  
  ngOnInit() {
  
  }

  sendData(data:any) {
    this.parentSearchText.emit(this.schText);
  }
}
