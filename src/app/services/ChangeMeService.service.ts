import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx'; 
import { Constants } from '../app.constants';

@Injectable()
export class ChangeMeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http, private Constants: Constants) {
    //
  }
 
}