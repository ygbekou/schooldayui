import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {CourseView} from '../models/courseView';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule, Message} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {TimeTableView} from '../models/timeTableView';
import {CourseService} from '../services/course.service';
import {TimeTableService} from '../services/timeTable.service';
import {Course} from '../models/course';
import {Term} from '../models/term';
import {SchoolYear} from '../models/schoolYear';
import {Payment} from '../models/payment';
import {BaseService} from '../services/base.service';
import {SubjectService} from '../services/subject.service';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermDropdown} from './dropdowns/dropdown.term';
import {SubjectInvoiceView} from "../models/SubjectInvoiceView";
import {Subject} from "../models/subject";
import {UserService} from "../services";
import {UserSubject} from "../models/userSubject";
import {StudentProjectCategory} from "../models/studentProjectCategory";
import {InvoiceView} from "../models/invoiceView";
import {InformationChannelDropdown} from "./dropdowns/dropdown.informationChannel";
import { InformationChannel } from 'app/models/informationChannel';
import { UserLevelView } from 'app/models/userLevelView';
import {UserOnlineRegistrationView} from 'app/models/userOlineRegistrationView';
import {UserSubjectView} from 'app/models/userSubjectView';

@Component({
    selector: 'app-admin-usubject',
    templateUrl: '../pages/adminUserSubject.html',
    providers: [SubjectService, CourseService, TimeTableService, BaseService, UserService,
        SchoolYearDropdown, TermDropdown, InformationChannelDropdown]
})
export class AdminUserSubject implements OnInit, OnDestroy {
    public courses: Course[];
    public registeredCourses: CourseView[];
    public subjects: Subject[];
    public subjectsInvoiceView: SubjectInvoiceView[];
    public userLevelViews: UserLevelView[];
    cols: any[];
    colregs: any[];
    colso: any[];
    public searchText: string;
    displayDialog = false;
    public user: User;
    @Input('user') aUser: User;
    error: string;
    public loggedInUser: User;
    visitDate: Date;
    DETAIL: string = Constants.DETAIL;
    Infinity


    PROFORMA_SEARCH_TEXT = Constants.PROFORMA_SEARCH_TEXT;
    public schoolYearDropdown: SchoolYearDropdown;
    public termDropdown: TermDropdown;
    public informationChannelDropdown: InformationChannelDropdown;
    theTerm: Term;
    theSchoolYear: SchoolYear;
    msgs: Message[] = [];

    userSubject: UserSubject = new UserSubject();
    userLevelView: UserLevelView = new UserLevelView();
    registeredUserSubjects: SubjectInvoiceView[];
    registeredUseronlineregistration: UserLevelView[];
    registeredUserSubject: SubjectInvoiceView = new SubjectInvoiceView();
    registeredUserLeve: UserLevelView = new UserLevelView();

    informationChannel: InformationChannel = new InformationChannel();
    userOnlineRegistrationViews: UserOnlineRegistrationView[];
    userSubjectViews: UserSubjectView[];
    //informationChannelSelected : InformationChannel = new InformationChannel();

    constructor
    (
        private courseService: CourseService,
        private timeTableService: TimeTableService,
        private baseService: BaseService,
        private subjectService: SubjectService,
        private userService: UserService,
        private syDropdown: SchoolYearDropdown,
        private tmDropdown: TermDropdown,
        private iChannelDropdown: InformationChannelDropdown,
    ) {

        this.schoolYearDropdown = syDropdown;
        this.termDropdown = tmDropdown;
        this.informationChannelDropdown = iChannelDropdown;
    }

    ngOnInit() {
        this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
        if (this.loggedInUser != null && this.loggedInUser.role == 3) {
            this.user = this.loggedInUser;
            //this.getCourses(this.user);
        }
        this.cols = [
            // {
            //     field: 'code',
            //     header: Constants.CODE,
            //     filter: 'true',
            //     style: {'width': '10%', 'overflow': 'visible'}
            // },
            {
                field: 'levelName',
                header: 'Fili�re/cours',
                sortable: 'false',
                filter: 'true',
                style: {'width': '40%', 'overflow': 'visible'}
            },
             {
                field: 'visitDate',
                header: 'Date visite',
                type: 'Date',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '16%', 'overflow': 'visible' }
            }
        ];


        this.colregs = [
            // {
            //     field: 'code',
            //     header: Constants.CODE,
            //     sortable: 'false',
            //     filter: 'true',
            //     style: {'width': '10%', 'overflow': 'visible'}
            // },
            {
                field: 'levelName',
                header:'Fili�re/cours',
                sortable: 'false',
                filter: 'true',
                style: {'width': '39%', 'overflow': 'visible'}
            },
            {
                field: 'visitDate',
                header: 'Date visite',
                sortable: 'false',
                filter: 'true',
                type: 'Date',
                style: {'width': '16%', 'overflow': 'visible'}
            },
            {
                field: 'informationChannel',
                header: "Cannal d'informations",
                sortable: 'false',
                filter: 'true',
                style: {'width': '20%', 'overflow': 'visible'}
            }
        ];

         this.colso = [
            {
                field: 'levelName',
                header: 'Fili�re/Cours',
                sortable: 'true',
                filter: 'true',
                style: {'width': '80%', 'overflow': 'visible'}
            },
            {
                field: 'status1',
                header:'Attente',
                sortable: 'false',
                filter: 'true',
                style: {'width': '5%'}
            },
            {
                field: 'status2',
                header:'Approuv�',
                sortable: 'false',
                filter: 'true',
                style: {'width': '5%'}
            },
            {
                field: 'status3',
                header:'Rejet�',
                sortable: 'false',
                filter: 'true',
                style: {'width': '5%'}
            },
              {
                field: 'status4',
                header:'Inscrit',
                sortable: 'false',
                filter: 'true',
                style: {'width': '5%'}
            }
        ];

        //this.getUserSubjects(this.aUser);
    }

    ngOnDestroy() {
        this.courses = null;
    }

    informationChannelSelected(event) {
		console.log(event);
		
		this.informationChannel.id = event.id;
		this.informationChannel.name = event.name;
		this.informationChannel.description = event.string1;
		console.log(this.informationChannel);
        
    }

    // saveUserSubject(data: SubjectInvoiceView) {
    //     console.log(data);
    //     console.log(this.informationChannel);
	// 		this.error = '';
	// 		if (!(this.informationChannel.id > 0))
	// 		{
	// 			this.error = "Choisissez le canal d'information";
	// 		}
	// 		else {
	// 			this.userSubject = new UserSubject();
	// 			this.userSubject.user = this.aUser;
	// 			this.userSubject.subject = data.subject;
    //             this.userSubject.informationChannel = this.informationChannel;
    //             this.userSubject.visitDate = new Date(data.visitDate);
	// 			console.log(this.userSubject);

    //     		try {
	// 				this.userService.saveUserSubject(this.userSubject)
	// 				.subscribe(result => {
	// 					if (result.id > 0) {
	// 						this.userSubject = result;
	// 						console.log(this.userSubject);
	// 						this.registeredUserSubject = new SubjectInvoiceView();
	// 						this.registeredUserSubject.subject = this.userSubject.subject;
	// 						this.registeredUserSubject.code = this.userSubject.subject.code;
	// 						this.registeredUserSubject.name = this.userSubject.subject.name;
    //                         this.registeredUserSubject.informationChannel = this.informationChannel.name;
    //                         this.registeredUserSubject.visitDate = new Date(this.userSubject.visitDate);
	// 						this.putInTable();
							
	// 						this.error = '';
	// 						this.informationChannel.id = 0;
	// 					}
	// 					else {
	// 						this.error = Constants.saveFailed;
	// 						this.displayDialog = true;
	// 					}
	// 				})
	// 				//console.log(this.userSubject);
					
	// 			}
	// 			catch (e) {
	// 				console.log(e);
	// 			}
				
	// 		}
    // }

     public search() {
        //this.getRegisteredInvoiceDetails(this.invoice);
        this.userLevelView = null;
        this.error = '';
        if (this.searchText == null) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: 'Entrez le code ou le nom ou la description'
            });
        } else {
            this.userService.searchUserLeve(this.searchText)
                .subscribe((data: UserLevelView[]) => {
                        if (!data || data.length <= 0) {
                            this.error = Constants.NO_COURSE_FOUND;
                        } else {
                            this.userLevelViews = data;
                            console.log(data);
                        }
                    },
                    error => console.log(error),
                    () => console.log('Get level for ' + this.searchText + ' complete'));
        }
    } 

 
     saveUserLevel(data: UserLevelView) {
        console.log(data);
        console.log(this.informationChannel);
			this.error = '';
			if (!(this.informationChannel.id > 0))
			{
				this.error = "Choisissez le canal d'information";
			}
			else {
                 this.userLevelView = new  UserLevelView();
                this.userLevelView.informationChannelId = this.informationChannel.id;
                this.userLevelView.visitDate = new Date(data.visitDate);
                this.userLevelView.levelName =data.levelName;
                this.userLevelView.onlineregistrationId = data.id;
                this.userLevelView.userId = this.aUser.id;
                this.userLevelView.levelId = data.id;
				console.log(this.userLevelView);

        		try {
					this.userService.saveUserLevelOnlineRegistration(this.userLevelView)
					.subscribe(result => {
							this.registeredUseronlineregistration = result;
							this.error = '';
							this.informationChannel.id = 0;
                    },
                     error => console.log(error),
                     () => console.log('Get registeredUseronlineregistration for ' + this.user + ' complete')
                    );
                    
					//console.log(this.userSubject);
					
				}
				catch (e) {
					console.log(e);
				}
				
			}
    }

     getUserOnlineregistration(user: User) {
        this.userService.getUserOnlineregistration(user.id)
            .subscribe((data: UserLevelView[]) => {
                    this.registeredUseronlineregistration = data;
                    console.log(this.registeredUseronlineregistration);
                },
                error => console.log(error),
                () => console.log('Get registeredUseronlineregistration for ' + this.user + ' complete'));
    }
  putInTable() {
        const onTheFly: UserLevelView[] = [];
        onTheFly.push(this.registeredUserLeve);
        onTheFly.push(...this.registeredUseronlineregistration);
        this.registeredUseronlineregistration = onTheFly;

        console.log(this.registeredUserSubjects);
    }

     deleteUserOnlineregistration(data: UserLevelView) {
         this.registeredUserLeve = data;
        try {
            this.error = '';
            this.userService.deleteUserOlineregistration(this.registeredUserLeve)
                .subscribe(result => {
                    if (result) {
                        this.removeFromTable();
                    }
                    else {
                        this.error = Constants.deleteFailed;
                        // this.displayDialog = true;
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }


    removeFromTable() {
    
        this.registeredUseronlineregistration = this.registeredUseronlineregistration.filter( s => s !== this.registeredUserLeve);
     
    }

    getUserSubjects(user: User) {
        this.user = user;
        this.subjectService.getUserSubjects(this.user)
            .subscribe((data: SubjectInvoiceView[]) => {
                    this.registeredUserSubjects = data;
                    console.log(this.registeredUserSubjects);
                },
                error => console.log(error),
                () => console.log('Get registeredUserSubjects for ' + this.user + ' complete'));
    }

    
 
    deleteUserSubject(data: SubjectInvoiceView) {
        this.registeredUserSubject = data;
        try {
            this.error = '';
            this.subjectService.deleteUserSubject(this.registeredUserSubject.id)
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

 
    findSelectedIndex(): number {
        return this.registeredUserSubjects.indexOf(this.registeredUserSubject);
    }

    public getTimeTables(evt) {
        this.timeTableService.getTimeTables(
            evt.data.id + '')
            .subscribe((data: TimeTableView[]) => {
                    evt.data.timeTables = data
                },
                error => console.log(error),
                () => console.log('Get time tables complete'));

    }

    public getViewTimeTables(evt) {
        this.timeTableService.getTimeTables(
            evt.data.courseId + '')
            .subscribe((data: TimeTableView[]) => {
                    evt.data.timeTables = data
                },
                error => console.log(error),
                () => console.log('Get time tables complete'));

    }

    getCourseViewPreReqs(evt) {
        console.log('getting prerequisits for Subject ID: ' + evt.data.id);
        this.subjectService.getPrerequisits(evt.data.id)
            .subscribe(result => {
                for (let i = 0; i < result.length; i++) {
                    if (i > 0) {
                        evt.data.prereq += ', ' + result[i].reqSubject.code;
                    } else {
                        evt.data.prereq = result[i].reqSubject.code;
                    }
                }
            }),
            error => console.log(error),
            () => console.log('get prerequisits complete');
    }

    getCoursePreReqs(evt) {
        console.log('getting prerequisits for subject ID: ' + evt.data.subject.id);
        this.subjectService.getPrerequisits(evt.data.subject.id)
            .subscribe(result => {
                for (let i = 0; i < result.length; i++) {
                    if (i > 0) {
                        evt.data.prereq += ', ' + result[i].reqSubject.code;
                    } else {
                        evt.data.prereq = result[i].reqSubject.code;
                    }
                }
            }),
            error => console.log(error),
            () => console.log('get prerequisits complete');
    }

   

    signup(course: Course) {
        if (this.theSchoolYear == null || this.theTerm == null) {
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre'});
        } else {
            const reg = course.id + ',' + this.user.id + ',' + this.loggedInUser.id + ',' + this.theSchoolYear.id + ',' + this.theTerm.id;
            //check if the use has already taken the course
            if (this.registeredCourses != null) {
                for (let i = 0; i < this.registeredCourses.length; i++) {
                    if (course.subject.id == this.registeredCourses[i].id) {
                        console.log('COURSE ID == :' + course.id + ' - ' + this.registeredCourses[i].courseStatus);

                        if (course.id !== this.registeredCourses[i].courseId &&
                            (this.registeredCourses[i].courseStatus.endsWith("ABANDON")
                                || this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
                        ) {
                            //do nothing. move forward.
                        } else {
                            //if current course is rattrapage do nothing
                            if (course.sessionType == 1 && (this.registeredCourses[i].courseStatus.endsWith("ABANDON")
                                || this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
                                || this.registeredCourses[i].courseStatus.endsWith("ECHOUE")) {
                                //do nothing
                            } else {
                                console.log('FOUND :' + this.registeredCourses[i].courseStatus);
                                this.msgs.push({
                                    severity: 'danger',
                                    summary: 'Echec',
                                    detail: 'Vous etes deja enregistre a ce cours'
                                });
                                return;
                            }
                        }
                    }
                }
            }
            this.courseService.signup(reg)
                .subscribe((data: CourseView) => {
                        if (data.studentCourseId > 0) {
                            this.msgs.push({severity: 'success', summary: 'Success', detail: data.error});
                            this.courses.splice(this.courses.indexOf(course), 1);
                            if (this.registeredCourses == null) {
                                this.registeredCourses = [];
                            }

                            const onTheFly: CourseView[] = [];
                            onTheFly.push(data);
                            onTheFly.push(...this.registeredCourses);
                            this.registeredCourses = onTheFly;

                            const onTheFly2: Course[] = [];
                            onTheFly2.push(...this.courses);
                            this.courses = onTheFly2;
                        } else {
                            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data.error});
                        }

                    },
                    error => console.log(error),
                    () => console.log('register course ' + reg + ' complete'));
        }
    }

    remove(cv: CourseView) {
        const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
        if (cv.status >= 3) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: ' Vous ne pouvez pas supprimer un cours dont l\'etat est: ' + cv.courseStatus
            });
        } else {
            this.courseService.remove(reg)
                .subscribe((data: string) => {
                        if (data.startsWith('Succes')) {
                            this.registeredCourses.splice(this.registeredCourses.indexOf(cv), 1);
                            const onTheFly: CourseView[] = [];
                            onTheFly.push(...this.registeredCourses);
                            this.registeredCourses = onTheFly;
                            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
                        } else {
                            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
                        }

                    },
                    error => console.log(error),
                    () => console.log('remove course ' + reg + ' complete'));
        }
    }


    abandon(cv: CourseView) {
        const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
        if (cv.status >= 2) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: ' Vous ne pouvez pas abandonner un cours dont l\'etat est: ' + cv.courseStatus
            });
        } else {
            this.courseService.abandon(reg)
                .subscribe((data: string) => {
                        if (data.startsWith('Succes')) {
                            cv.courseStatus = "ABANDON";
                            const onTheFly: CourseView[] = [];
                            onTheFly.push(...this.registeredCourses);
                            this.registeredCourses = onTheFly;
                            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
                        } else {
                            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
                        }

                    },
                    error => console.log(error),
                    () => console.log('remove course ' + reg + ' complete'));
        }
    }

    approve(cv: CourseView) {
        const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
        console.log('approve course. current status = ' + cv.status);
        if (cv.status == 1 || cv.status > 2) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: ' Vous ne pouvez pas approuver un cours dont l\'etat est: ' + cv.courseStatus
            });
        } else {
            this.courseService.approveRegistration(reg)
                .subscribe((data: string) => {
                        if (data.startsWith('Succes')) {
                            cv.courseStatus = "INSCRIT";
                            const onTheFly: CourseView[] = [];
                            onTheFly.push(...this.registeredCourses);
                            this.registeredCourses = onTheFly;
                            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
                        } else {
                            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
                        }

                    },
                    error => console.log(error),
                    () => console.log('remove course ' + reg + ' complete'));
        }
    }

    public getCourseView(course: Course): CourseView {
        const cv: CourseView = new CourseView();
        cv.name = course.subject.name;
        cv.year = course.schoolYear == null ? null : course.schoolYear.year;
        cv.termName = course.term == null ? null : course.term.name;
        cv.prereq = course.prereq;
        cv.credit = course.credit;
        cv.code = course.subject.code;
        return cv;
    }
}
