import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service';
import { Constants } from '../app.constants'; 
import { VideoPair } from '../models/videopair';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-videos',
  templateUrl: '../pages/videos.html',
  providers: [VideoService, Constants]
})
export class Videos implements OnInit {

  videoPairs: VideoPair[] = []; 
  constructor
    (private domSanitizer: DomSanitizer,
    private videoService: VideoService,
    private Constants: Constants, private changeDetectorRef: ChangeDetectorRef
    ) {
    

  }

  ngOnInit() {       
      this.videoService.getActiveVideos()
        .subscribe((data: Video[]) =>{ 
          var videos:Video[] = data;
          var j=0;
            
              for (let i = 0; i <  videos.length; i++) {
                var videoPair= new VideoPair();
                  videoPair.video1= videos[i]; 
                if(++i<videos.length){
                  videoPair.video2=videos[i]; 
                }else{
                  videoPair.video2=new Video(); 
                }
                this.videoPairs[j++]=videoPair;
              }
        
        
        },
        error => console.log(error),
        () => console.log('Get all Active Videos complete'));
      
      this.changeDetectorRef.detectChanges();
  }


  public sanitize(url): SafeResourceUrl {
    if (url != null) { 
      return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+url+"?autoplay=0");
    } else {
      return null;
    }
  }
}
