import {Component, LOCALE_ID, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {College} from '../models/college';
import {CourseView} from '../models/courseView';
import {CollegeService} from '../services/college.service';
import {Constants} from '../app.constants';
import {Prospectus} from './prospectus';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../models/User";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-liste-laureats-bac1',
    templateUrl: '../pages/listeDesLaureatsBAC1.html',
    providers: [{provide: LOCALE_ID, useValue: "fr-FR"}, CollegeService]
})
export class ListeDesLaureatsBAC1 implements OnInit, OnDestroy {

    college: College = new College();
    public colleges: College[];
    public courses: CourseView[];
    collegeId: string;
    public id: string;
    public selectedCourse: CourseView = new CourseView();
    @ViewChild(Prospectus) prospectus: Prospectus;

    user: User;
    loginForm: boolean = false;
    error = '';

    display: boolean = false;

  cols: any[];
  studentsList1: any[];
  studentsList: any[];

    constructor
    (
        private collegeService: CollegeService,
        private changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {

    }

    ngOnDestroy() {
        this.colleges = null;
        this.courses = null;
        this.college = null;
        this.collegeId = null;
        this.id = null;
    }

    ngOnInit() {

        this.user = JSON.parse(atob(Cookie.get('user')));
        this.prospectus.flyer = 'LES_9_PILIERS_DE_NOTRE_SYSTEME_D_ENSEIGNEMENT';

        this.colleges = [];
        this.collegeService.getAll()
            .subscribe((data: College[]) => this.colleges = data,
                error => console.log(error),
                () => console.log('Get all Colleges complete'));

    this.cols = [
      {field: 'rank', header: 'RANG', sortable: 'false', filter: 'false', style: {'width': '5%', 'overflow': 'visible'}},
      {field: 'name', header: 'NOM ET PRENOMS', sortable: 'false', filter: 'false', style: {'width': '35%', 'overflow': 'visible'}},
      //{field: 'openDate', header: Constants.DATE_OUVERTURE, type: 'Date', sortable: 'true', filter: 'false', style: {'width': '15%', 'overflow': 'visible'}},
      {field: 'serie', header: 'SERIE', sortable: 'false', filter: 'false', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'sex', header: 'SEXE', sortable: 'false', filter: 'false', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'etsOrigine', header: "ETS D'ORIGINE", sortable: 'false', filter: 'false', style: {'width': '30%', 'overflow': 'visible'}}

    ];

    this.studentsList1 = [
      {rank: 1, name: "MPETEYE Jacintho Edouardo Mawuli Koffi", serie: "C", sex: "M", etsOrigine: "COLLEGE NDA LOME"},
      {rank: 2, name: "ADENYO Kossi Franck Junor", serie: "D", sex: "M", etsOrigine: "LPL LA REVELATION"},
      {rank: 3, name: "KUADJOVI Ayédéwou Thabel Komlan", serie: "D", sex: "M", etsOrigine: "LYCEE ADAMAVO"},
      {rank: 4, name: "HOUESSOU Pédro", serie: "D", sex: "M", etsOrigine: "LYCEE DE BAGUIDA"},
      {rank: 5, name: "LABOU Komla  Alex", serie: "C4", sex: "M", etsOrigine: "LYCEE SCIENTIFIQUE DE LOME"},
      {rank: 6, name: "KPEKPASSI Laroo Daniel", serie: "C4", sex: "M", etsOrigine: "LYCEE SCIENTIFIQUE DE LOME"},
      {rank: 7, name: "AMEVOR Kokou Edmond", serie: "D", sex: "M", etsOrigine: "LPL CLEMENCE DIVINE"},
      {rank: 8, name: "HOUNSI Madouvi Antoine - Sébastien", serie: "C4", sex: "M", etsOrigine: "COLLEGE PROTESTANT D'AGBALEPEDO"},
      {rank: 9, name: "AGBASSA Kodjo Mawuko", serie: "C4", sex: "M", etsOrigine: "LYCEE MODERNE D'ADIDOGOME"},
      {rank: 10, name: "DAKE Komla Patrice", serie: "C4", sex: "M", etsOrigine: "LYCEE MODERNE D'ADIDOGOME"},
      {rank: 11, name: "TREVE Kodjovi Donald", serie: "D", sex: "M", etsOrigine: "LYCEE AGOE-EST"},
      {rank: 12, name: "MOURI Alaza Omar", serie: "D", sex: "M", etsOrigine: "LPL ROSSIGNOL"},
      {rank: 13, name: "AYANOU Tountoun Abel", serie: "D", sex: "M", etsOrigine: "LYCEE ANFOIN"},
      {rank: 14, name: "ASSAGBA Koffi Patrice", serie: "D", sex: "M", etsOrigine: "LYCEE AFAGNAN"},
      {rank: 15, name: "HOFFER Kodjo Gothlieb", serie: "D", sex: "M", etsOrigine: "LYCEE HAHOTOE"},
      {rank: 16, name: "BOKO Yawogan Fulbert", serie: "D", sex: "M", etsOrigine: "COLLEGE CHRIST ROIDE KOUVE"},
      {rank: 17, name: "KOUDOLO Kodjovi Tibo", serie: "D", sex: "M", etsOrigine: "LYCEE DE DAVIE"},
      {rank: 18, name: "AGBEVIADE Komivi Joachin", serie: "D", sex: "M", etsOrigine: "LYCEE D’ASSAHOUN"},
      {rank: 19, name: "BADJASSILONA Gokudah Bruno", serie: "D", sex: "M", etsOrigine: "COLLEGE NDA ATAKPAME"},
      {rank: 20, name: "IDRISSOU Younoussa", serie: "D", sex: "M", etsOrigine: "LYCEE D'ANIE"},
      {rank: 21, name: "ADOKO Biwèdéwou", serie: "D", sex: "M", etsOrigine: "LYCEE D'ELAVAGNON"},
      {rank: 22, name: "DOH Kossi Elom", serie: "C", sex: "M", etsOrigine: "LYCEE ZOMAYI"},
      {rank: 23, name: "ATCHA Yawovi Dieu-Donné", serie: "D", sex: "M", etsOrigine: "LYCEE DE GOUDEVE"},
      {rank: 24, name: "KOUGNIVON Emmanuel Privat", serie: "D", sex: "M", etsOrigine: "LYCEE DE DANYI-ELEVANYO"},
      {rank: 25, name: "AGBODJAN Huedemuwa Ako Herbert", serie: "D", sex: "M", etsOrigine: "LYCEE D'AGOU"},
      {rank: 26, name: "LOKOATE Kossi Hyacinthe", serie: "D", sex: "M", etsOrigine: "LYCEE DE NOTSE"},
      {rank: 27, name: "KOUTOGLO Fovi", serie: "D", sex: "M", etsOrigine: "LYCEE DE TOHOUN"},
      {rank: 28, name: "HASSANE Abdoul Naser", serie: "D", sex: "M", etsOrigine: "LYCEE DE BADOU"},
      {rank: 29, name: "AWADE Frédéric Solim", serie: "D", sex: "M", etsOrigine: "LYCEE HIHEATRO"},
      {rank: 30, name: "TCHASSIM Samtou Rodrigue", serie: "C", sex: "M", etsOrigine: "LYCCE SCIENTIFIQUE ROBERT MATTLE"},
      {rank: 31, name: "N'KOUBA N' Bawon", serie: "D", sex: "M", etsOrigine: "LYCEE TINDJASSE"},
      {rank: 32, name: "BOKO Essowè", serie: "D", sex: "M", etsOrigine: "CPC SAINT JEAN-PAUL DE TCHAMBA"},
      {rank: 33, name: "PALLI Pyabalo Sylvain", serie: "D", sex: "M", etsOrigine: "LYCEE LA GRACE"}
    ];

    this.studentsList = [
      {rank: 1, name: "KABASSINA Gnimdou Ange", serie: "C4", sex: "F", etsOrigine: "COLLEGE CHAMINADE"},
      {rank: 2, name: "DEDO Kossi Xonam Hervé", serie: "D", sex: "M", etsOrigine: "COLLEGE CHAMINADE"},
      {rank: 3, name: "MAYABA Magnim", serie: "C4", sex: "M", etsOrigine: "LYCEE DE KARA I"},
      {rank: 4, name: "BASSIROU Fadilou", serie: "D", sex: "M", etsOrigine: "LYCEE DE KARA I"},
      {rank: 5, name: "GNON Fridossétou", serie: "C4", sex: "F", etsOrigine: "LYCEE SCIENTIFIQUE DE KARA"},
      {rank: 6, name: "ATCHA-OUBOU Asbate", serie: "C4", sex: "M", etsOrigine: "CME DE TCHITCHAO"},
      {rank: 7, name: "HADJI Eric Charles", serie: "D", sex: "M", etsOrigine: "CME DE TCHITCHAO"},
      {rank: 8, name: "DJOBO Hamdan", serie: "D", sex: "M", etsOrigine: "COLLEGE ADELE"},
      {rank: 9, name: "DOKPOE Kossivi Amorin", serie: "D", sex: "M", etsOrigine: "LYCEE LAMA-KPEDAH"},
      {rank: 10, name: "TOYOU Essodonda Roland", serie: "D", sex: "M", etsOrigine: "COLLEGE SAINT AUGUSTIN"},
      {rank: 11, name: "PIKAH Esso - Sima Alain", serie: "D", sex: "M", etsOrigine: "LPL SAVOIR"},
      {rank: 12, name: "MADITOMA Essodéwa Joseph", serie: "D", sex: "M", etsOrigine: "COLLEGE CHAMINADE"},
      {rank: 13, name: "LOKING Maskè Kibalou", serie: "D", sex: "M", etsOrigine: "LYCEE KARA-DONGOYO"},
      {rank: 14, name: "SIMWAKI Eyana Prince", serie: "D", sex: "M", etsOrigine: "COLLEGE DON BOSCO"},
      {rank: 15, name: "SONGAI Donga", serie: "D", sex: "F", etsOrigine: "CSPL ALL SCHOOL"},
      {rank: 16, name: "MELESSIGUE Nestor", serie: "D", sex: "M", etsOrigine: "LYCEE KARA-SUD"},
      {rank: 17, name: "AGNAZA Atiwè Adèle", serie: "D", sex: "F", etsOrigine: "LYCEE KARA TOMDE"},
      {rank: 18, name: "KULO Hodo - Abalo", serie: "D", sex: "M", etsOrigine: "LYCEE NDANIDAH DE PYA"},
      {rank: 19, name: "ANAKPA Ptèmnam", serie: "D", sex: "F", etsOrigine: "LYCEE DE KOUMEA"},
      {rank: 20, name: "KELELENG Batchabana", serie: "D", sex: "M", etsOrigine: "LYCEE TCHITCHAO"},
      {rank: 21, name: "TCHAGBELE Nazirou", serie: "D", sex: "M", etsOrigine: "LYCEE DE BAFILO"},
      {rank: 22, name: "KODJAO Yao", serie: "D", sex: "M", etsOrigine: "LYCEE DE GUERIN-KOUKA I"},
      {rank: 23, name: "WETE Yao", serie: "C", sex: "M", etsOrigine: "LYCEE DE BASSAR"},
      {rank: 24, name: "AGBANTI Bougonou", serie: "D", sex: "M", etsOrigine: "LYCEE BINAPARBA"},
      {rank: 25, name: "YAOU Aklesso", serie: "D", sex: "M", etsOrigine: "LYCEE DE KETAO"},
      {rank: 26, name: "POUANDJI Poumba", serie: "C", sex: "M", etsOrigine: "LYCEE DE DEFALE"},
      {rank: 27, name: "WONKO Lébédéman", serie: "D", sex: "M", etsOrigine: "LYCEE DE SIOU"},
      {rank: 28, name: "TCHAKOUE N'sinawé", serie: "D", sex: "M", etsOrigine: "LYCEE DE KANTE"},
      {rank: 29, name: "ABDOULAYE  Ridouane", serie: "D", sex: "M", etsOrigine: "LYCEE MANGO"},
      {rank: 30, name: "BOKA Lakoulnan", serie: "D", sex: "M", etsOrigine: "LYCEE BOMBOUAKA"},
      {rank: 31, name: "DJANAME Nunifou", serie: "D", sex: "F", etsOrigine: "LYCEE DE NAKI-EST"},
      {rank: 32, name: "KAMPATIBE Manualla Dorcas", serie: "F", sex: "M", etsOrigine: "CPL YANFOUOM"},
      {rank: 33, name: "GBATI Kodjo Philippe", serie: "D", sex: "M", etsOrigine: "CPC DON BOSCO"},
    ];


    }

    setCurrentCollege(aCollege) {
        this.college = aCollege;
        this.collegeService.getCourses(this.college.id.toString())
            .subscribe(result => {
                this.courses = result;
            });
        this.changeDetectorRef.detectChanges();
    }

    onRowSelect(event) {
        this.error = null;
        this.selectedCourse = event.data;
        this.display = true;
    }

    showDialog() {
        this.display = true;
    }

    findSelectedCourseIndex(): number {
        return this.courses.indexOf(this.selectedCourse);
    }
}
