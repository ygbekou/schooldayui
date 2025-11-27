import {Component, LOCALE_ID, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../app.constants';
import {Observable} from 'rxjs/Rx';
import {GrowlModule, Message} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';

@Component({
  selector: 'file-uploader',
  templateUrl: '../pages/fileUploader.html',
  providers: [{provide: LOCALE_ID, useValue: Constants.LOCALE}, Constants]
})


export class FileUploader implements OnInit {
  displayFileUploaderDialog: boolean;
  uploadFileUrl: string;
  msgs: Message[];
  errorMessage: string;
  uploadedFiles: any[] = [];

  CLOSE_LABEL: string = Constants.CLOSE_LABEL;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  onSubmit() {
  }

  onUpload(event) {
    this.errorMessage = event.xhr.response;
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: Constants.FILE_UPLOADED, detail: event.xhr.response});
  }

  showDialogToUploadImage(entity, data) {
    console.log("service avant m�thode");
    this.displayFileUploaderDialog = true;
    this.uploadFileUrl = Constants.apiServer + "/service/fileUploader/uploadFile/" + entity + "/" + data.id;
    console.log("service apr�s m�thode");
  }

  showDialogToUploadRecuPaiement(entity, data): Observable<any> {
    console.log(entity);
    this.displayFileUploaderDialog = true;
	this.uploadFileUrl = Constants.apiServer + "/service/fileUploader/uploadFile/" + entity + "/" + data.id;
	
	return ;
  }

  uploadFile(entity) {
    this.displayFileUploaderDialog = true;
    this.uploadFileUrl = Constants.apiServer + "/service/fileUploader/load/" + entity;
  }

  showDialogToUploadDoc(entity, data) {
    console.log("service avant m�thode");
    this.displayFileUploaderDialog = true;
    this.uploadFileUrl = Constants.apiServer + "/service/fileUploader/uploadFile/" + entity + "/" + data.id;
    console.log("service apr�s m�thode");
  }

  close() {
    this.errorMessage = " ";
    this.displayFileUploaderDialog = false;
    this.changeDetectorRef.detectChanges();
    this.uploadedFiles = [];
  }
}
