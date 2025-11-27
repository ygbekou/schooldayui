import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabMenuModule} from 'primeng/tabmenu';



import {
  TabViewModule, EditorModule, SharedModule,
  FileUploadModule, StepsModule, InputTextareaModule, SpinnerModule,
  GrowlModule, ChartModule, PasswordModule, ToggleButtonModule,
  DataListModule, CheckboxModule, InputTextModule, SelectButtonModule,
  CalendarModule, RadioButtonModule, DropdownModule, InputMaskModule,
  AutoCompleteModule, DataTableModule, DialogModule, ListboxModule,
  GalleriaModule, MessagesModule, TreeNode, TreeModule, FieldsetModule,
  DataGridModule, PanelModule, UIChart, PickListModule, ScheduleModule, AccordionModule, ProgressSpinnerModule,
  MessageModule,
  CardModule
} from 'primeng/primeng';

import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],

  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, ToggleButtonModule,MessageModule,
    TabViewModule, EditorModule, SharedModule, FileUploadModule, InputMaskModule, SpinnerModule,
    StepsModule, InputTextareaModule, GrowlModule, ChartModule, SelectButtonModule,
    PasswordModule, DataListModule, CheckboxModule, InputTextModule, ListboxModule,
    CalendarModule, RadioButtonModule, DropdownModule, AutoCompleteModule, ScheduleModule,ProgressSpinnerModule,
    DataTableModule, DialogModule, GalleriaModule, MessagesModule, TreeModule,ToastModule,
    DataGridModule, PanelModule, ScheduleModule, FieldsetModule, AccordionModule, ConfirmDialogModule, MultiSelectModule, TabMenuModule, CardModule
    
  ],

  exports: [
    // angular exports
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule,

    // primeng exports
    TabViewModule, EditorModule, SharedModule, FileUploadModule, ToggleButtonModule, SpinnerModule,
    StepsModule, InputTextareaModule, GrowlModule, ChartModule, SelectButtonModule, ListboxModule,
    PasswordModule, DataListModule, CheckboxModule, InputTextModule, InputMaskModule, ScheduleModule,ProgressSpinnerModule,
    CalendarModule, RadioButtonModule, DropdownModule, AutoCompleteModule, UIChart, PickListModule, FieldsetModule,ToastModule,
    DataTableModule, DialogModule, GalleriaModule, MessagesModule, TreeModule, DataGridModule, PanelModule, ScheduleModule, AccordionModule
    , ConfirmDialogModule, MultiSelectModule, TabMenuModule,MessageModule,  CardModule
  ],
})

export class CommonSharedModule {

}
