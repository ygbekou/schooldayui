import { Component, OnInit } from '@angular/core';
import { EditorModule, SharedModule, AutoCompleteModule, InputTextModule, DropdownModule, } from 'primeng/primeng';
import { ConditionStage } from '../models/conditionStage';
import { Constants } from '../app.constants';

//import { CampusImage } from '../models/campusImage';
//import { CampusImageService } from '../services/campusImage.service';


@Component({
  selector: 'app-conditionStage',
  templateUrl: '../pages/conditionStage.html'
})

export class ConditionStages  {
}


//export class ConditionStageComponent implements OnInit {
//
//  images: CampusImage[];
//
//  constructor
//    (
//    private campusImageService: CampusImageService
//    ) {
//
//  }
//  ngOnInit() { 
//    this.campusImageService.getActiveImages()
//      .subscribe((data: CampusImage[]) => { 
//        this.images=data;
//       },
//      error => console.log(error),
//      () => console.log('Get Active CampusImages complete'));
//
//
//  }
//}
