import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  Input,
} from "@angular/core";
import { RegistrationRequest } from "../models/registrationRequest";
import { RegistrationRequestService } from "../services/registrationRequest.service";
import { Constants } from "../app.constants";
import { ConfirmationService, MessageService } from "primeng/primeng";
import { SchoolYearDropdown } from "./dropdowns/dropdown.schoolYear";
import { User } from "app/models/User";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { UserRegistrationRequest } from "app/models/userRegistrationRequest";
import { UserService } from "app/services";
import { CollegeDropdown } from "./dropdowns/dropdown.college";
import { College } from "app/models/college";

@Component({
  selector: "app-registrationRequest-data",
  templateUrl: "../pages/registrationRequestData.html",
  providers: [
    RegistrationRequestService,
    MessageService,
    ConfirmationService,
    SchoolYearDropdown,
    CollegeDropdown,
  ],
})
export class RegistrationRequestData implements OnInit, OnDestroy {
  public registrationRequestList: RegistrationRequest[];
  public error: String = "";
  public errorUrr: String = "";
  public selectedRegistrationRequest: RegistrationRequest;
  displayDialog: boolean = false;
  displayAddUserDialog: boolean = false;
  displayCollegeDialog: boolean = false;
  registrationRequest: RegistrationRequest = new RegistrationRequest();
  newRegistrationRequest: boolean;
  zIndexDialog: number = 1000;
  zIndexCollegeDialog: number = 1050;
  zIndexConfirmDialog: number = 1100;
  public schoolYearDropdown: SchoolYearDropdown;
  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  userRegistrationRequest: UserRegistrationRequest =
    new UserRegistrationRequest();
  urr: UserRegistrationRequest = new UserRegistrationRequest();
  userRegistrationRequestList: UserRegistrationRequest[] = [];
  expandedRow: any = null;

  cols: any[];
  colsU: any[];

  public users: User[];
  public selectedUser: User;
  public user: User;
  public loggedInUser: User;

  public searchText: string;
  @Input() role: string;
  aRole: string;
  collegeDropdown: CollegeDropdown;
  theCollege: College;
  etat: number = 0;

  userC: UserRegistrationRequest = new UserRegistrationRequest();

  constructor(
    private registrationRequestService: RegistrationRequestService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    syDropdown: SchoolYearDropdown,
    private userService: UserService,
    private clgDropdown: CollegeDropdown
  ) {
    this.schoolYearDropdown = syDropdown;
    this.collegeDropdown = clgDropdown;
  }
  ngOnInit() {
    this.cols = [
      {
        field: "intitule",
        header: "Intitulé",
        sortable: "true",
        style: { width: "75%" },
      },
      {
        field: "schoolYear.year",
        header: "Année",
        sortable: "true",
        style: { width: "25%" },
      }
    ];

    this.colsU = [
      { field: "lastName", header: "Nom", sortable: "true", filter: "true" },
      {
        field: "firstName",
        header: "Prénom",
        sortable: "true",
        filter: "true",
      },
      { field: "sex", header: "Sexe", sortable: "false", filter: "false" },
      {
        field: "countryResidence.name",
        header: "Pays",
        sortable: "false",
        filter: "false",
      },
      { field: "phone", header: "Téléphone", sortable: "true", filter: "true" },
    ];
  }
  ngOnDestroy() {
    this.registrationRequestList = null;
    this.error = null;
    this.selectedRegistrationRequest = null;
    this.registrationRequest = null;
    this.cols = null;
  }
  public getAll(): void {
    this.registrationRequestList = [];
    this.registrationRequestService.getAll().subscribe(
      (data: RegistrationRequest[]) => (this.registrationRequestList = data),
      (error) => console.log(error),
      () => console.log("Get all RegistrationRequests complete")
    );
  }

  showDialogToAdd() {
    this.newRegistrationRequest = true;
    this.registrationRequest = new RegistrationRequest();
    this.displayDialog = true;
  }

  showDialogToAddUser() {
    this.users = [];
    this.searchText = "";
    this.displayAddUserDialog = true;
  }
  showCollegeDialog(u: User) {
    this.urr.user = u;
    this.urr.etat = 1;
    this.urr.college = new College();
    this.urr.registrationRequest = this.registrationRequest;
    this.displayCollegeDialog = true;
  }
  close() {
    this.displayAddUserDialog = false;
  }

  save() {
    try {
      this.error = "";
      // console.log(this.registrationRequest);
      this.registrationRequestService
        .save(this.registrationRequest)
        .subscribe((result) => {
          if (result.id > 0) {
            this.registrationRequest = result;
            this.putInTable();
          } else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  delete() {
    try {
      this.error = "";
      this.registrationRequestService
        .delete(this.registrationRequest)
        .subscribe((result) => {
          if (result) {
            this.removeFromTable();
          } else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  confirmpopop() {
    this.messageService.add({
      severity: "info",
      summary: "supprimé",
      detail: "élément supprimé avec succès",
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer cet enregistrement ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.delete();
      },
      reject: () => {},
    });
  }

  putInTable() {
    if (this.newRegistrationRequest)
      this.registrationRequestList.push(this.registrationRequest);
    else
      this.registrationRequestList[this.findSelectedIndex()] =
        this.registrationRequest;
    var onTheFly: RegistrationRequest[] = [];
    onTheFly.push(...this.registrationRequestList);
    this.registrationRequestList = onTheFly;
    this.resetData();
  }

  removeFromTable() {
    this.registrationRequestList.splice(this.findSelectedIndex(), 1);
    var onTheFly: RegistrationRequest[] = [];
    onTheFly.push(...this.registrationRequestList);
    this.registrationRequestList = onTheFly;
    this.resetData();
  }

  resetData() {
    this.registrationRequest = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newRegistrationRequest = false;
    this.error = "";
    this.registrationRequest = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: RegistrationRequest): RegistrationRequest {
    let aRegistrationRequest = new RegistrationRequest();
    for (let prop in e) {
      aRegistrationRequest[prop] = e[prop];
    }
    return aRegistrationRequest;
  }

  findSelectedIndex(): number {
    return this.registrationRequestList.indexOf(
      this.selectedRegistrationRequest
    );
  }

  public getURRByRegistrationRequest(evt) {
    this.registrationRequest = evt.data;

    try {
      this.error = "";
      this.registrationRequestService
        .getURRByRegistrationRequest(this.registrationRequest)
        .subscribe((result) => {
          if (result.length >= 0) {
            this.userRegistrationRequestList = result;
          } else {
            this.error = "erreur";
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  onRowExpand(event: any) {
    this.expandedRow = event.data;
    this.getURRByRegistrationRequest(event);
  }

  onRowCollapse(event: any) {
    if (this.expandedRow === event.data) {
      this.expandedRow = null;
    }
  }

  resolveFieldData(data: any, field: string): any {
    if (!data || !field) return null;
    if (field.indexOf(".") === -1) {
      return data[field];
    } else {
      return field
        .split(".")
        .reduce((value, key) => (value ? value[key] : null), data);
    }
  }

  deleteURR(userRegistrationRequest: UserRegistrationRequest) {
    try {
      this.error = "";
      this.registrationRequestService
        .deleteURR(userRegistrationRequest)
        .subscribe((result) => {
          if (result) {
            // console.log("supprimer avec succes");
            this.userRegistrationRequestList =
              this.userRegistrationRequestList.filter(
                (urr) => urr.id !== userRegistrationRequest.id
              );
          } else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  public search() {
    this.error = null;
    if (this.searchText != null) {
      if (this.aRole != null) {
        this.userService.search(this.aRole + "|" + this.searchText).subscribe(
          (data: User[]) => {
            this.users = data;

            if (this.users == null || this.users.length <= 0) {
              this.error = Constants.NO_USER_FOUND;
            }
          },
          (error) => console.log(error),
          () => console.log("Find users with name like " + this.searchText)
        );
      } else {
        this.userService.search(this.searchText).subscribe(
          (data: User[]) => {
            this.users = data;
            if (this.users == null || this.users.length <= 0) {
              this.error = Constants.NO_USER_FOUND;
            }
          },
          (error) => console.log(error),
          () => console.log("Find users with name like " + this.searchText)
        );
      }
    }
  }

  public searchUsers() {
    this.error = null;
    if (this.searchText != null) {
      this.userService.searchUsers(this.searchText).subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => console.log(error),
        () => console.log("Find users with name like " + this.searchText)
      );
    }
  }

 
  saveURR() {
    // console.log(this.urr,"**");
    try {
      this.registrationRequestService.saveURR(this.urr).subscribe({
        next: (result) => {
          if (result && result.id > 0) {
            const existingIndex = this.userRegistrationRequestList.findIndex(
              (item) => item.id === result.id
            );

            if (existingIndex >= 0) {
              this.userRegistrationRequestList[existingIndex] = result;
              this.userRegistrationRequestList = [
                ...this.userRegistrationRequestList,
              ];
            } else {
              this.userRegistrationRequestList = [
                ...this.userRegistrationRequestList,
                result,
              ];
              this.users = this.users.filter(
                (user) => user.id !== result.user.id
              );
            }
            this.displayCollegeDialog = false;
            this.changeDetectorRef.detectChanges();
          } else {
            this.handleError(
              "Erreur : Ce candidat a déjà été ajouté à cette inscription !"
            );
          }
          this.urr = new UserRegistrationRequest();
          this.urr.college = new College();
        },
        error: (err) => this.handleError("Erreur : " + err.message),
      });
    } catch (e) {
      console.error(e);
      this.handleError("Erreur inattendue");
    }
  }

  private handleError(message: string) {
    this.afficherErreur(message);
    this.displayAddUserDialog = true;
    this.displayCollegeDialog = false;
  }

  afficherErreur(message: string) {
    this.errorUrr = message;

    setTimeout(() => {
      this.errorUrr = null;
    }, 2000);
  }

  saveCandidat(clg: College) {
    this.urr.college = clg;
    this.saveURR();
  }

  onChange(etat: number) {
    this.urr.etat = etat;
  }
  onUrrRowSelect(evt) {
    this.urr = evt.data;
    this.displayCollegeDialog = true;
  }

  refresh() {
    this.theCollege = null;
    this.etat = 0;
    this.searchUserRegistrationRequest();
  }

  searchUserRegistrationRequest() {
    this.userC.college = this.theCollege;
    this.userC.etat = this.etat;
    this.userC.registrationRequest = this.registrationRequest;

    this.registrationRequestService
      .searchUserRegistrationRequest(this.userC)
      .subscribe(
        (data: UserRegistrationRequest[]) => {
          this.userRegistrationRequestList = data;
          // console.log(this.userRegistrationRequestList,"--------");
        },
        (error) => console.log(error),
        () => console.log("Get all candidat complete")
      );
  }

  confirmUrrDelete(userRegistrationRequest: UserRegistrationRequest) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer ce candidat ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteURR(userRegistrationRequest);
      },
      reject: () => {},
    });
  }
}
