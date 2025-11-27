import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from "@angular/core";
import { Report } from "../models/report";
import { ReportCategory } from "../models/reportCategory";
import { ReportView } from "../models/reportView";
import { ReportService } from "../services/report.service";
import { Constants } from "../app.constants";
import { Parameter } from "../models/parameter";
import { FileUploader } from "./fileUploader";
import { Cookie } from "ng2-cookies/ng2-cookies";
import {
  DataTableModule,
  DialogModule,
  InputTextareaModule,
  CheckboxModule,
  TreeNode,
} from "primeng/primeng";
import { User } from "../models/User";
import { ReportDropdown } from "./dropdowns/dropdown.report";

@Component({
  selector: "app-run-report",
  templateUrl: "../pages/runReport.html",
  providers: [ReportService, ReportDropdown],
  styleUrls: ["../css/runReport.css"],
})
export class RunReport implements OnInit, OnDestroy {
  public reports: Report[];
  public reportCategories: TreeNode[];
  public parameters: Parameter[];
  public parameterNames: string[];
  public report: Report = new Report();
  public reportView: ReportView = new ReportView();
  public message: string = "";
  public reportDropdown: ReportDropdown;
  public reportName: string;
  public selectedReport: TreeNode;
  public printLabel: string = Constants.GENERER_ETAT;
  public running: boolean = false;

  constructor(
    private reportService: ReportService,
    private rptDropdown: ReportDropdown,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.reportDropdown = rptDropdown;
  }
  ngOnInit() {
    this.reportCategories = [];
    this.reportService.getActiveReportsWithCategory().subscribe(
      (data: TreeNode[]) => {
        this.reportCategories = data;
      },
      (error) => console.log(error),
      () => console.log("Get all categories complete")
    );
  }

  ngOnDestroy() {}

  runReport() {
    this.reportView.reportId = this.selectedReport.data;
    this.reportView.parameters = this.parameters;
    this.running = true;
    this.message = "";
    this.reportName = "";

    this.reportService.runReport(this.reportView).subscribe(
      (result) => {
        this.running = false;

        if (result.success) {
          this.reportName = result.reportName;
        } else {
          this.afficherMessage(result.message);
        }
      },
      (error) => {
        this.running = false;
        this.afficherMessage(
          "Erreur technique lors de la génération du rapport."
        );
      }
    );
  }

  loadParameters(event: any) {
    this.report.id = this.selectedReport.data;
    this.reportName = null;
    this.reportService.getParameterNamesByReport(this.report).subscribe(
      (data: Parameter[]) => {
        this.parameters = data;
      },
      (error) => console.log(error),
      () => console.log("Get parameters complete")
    );
  }

  selectReport(report: TreeNode) {
    this.selectedReport = report;
    this.loadParameters({ node: report });
  }

  afficherMessage(message: string) {
    this.message = message;

    setTimeout(() => {
      this.message = null;
    }, 7000);
  }
}
