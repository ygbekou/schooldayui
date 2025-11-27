import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services";
import { SchoolYearDropdown } from "./dropdowns/dropdown.schoolYear";
import { SchoolYear } from "app/models/schoolYear";
import { CountryStats } from "app/models/statistiques/countryStats";

@Component({
  selector: "app-admin-country-stats",
  templateUrl: "../pages/adminCountryStats.html",
  providers: [UserService, SchoolYearDropdown],
})
export class AdminCountryStats implements OnInit {
  public cols: any[] = [];

  countryStats: CountryStats = new CountryStats();
  schoolYear: SchoolYear = new SchoolYear();

  constructor(
    public schoolYearDropdown: SchoolYearDropdown,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'pays', header: 'Pays', sortable: true, filter: true, style: { width: '10%' } },
      { field: 'totalEtudiants', header: 'T. Etudiants', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'nbreFilles', header: 'Nbre Filles', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'nbreGarcons', header: 'Nbre Garçons', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'pourcentageTotal', header: '% Total', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'pourcentageFilles', header: '% Filles', sortable: true, filter: false, style: { width: '10%' } },
      { field: 'pourcentageGarcons', header: '% Garçons', sortable: true, filter: false, style: { width: '10%' } }
      
    ];
  }

  getCountryStats(): void {
    if (!this.schoolYear.id) return;

    this.userService.getCountryStats(this.schoolYear.id).subscribe({
      next: (data: CountryStats) => {
        this.countryStats = data;
      },
      error: (err) => console.error('Erreur lors du chargement :', err),
      complete: () => console.log('getCountryStats terminé'),
    });
  }

  get(evt: any): void {
    console.log('Row expanded:', evt.data);
  }
}
