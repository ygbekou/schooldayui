import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services";
import { SchoolYearDropdown } from "./dropdowns/dropdown.schoolYear";
import { ClassDropdown } from "./dropdowns/dropdown.class";
import { CourseView } from "app/models/courseView";
import { FiliereStats } from "app/models/statistiques/filiereStats";
import { FiliereInfos } from "app/models/statistiques/filiereInfos";
import { SchoolYear } from "app/models/schoolYear";

@Component({
  selector: "app-admin-filiere-stats",
  templateUrl: "../pages/adminFiliereStats.html",
  providers: [UserService, SchoolYearDropdown, ClassDropdown],
})
export class AdminFiliereStats implements OnInit {
  public cols: any[] = [];
  filiereInfos: FiliereInfos[] = [];
  coursesNv: CourseView[] = [];

  filiereStats: FiliereStats = new FiliereStats();
  globalFiliereStats: FiliereStats = new FiliereStats();
  schoolYear: SchoolYear = new SchoolYear();

  constructor(
    public schoolYearDropdown: SchoolYearDropdown,
    public clsDropdown: ClassDropdown,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'classe', header: 'Classe', sortable: true, filter: true, style: { width: '10%' } },
      { field: 'totalEtudiants', header: 'T. Etudiants', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'nbreFilles', header: 'Nbre Filles', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'nbreGarcons', header: 'Nbre Garçons', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'pourcentageFilles', header: '% Filles', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'pourcentageGarcons', header: '% Garçons', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'ratioFillesGarcons', header: 'Ratio F/G', sortable: true, filter: false, style: { width: '10%' } },
    ];

    this.getGlobalFilieresStat();
  }

  getFiliereStats(): void {
    if (!this.schoolYear.id) return;

    this.userService.getFiliereStats(this.schoolYear.id).subscribe({
      next: (data: FiliereStats) => {
        this.filiereStats = data;
      },
      error: (err) => console.error('Erreur lors du chargement :', err),
      complete: () => console.log('getFiliereStats terminé'),
    });
  }

  getGlobalFilieresStat(): void {

    this.userService.getGlobalFilieresStat().subscribe({
      next: (data: FiliereStats) => {
        this.globalFiliereStats = data;
      },
      error: (err) => console.error('Erreur lors du chargement :', err),
      complete: () => console.log('getGlobalFilieresStat terminé'),
    });
  }

  get(evt: any): void {
    console.log('Row expanded:', evt.data);
  }
}
