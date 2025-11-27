import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  Input,
} from "@angular/core";
import { Concours } from "../models/concours";
import { ConcoursService } from "../services/concours.service";
import { Constants } from "../app.constants";
import { ConfirmationService, MessageService } from "primeng/primeng";
import { SchoolYearDropdown } from "./dropdowns/dropdown.schoolYear";
import { User } from "app/models/User";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { UserConcours } from "app/models/userConcours";
import { UserService } from "app/services";
import { CollegeDropdown } from "./dropdowns/dropdown.college";
import { College } from "app/models/college";

@Component({
  selector: "app-concours-data",
  templateUrl: "../pages/concoursData.html",
  providers: [
    ConcoursService,
    MessageService,
    ConfirmationService,
    SchoolYearDropdown,
    CollegeDropdown,
  ],
})
export class ConcoursData implements OnInit, OnDestroy {
  public concoursList: Concours[];
  public error: String = "";
  public errorUc: String = "";
  public selectedConcours: Concours;
  displayDialog: boolean = false;
  displayAddUserDialog: boolean = false;
  displayCollegeDialog: boolean = false;
  concours: Concours = new Concours();
  newConcours: boolean;
  zIndexDialog: number = 1000;
  zIndexCollegeDialog: number = 1050;
  zIndexConfirmDialog: number = 1100;
  public schoolYearDropdown: SchoolYearDropdown;
  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  userConcours: UserConcours = new UserConcours();
  uc: UserConcours = new UserConcours();
  userConcoursList: UserConcours[] = [];
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

  userC: UserConcours = new UserConcours();

  constructor(
    private concoursService: ConcoursService,
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
        style: { width: "50%" },
      },
      {
        field: "schoolYear.year",
        header: "Année",
        sortable: "true",
        style: { width: "25%" },
      },
      {
        field: "montant",
        header: "Montant",
        sortable: "true",
        style: { width: "25%" },
      },
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
    this.concoursList = null;
    this.error = null;
    this.selectedConcours = null;
    this.concours = null;
    this.cols = null;
  }
  public getAll(): void {
    this.concoursList = [];
    this.concoursService.getAll().subscribe(
      (data: Concours[]) => (this.concoursList = data),
      (error) => console.log(error),
      () => console.log("Get all Concourss complete")
    );
  }

  showDialogToAdd() {
    this.newConcours = true;
    this.concours = new Concours();
    this.displayDialog = true;
  }

  showDialogToAddUser() {
    this.users = [];
    this.searchText = "";
    this.displayAddUserDialog = true;
  }
  showCollegeDialog(u: User) {
    this.uc.user = u;
    this.uc.etat = 1;
    this.uc.college = new College();
    this.uc.concours = this.concours;
    this.displayCollegeDialog = true;
  }
  close() {
    this.displayAddUserDialog = false;
  }

  save() {
    try {
      this.error = "";
      //   console.log(this.concours);
      this.concoursService.save(this.concours).subscribe((result) => {
        if (result.id > 0) {
          this.concours = result;
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
      this.concoursService.delete(this.concours).subscribe((result) => {
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
      reject: () => { },
    });
  }

  putInTable() {
    if (this.newConcours) this.concoursList.push(this.concours);
    else this.concoursList[this.findSelectedIndex()] = this.concours;
    var onTheFly: Concours[] = [];
    onTheFly.push(...this.concoursList);
    this.concoursList = onTheFly;
    this.resetData();
  }

  removeFromTable() {
    this.concoursList.splice(this.findSelectedIndex(), 1);
    var onTheFly: Concours[] = [];
    onTheFly.push(...this.concoursList);
    this.concoursList = onTheFly;
    this.resetData();
  }

  resetData() {
    this.concours = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newConcours = false;
    this.error = "";
    this.concours = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Concours): Concours {
    let aConcours = new Concours();
    for (let prop in e) {
      aConcours[prop] = e[prop];
    }
    return aConcours;
  }

  findSelectedIndex(): number {
    return this.concoursList.indexOf(this.selectedConcours);
  }

  public getUCByConcours(evt) {
    this.concours = evt.data;

    try {
      this.error = "";
      this.concoursService
        .getUCByConcours(this.concours)
        .subscribe((result) => {
          if (result.length >= 0) {
            this.userConcoursList = result;
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
    this.getUCByConcours(event);
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

  deleteUC(userConcours: UserConcours) {
    try {
      this.error = "";
      this.concoursService.deleteUC(userConcours).subscribe((result) => {
        if (result) {
          // console.log("supprimer avec succes");
          this.userConcoursList = this.userConcoursList.filter(
            (uc) => uc.id !== userConcours.id
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

  //   saveUc() {
  //   console.log(this.uc);
  //   try {
  //     this.concoursService.saveUc(this.uc).subscribe({
  //       next: (result) => {
  //         if (result && result.id > 0) {
  //           this.userConcoursList = [...this.userConcoursList, result];
  //           this.users = this.users.filter(user => user.id !== result.user.id);

  //           this.uc = new UserConcours();
  //           this.displayCollegeDialog = false;
  //           this.changeDetectorRef.detectChanges();
  //         } else {
  //           this.afficherErreur("Erreur : Ce candidat a déjà été ajouté à ce concours !");
  //           this.displayAddUserDialog = true;
  //           this.displayCollegeDialog = false;
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Erreur lors de l\'enregistrement :', err);
  //        this.afficherErreur("Erreur : Ce candidat a déjà été ajouté à ce concours !");
  //         this.displayAddUserDialog = true;
  //         this.displayCollegeDialog = false;
  //       }
  //     });
  //   } catch (e) {
  //     console.error(e);

  //     this.displayAddUserDialog = true;
  //   }
  // }

  saveUc() {
    console.log(this.uc);
    try {
      this.concoursService.saveUc(this.uc).subscribe({
        next: (result) => {
          if (result && result.id > 0) {
            const existingIndex = this.userConcoursList.findIndex(
              (item) => item.id === result.id
            );

            if (existingIndex >= 0) {
              this.userConcoursList[existingIndex] = result;
              this.userConcoursList = [...this.userConcoursList];
            } else {
              this.userConcoursList = [...this.userConcoursList, result];
              this.users = this.users.filter(
                (user) => user.id !== result.user.id
              );
            }
            this.displayCollegeDialog = false;
            this.changeDetectorRef.detectChanges();
          } else {
            this.handleError(
              "Erreur : Ce candidat a déjà été ajouté à ce concours !"
            );
          }
          this.uc = new UserConcours();
          this.uc.college = new College();
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
    this.errorUc = message;

    setTimeout(() => {
      this.errorUc = null;
    }, 2000);
  }

  saveCandidat(clg: College) {
    this.uc.college = clg;
    this.saveUc();
  }

  onChange(etat: number) {
    this.uc.etat = etat;
  }
  onUcRowSelect(evt) {
    this.uc = evt.data;
    this.displayCollegeDialog = true;
  }

  refresh() {
    this.theCollege = null;
    this.etat = 0;
    this.searchUserConcours();
  }

  searchUserConcours() {
    this.userC.college = this.theCollege;
    this.userC.etat = this.etat;
    this.userC.concours = this.concours;

    this.concoursService.searchUserConcours(this.userC).subscribe(
      (data: UserConcours[]) => {
        this.userConcoursList = data;
        // console.log(this.userConcoursList,"--------");
      },
      (error) => console.log(error),
      () => console.log("Get all candidat complete")
    );
  }

  confirmUcDelete(userConcours: UserConcours) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer ce candidat ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteUC(userConcours);
      },
      reject: () => { },
    });
  }
}
