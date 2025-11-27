import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies'; 
@Component({ 
  selector: 'app-admin-video',
  templateUrl: '../pages/adminVideo.html',
  providers: [VideoService]
})
export class AdminVideo implements OnInit {

  public videos: Video[]=[];
  public error: String = '';
  public selectedVideo: Video=new Video();
  displayDialog: boolean;
  video: Video = new Video();
  newVideo: boolean;
  cols : any[];
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL; 
  
  constructor
  (
    private videoService: VideoService, 
    private changeDetectorRef : ChangeDetectorRef
  ) {

  }
  ngOnInit() {
        this.cols = [
        {field: 'link', header: Constants.LINK, sortable : 'true', filter : 'true'},
        {field: 'videoDate', header: Constants.DATE, type : 'Date', sortable : 'true'},
        {field: 'description', header: Constants.DESCRIPTION, sortable : 'false', filter : 'true'},
        {field: 'status', header: Constants.ACTIVE, sortable : 'true', filter : 'true'},
        {field: 'rank', header: Constants.RANK, sortable : 'true', filter : 'true'}
    ];
  }

  public getAll(): void {
    this.videos = [];
    this.videoService.getAll()
      .subscribe((data: Video[]) => this.videos = data,
      error => console.log(error),
      () => console.log('Get all Videos complete'));
  }


  showDialogToAdd() {
    this.newVideo = true;
    this.video = new Video();
    this.displayDialog = true;
  }

  save() {
    try {
         this.error = '';
        this.videoService.save(this.video)
        .subscribe(result => {
          if (result.id > 0) {            
            this.video = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

 delete() {
        try {
          this.error = '';
          this.videoService.delete(this.video)
        .subscribe(result => {
          if (result) { 
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  putInTable() {
    if (this.newVideo)
      this.videos.push(this.video);
    else
      this.videos[this.findSelectedIndex()] = this.video;

    var onTheFly : Video [] = [];
    onTheFly.push(...this.videos);
    this.videos = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.videos.splice(this.findSelectedIndex(), 1);
       var onTheFly : Video [] = [];
    onTheFly.push(...this.videos);
    this.videos = onTheFly;
    this.resetData();
  }

  resetData() {
    this.video = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }
  
  onRowSelect(evt) {
    this.newVideo = false;
    this.video = this.clone(evt.data);
    this.video.videoDate = new Date(this.video.videoDate);
    this.displayDialog = true;
  }

   clone(e: Video): Video {
        let aVideo = new Video();
        for(let prop in e) {
            aVideo[prop] = e[prop];
        }
        return aVideo;
    }
  
  findSelectedIndex(): number {
    return this.videos.indexOf(this.selectedVideo);
  }
}
