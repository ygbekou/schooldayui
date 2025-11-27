import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {GrhMain} from '../components/grh/grhMain';
import {GrhPayParameterMenu} from '../components/grh/grhPayParameterMenu';
import {GrhPersonnelMenu} from '../components/grh/grhPersonnelMenu';
import {GrhAjoutPersonnel} from '../components/grh/grhAjoutPersonnel';
import {GrhPayDetail} from '../components/grh/grhPayDetail';
import { GrhEmployeeDocumentType } from '../components/grh/grhEmployeeDocumentType';
import { GrhEmployeeDocuments } from '../components/grh/grhEmployeeDocuments';
import { GrhGeneratePayMenu } from '../components/grh/grhGeneratePayMenu';
import { GrhGeneratePay } from '../components/grh/grhGeneratePay';
import { GrhPaiementMode } from '../components/grh/grhPaiementMode';
import { GrhGeneratePaySlip } from '../components/grh/grhGeneratePaySlip';
import { GrhEmployeeBank } from '../components/grh/grhEmployeeBank';
import { GrhContractBank } from '../components/grh/grhContractBank';
import { GrhHourlyCost } from '../components/grh/grhHourlyCost';
import { GrhManageEmployeeTeacher } from '../components/grh/grhManageEmployeeTeacher';
import { GrhPersonnelEnseignantMenu } from '../components/grh/grhPersonnelEnseignantMenu';
import { GrhParameterType } from '../components/grh/grhParameterType';
import { GrhGenerateEmployeesReportsMenu } from '../components/grh/grhGenerateEmployeesReportsMenu';
import { GrhGenerateReportHonorairesOneTeacher } from '../components/grh/grhGenerateReportHonorairesOneTeacher';
import { GrhGenerateReportHonoraireTeacherTypes } from '../components/grh/grhGenerateReportHonoraireTeacherTypes';
import { GrhGenerateReportHonoraireRecapitulatifTeacherTypes } from '../components/grh/grhGenerateReportHonoraireRecapitulatifTeacherTypes';
import { GrhGenerateReportHonorairesAllTeachers } from '../components/grh/grhGenerateReportHonorairesAllTeachers';
import { GrhGenerateReportHonorairesRecapitulatifAllTeachers } from '../components/grh/grhGenerateReportHonorairesRecapitulatifAllTeachers';
import { GrhGenerateReportEmployeePaySlip } from '../components/grh/grhGenerateReportEmployeePaySlip';
import { GrhGenerateReportAllEmployeesPaySlips } from '../components/grh/grhGenerateReportAllEmployeesPaySlips';
import { GrhGenerateReportGlobalVirSalaireParBanque } from '../components/grh/grhGenerateReportGlobalVirSalaireParBanque';
import { GrhGenerateReportRecapitulatifVirSalaireParBanque } from '../components/grh/grhGenerateReportRecapitulatifVirSalaireParBanque';
import { GrhGenerateReportRecapitulatifVirSalaireEmployes } from '../components/grh/grhGenerateReportRecapitulatifVirSalaireEmployes';
import { GrhManagePersonnelKioskCard } from '../components/grh/grhManagePersonnelKioskCard';
import { GrhMenu } from '../components/menu/grhMenu';
import {GrhTransferLetterMenu} from '../components/grh/grhTransferLetterMenu';
import {GrhEmployeeAnotherDocumentType} from 'app/components/grh/grhEmployeeAnotherDocumentType';
import {GrhEmployeeAnotherDocuments} from 'app/components/grh/grhEmployeeAnotherDocuments';
import { EmployeeDropdown } from 'app/components/dropdowns/grh/dropdown.employee';
import {AdminGetConge} from 'app/components/grh/adminGetConge';
import {AdminCongeHistory} from 'app/components/grh/adminCongeHistory';
import {AdminGenerateAllEmployeeCongeStatus} from 'app/components/grh/adminGenerateAllEmployeeCongeStatus';
import { GrhSurveillantManagementMenu } from 'app/components/grh/grhSurveillantManagementMenu';
import { GrhSurveillantPayManagement } from 'app/components/grh/grhSurveillantPayManagement';
import { GrhGenerateReportHonoraireDetailleAllTeachersComponent } from 'app/components/grh-generate-report-honoraire-detaille-all-teachers.component';
import { GrhManageEtatPayeComponent } from 'app/components/grh/grh-manage-etat-paye.component';
import { GrhGenerateEtatPayeEnsExterneComponent } from 'app/components/grh/grh-generate-etat-paye-ens-externe.component';
import { GrhGenerateEtatPayeEnsInterneComponent } from 'app/components/grh/grh-generate-etat-paye-ens-interne.component';
import { GrhPersonnelParameterMenu } from 'app/components/grh/grhPersonnelParameter';

const routes: Routes = [
  {path: 'grhMain', component: GrhMain},
  {path: 'grhPayParameter', component: GrhPayParameterMenu},
  {path: 'grhTransferLetter', component: GrhTransferLetterMenu},
  {path: 'grhPersonnelMenu', component: GrhPersonnelMenu},
  {path: 'grhAjoutPersonnel', component: GrhAjoutPersonnel},
  {path: 'grhPayManagement', component: GrhGeneratePayMenu},
  {path: 'grhPersonnelEnseignantMenu', component: GrhPersonnelEnseignantMenu},
  {path: 'grhGenerateEmployeesReportsMenu', component: GrhGenerateEmployeesReportsMenu},
  {path: 'grhSurveillantManagementMenu', component: GrhSurveillantManagementMenu},
  {path: 'grhPersonnelParameter', component: GrhPersonnelParameterMenu}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule
  ],

  exports: [],

  declarations: [GrhMenu, GrhMain, GrhPayParameterMenu, GrhPersonnelMenu,
                 GrhAjoutPersonnel, GrhPayDetail, GrhEmployeeDocumentType,
                 GrhEmployeeDocuments, GrhGeneratePayMenu, GrhGeneratePay,
                 GrhPaiementMode, GrhGeneratePaySlip, GrhEmployeeBank,
                 GrhContractBank, GrhHourlyCost, GrhManageEmployeeTeacher,
                 GrhPersonnelEnseignantMenu, GrhParameterType,
                 GrhGenerateEmployeesReportsMenu, GrhGenerateReportHonorairesOneTeacher,
                 GrhGenerateReportHonoraireTeacherTypes, GrhGenerateReportHonorairesAllTeachers,
                 GrhGenerateReportEmployeePaySlip, GrhGenerateReportAllEmployeesPaySlips,
                 GrhGenerateReportGlobalVirSalaireParBanque, GrhGenerateReportRecapitulatifVirSalaireParBanque,
                 GrhGenerateReportRecapitulatifVirSalaireEmployes,
                 GrhGenerateReportHonoraireRecapitulatifTeacherTypes,
                 GrhGenerateReportHonorairesRecapitulatifAllTeachers,
                 GrhManagePersonnelKioskCard, GrhTransferLetterMenu,
                 GrhEmployeeAnotherDocumentType, GrhEmployeeAnotherDocuments, AdminGetConge, AdminCongeHistory, AdminGenerateAllEmployeeCongeStatus,
                 GrhEmployeeAnotherDocumentType, GrhEmployeeAnotherDocuments,
                 GrhSurveillantManagementMenu, GrhSurveillantPayManagement,GrhGenerateReportHonoraireDetailleAllTeachersComponent,
                 GrhManageEtatPayeComponent, GrhGenerateEtatPayeEnsExterneComponent,
                 GrhGenerateEtatPayeEnsInterneComponent,
                 GrhPersonnelParameterMenu
             ],

  providers: [EmployeeDropdown]
})

export class GrhModule {}
