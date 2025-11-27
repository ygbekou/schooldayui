import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/primeng';
import { CampusImage } from '../models/campusImage';
import { CampusImageService } from '../services/campusImage.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-visite-guide',
  templateUrl: '../pages/visiteGuide.html'
})

export class VisiteGuide implements OnInit {

  images: CampusImage[];

  constructor
    (
    private campusImageService: CampusImageService
    ) {

  }
  ngOnInit() { 
    this.campusImageService.getActiveImages()
      .subscribe((data: CampusImage[]) => { 
        this.images=data;
       },
      error => console.log(error),
      () => console.log('Get Active CampusImages complete'));


  }
}
