import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Configuration } from '../models/configuration';
import { ConfigurationService } from '../services/configuration.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-admin-configuration',
  templateUrl: '../pages/adminConfiguration.html',
  providers: []
})
export class AdminConfiguration implements OnInit, OnDestroy {

  public configurations: Configuration[];
  public error: String = '';
  public selectedConfiguration: Configuration;
  displayDialog: boolean;
  configuration: Configuration = new Configuration();
  newConfiguration: boolean;
  cols: any[];

  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
      private configurationService: ConfigurationService,
      private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
      { field: 'description', header: Constants.DESCRIPTION, sortable: 'true', filter: 'false' },
      { field: 'value', header: Constants.VALEUR, sortable: 'true', filter: 'false' }

    ];
  }
  ngOnDestroy() {
    this.configurations = null;
    this.error = null;
    this.selectedConfiguration = null;
    this.configuration = null;
    this.cols = null;
  }
  public getAll(): void {
    this.configurations = [];
    this.configurationService.getAll()
      .subscribe((data: Configuration[]) => {
        this.configurations = data
        for (let i = 0; i < this.configurations.length; i++) {
          if (this.configurations[i].name == "ORG_EMAIL_PASSWORD") {
            this.configurations[i].value = "******";
            break;
          }
        }
      },
        error => console.log(error),
        () => console.log('Get all Configurations complete'));
  }


  showDialogToAdd() {
    this.newConfiguration = true;
    this.configuration = new Configuration();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.configurationService.save(this.configuration)
        .subscribe(result => {
          if (result.id > 0) {
            this.configuration = result;
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
      this.configurationService.delete(this.configuration)
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
    if (this.newConfiguration)
      this.configurations.push(this.configuration);
    else
      this.configurations[this.findSelectedIndex()] = this.configuration;

    var onTheFly: Configuration[] = [];
    onTheFly.push(...this.configurations);
    this.configurations = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.configurations.splice(this.findSelectedIndex(), 1);
    var onTheFly: Configuration[] = [];
    onTheFly.push(...this.configurations);
    this.configurations = onTheFly;
    this.resetData();
  }

  resetData() {
    this.configuration = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newConfiguration = false;
    this.configuration = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Configuration): Configuration {
    let aConfiguration = new Configuration();
    for (let prop in e) {
      aConfiguration[prop] = e[prop];
    }
    return aConfiguration;
  }

  findSelectedIndex(): number {
    return this.configurations.indexOf(this.selectedConfiguration);
  }

}
