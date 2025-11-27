import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { Message } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { InvoiceService } from '../services/invoice.service';
import { UserService } from '../services/user.service';
import { TimeTableService } from '../services/timeTable.service';
import { Course } from '../models/course';
import { Term } from '../models/term';
import { SchoolYear } from '../models/schoolYear';
import { BaseService } from '../services/base.service';
import { SubjectService } from '../services/subject.service';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { TermDropdown } from './dropdowns/dropdown.term';
import { InvoiceDetails } from "../models/invoiceDetails";
import { CourseViewInvoice } from "../models/CourseViewInvoice";
import { Invoice } from "../models/invoice";
import { InvoiceDetailsService } from '../services/invoiceDetails.service';
import { FeeDropdown } from './dropdowns/dropdown.fee';
import { Expense } from '../models/expense';
import { InvoiceView } from "../models/invoiceView";
import { TimeTableView } from '../models/timeTableView';

@Component({
    selector: 'app-admin-invoice-details',
    templateUrl: '../pages/adminInvoiceDetails.html',
    providers: [InvoiceDetailsService, UserService, InvoiceService, Constants, SubjectService, CourseService, TimeTableService,
        BaseService, SchoolYearDropdown, TermDropdown, FeeDropdown]
})

// tslint:disable-next-line:component-class-suffix
export class AdminInvoiceDetails implements OnInit {
    public invoiceDetails: InvoiceDetails = new InvoiceDetails();
    public registeredInvoicesDetails: InvoiceDetails[];
    public invoiceDetailsOrFeesColumnEditable = true;
    //public invoice: Invoice;
    // tslint:disable-next-line:no-input-rename
    @Input('invoice') invoice: Invoice;
    // tslint:disable-next-line:no-input-rename
    @Input('invoiceView') invoiceView: InvoiceView;

    public registeredInvoicesFees: InvoiceDetails[];
    public invoiceFee: InvoiceDetails = new InvoiceDetails();

    @Output() onInvoiceDetailsSaved = new EventEmitter<InvoiceDetails>();

    public courses: Course[];
    public coursesViewInvoice: CourseViewInvoice[];
    public courseViewInvoice: CourseViewInvoice;
    public registeredCourses: CourseView[];
    //public registeredInvoicesDetails: CourseViewInvoice[];
    cols: any[];
    colregs: any[];
    colFee: any[];
    public searchText: string;
    displayDialog = false;
    public user: User;
    //@Input('user') user: User;
    error: string;
    public loggedInUser: User;
    DETAIL: string = Constants.DETAIL;
    SCHOOLYEAR: string = Constants.SCHOOLYEAR;
    Infinity
    TERM: string = Constants.TERM;

    public schoolYearDropdown: SchoolYearDropdown;
    public termDropdown: TermDropdown;
    theTerm: Term;
    theSchoolYear: SchoolYear;
    msgs: Message[] = [];

    expenses: Expense[];
    public feeDropdown: FeeDropdown;

    COURSE_SEARCH_TEXT = Constants.COURSE_SEARCH_TEXT;

    constructor
        (
        private invoiceDetailsService: InvoiceDetailsService,
        private invoiceService: InvoiceService,
        private courseService: CourseService,
        private timeTableService: TimeTableService,

        private subjectService: SubjectService,
        private syDropdown: SchoolYearDropdown,
        private tmDropdown: TermDropdown,
        private fDropdown: FeeDropdown
        ) {

        this.schoolYearDropdown = syDropdown;
        this.termDropdown = tmDropdown;
        this.feeDropdown = fDropdown;
    }

    ngOnInit() {
        console.log("Details ok");
        this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
        //if (this.loggedInUser != null && this.loggedInUser.role == 3) {
        this.user = this.loggedInUser;
        this.registeredInvoicesDetails = [];
        this.registeredInvoicesFees = [];

        //console.log(this.invoiceDetailsOrFeesColumnEditable);

        this.cols = [
            {
                field: 'course.classe.name',
                header: Constants.CLASSE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '15%', 'overflow': 'visible' }
            },
            {
                field: 'course.subject.code',
                header: Constants.CODE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '7%', 'overflow': 'visible' }
            },
            {
                field: 'course.subject.name',
                header: Constants.SUBJECT,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '25%', 'overflow': 'visible' }
            },
            {
                field: 'cost',
                header: Constants.COST,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            },
            {
                field: 'costEnt',
                header: Constants.COST_ENT,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            },
            {
                field: 'qty',
                header: Constants.QUANTITY,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            },
            {
                field: 'discPerc',
                header: Constants.PERC,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            },
            {
                field: 'totalCost',
                header: Constants.INVOICE_TOTAL,
                type: 'number',
                filter: 'true',
                sortable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            }
        ];

        this.colregs = [
            {
                field: 'course.classe.name',
                header: Constants.CLASSE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '15%', 'overflow': 'visible' }
            },
            {
                field: 'course.subject.code',
                header: Constants.CODE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '7%', 'overflow': 'visible' }
            },
            {
                field: 'course.subject.name',
                header: Constants.SUBJECT,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '25%', 'overflow': 'visible' }
            },
            {
                field: 'unitPrice',
                header: Constants.COST,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '7%', 'overflow': 'visible' }
            },
            {
                field: 'qty',
                header: Constants.QUANTITY,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '7%', 'overflow': 'visible' }
            },
            {
                field: 'discPerc',
                header: Constants.PERC,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            },
            {
                field: 'totalCost',
                header: Constants.INVOICE_TOTAL,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                style: { 'width': '8%', 'overflow': 'visible' }
            }
        ];

        this.colFee = [
            {
                field: 'unitPrice',
                header: Constants.COST,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'qty',
                header: Constants.QUANTITY,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'discPerc',
                header: Constants.PERC,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'totalCost',
                header: Constants.INVOICE_TOTAL,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            }
        ];

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this.courses = null;
        this.coursesViewInvoice = null;
    }

    public getRegisteredInvoiceDetails(invoiceView: InvoiceView) {
        this.registeredInvoicesDetails = [];
        console.log(invoiceView);
        //this.invoice = invoice;
        this.invoiceDetailsService.getRegisteredInvoiceDetails(invoiceView)
            .subscribe((data: InvoiceDetails[]) => {
                this.registeredInvoicesDetails = data;
                console.log(this.registeredInvoicesDetails);
            },
                error => console.log(error),
                () => console.log('Get registered details for ' + invoiceView + ' complete'));
    }

    public getRegisteredInvoiceFees(invoiceView: InvoiceView) {
        this.registeredInvoicesFees = [];
        console.log(invoiceView);
        //this.invoice = invoice;
        this.invoiceDetailsService.getRegisteredInvoiceFees(invoiceView)
            .subscribe((data: InvoiceDetails[]) => {
                this.registeredInvoicesFees = data;
                console.log(this.registeredInvoicesFees);
            },
                error => console.log(error),
                () => console.log('Get registered fees for ' + invoiceView + ' complete'));
    }

    public invoiceDetailsOrFeeColumnUpdateEditableStatus() {
        if (this.invoiceView.status === 2) {
            this.invoiceDetailsOrFeesColumnEditable = false;
        }
        else {
            this.invoiceDetailsOrFeesColumnEditable = true;
        }
        console.log("Update invoice details and fees column status to : " + this.invoiceDetailsOrFeesColumnEditable);
    }

    public search() {
        //this.getRegisteredInvoiceDetails(this.invoice);
        this.coursesViewInvoice = null;
        this.error = '';
        if (this.theSchoolYear == null || this.theTerm == null) {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre' });
        } else {
            this.courseService.searchCourseInvoice(this.theSchoolYear.id + '|' + this.theTerm.id + '|' + this.searchText)
                .subscribe((data: CourseViewInvoice[]) => {
                    if (!data || data.length <= 0) {
                        this.error = Constants.NO_COURSE_FOUND;
                    } else {
                        this.coursesViewInvoice = data;
                        console.log(data);
                    }
                },
                    error => console.log(error),
                    () => console.log('Get courses for ' + this.searchText + ' complete'));
        }
    }

    addFee() {
        const onTheFly: InvoiceDetails[] = [];
        const feeInvoice = new InvoiceDetails();
        onTheFly.push(...this.registeredInvoicesFees);
        onTheFly.push(feeInvoice);
        //onTheFly.push(this.invoiceFee);
        this.registeredInvoicesFees = onTheFly;
        console.log('InvoiceFees:' + this.registeredInvoicesFees);
    }

    columnModify(evt) {
        console.log(evt.data);
        console.log(this.invoice);
        this.courseViewInvoice = evt.data;

        //S'il s'agit d'une facture envoyée à une entreprise
        if (this.invoiceView.companyId) {
            //Au moins renseigner le prix unitaire et la quantité
            if (this.courseViewInvoice.costEnt && this.courseViewInvoice.qty) {
                this.courseViewInvoice.totalCost = this.courseViewInvoice.costEnt * this.courseViewInvoice.qty *
                    (1 - this.courseViewInvoice.discPerc / 100);
            }
        }
        //Si c'est une facture d'une personne (étudiant)
        else if (this.invoiceView.userId) {
            //Au moins renseigner le prix unitaire et la quantité
            if (this.courseViewInvoice.cost && this.courseViewInvoice.qty) {
                this.courseViewInvoice.totalCost = this.courseViewInvoice.cost * this.courseViewInvoice.qty *
                    (1 - this.courseViewInvoice.discPerc / 100);
            }
        }
    }

    columnFeeModify(evt) {
        console.log(evt.data);
        console.log(this.invoice);
        this.invoiceFee = evt.data;

        //Au moins renseigner le prix unitaire et la quantit�
        if (evt.data.unitPrice && evt.data.qty) {
            if (!evt.data.discPerc) {
                evt.data.totalCost = evt.data.unitPrice * evt.data.qty;
            }
            else {
                evt.data.totalCost = evt.data.unitPrice * evt.data.qty *
                    (1 - evt.data.discPerc / 100);
            }
        }

    }

    saveInvoiceDetails(courseViewInvoiceTable: CourseViewInvoice) {
        console.log(courseViewInvoiceTable);
        //console.log(invoiceDetails);

        //Construction de l'objet invoice détails
        this.invoiceDetails.invoiceId = this.invoiceView.invoiceId;
        this.invoiceDetails.course = courseViewInvoiceTable.course;
        this.invoiceDetails.description = courseViewInvoiceTable.course.subject.name;
        //Si c'est une facture d'une personne (étudiant)
        if (this.invoiceView.userId) {
            this.invoiceDetails.unitPrice = courseViewInvoiceTable.cost;
        }
        //S'il s'agit d'une facture envoyée à une entreprise
        if (this.invoiceView.companyId) {
            this.invoiceDetails.unitPrice = courseViewInvoiceTable.costEnt;
        }
        this.invoiceDetails.discPerc = courseViewInvoiceTable.discPerc;
        this.invoiceDetails.qty = courseViewInvoiceTable.qty;
        this.invoiceDetails.totalCost = courseViewInvoiceTable.totalCost;

        //S'il s'agit d'une facture envoyée à une entreprise
        if (this.invoiceView.companyId) {
            //Au moins renseigner le prix unitaire et la quantité
            if (courseViewInvoiceTable.costEnt && courseViewInvoiceTable.qty) {
                this.invoiceDetailsService.saveInvoiceDetails(this.invoiceDetails)
                    .subscribe((data: InvoiceDetails) => {
                        if (data.invoiceId > 0) {
                            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succ�s ' });
                            this.invoiceDetails = data;

                            this.onInvoiceDetailsSaved.emit(this.invoiceDetails);
                            console.log(data);
                            console.log(this.invoiceDetails);

                            if (this.registeredInvoicesDetails == null) {
                                this.registeredInvoicesDetails = [];
                            }

                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(data);
                            onTheFly.push(...this.registeredInvoicesDetails);
                            this.registeredInvoicesDetails = onTheFly;

                        } else {
                            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                        }
                        this.invoiceDetails = new InvoiceDetails();
                    },
                        error => console.log(error),
                        () => console.log('register invoice details ' + this.invoiceDetails + ' complete'));


                console.log('Facture entreprise Ok');

                // console.log(this.invoiceDetails);
            }
            else {
                this.msgs.push({
                    severity: 'danger',
                    summary: 'Echec',
                    detail: 'Entrez le prix unitaire pour une entreprise et la quantit� !'
                });
            }
        }
        //Si c'est une facture d'une personne (�tudiant)
        else if (this.invoiceView.userId) {
            //Au moins renseigner le prix unitaire et la quantit�
            if (courseViewInvoiceTable.cost && courseViewInvoiceTable.qty) {
                this.invoiceDetailsService.saveInvoiceDetails(this.invoiceDetails)
                    .subscribe((data: InvoiceDetails) => {
                        if (data.invoiceId) {
                            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succ�s ' });
                            console.log(data);

                            this.invoiceDetails = data;

                            this.onInvoiceDetailsSaved.emit(this.invoiceDetails);

                            if (this.registeredInvoicesDetails == null) {
                                this.registeredInvoicesDetails = [];
                            }

                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(data);
                            onTheFly.push(...this.registeredInvoicesDetails);
                            this.registeredInvoicesDetails = onTheFly;

                        } else {
                            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                        }
                        this.invoiceDetails = new InvoiceDetails();
                    },
                        error => console.log(error),
                        () => console.log('register invoice details ' + this.invoiceDetails + ' complete'));

                console.log('Facture personne Ok');

                //console.log(this.invoiceDetails);
            }
            else {
                this.msgs.push({
                    severity: 'danger',
                    summary: 'Echec',
                    detail: 'Entrez le prix unitaire pour une personne et la quantit� !'
                });
            }
        }

    }

    public getInvoiceById(invoiceView: InvoiceView) {
        this.error = null;
        this.invoiceService.getInvoiceById(invoiceView).subscribe((data: Invoice) => {
            this.invoice = data;
            console.log(data);
        },
            error => console.log(error),
            () => console.log('Find invoice by id ' + invoiceView.invoiceId));
    }

    saveFeeInvoiceDetails(feeInvoiceTable: InvoiceDetails) {
        console.log(feeInvoiceTable);

        //Au moins renseigner le prix unitaire et la quantit�
        if (feeInvoiceTable.unitPrice && feeInvoiceTable.qty) {
            feeInvoiceTable.invoiceId = this.invoiceView.invoiceId;
            feeInvoiceTable.description = feeInvoiceTable.fee.name;
            this.invoiceDetailsService.saveInvoiceDetails(feeInvoiceTable)
                .subscribe((data: InvoiceDetails) => {
                    if (data.invoiceId) {
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succ�s ' });
                        this.invoiceFee = data;

                        this.onInvoiceDetailsSaved.emit(this.invoiceFee);
                        console.log(data);
                        console.log(this.invoiceFee);

                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                    }

                },
                    error => console.log(error),
                    () => console.log('register invoice fee ' + this.invoiceFee + ' complete'));


            console.log('Save invoice Fee Ok');

            console.log(this.invoiceFee);
        }
        else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le prix unitaire et la quantit� ! ' });
        }

    }

    columnInvoiceDetailsModify(evt) {

        //Au moins renseigner le prix unitaire et la quantit�
        if (evt.data.unitPrice && evt.data.qty) {
            evt.data.totalCost = evt.data.unitPrice * evt.data.qty *
                (1 - evt.data.discPerc / 100);
        }
    }

    updateInvoiceDetails(invoiceDetails: InvoiceDetails) {
        console.log(invoiceDetails);

        //Au moins renseigner le prix unitaire et la quantit�
        if (invoiceDetails.unitPrice && invoiceDetails.qty) {
            this.invoiceDetailsService.saveInvoiceDetails(invoiceDetails)
                .subscribe((data: InvoiceDetails) => {
                    if (data.id) {
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succ�s ' });
                        this.invoiceDetails = data;

                        this.onInvoiceDetailsSaved.emit(this.invoiceDetails);
                        console.log(data);
                        //this.courses.splice(this.courses.indexOf(course), 1);

                        const onTheFly: InvoiceDetails[] = [];
                        //onTheFly.push(data);
                        this.registeredInvoicesDetails[this.findSelectedIndex()] = this.invoiceDetails;
                        onTheFly.push(...this.registeredInvoicesDetails);
                        this.registeredInvoicesDetails = onTheFly;

                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                    }

                },
                    error => console.log(error),
                    () => console.log('register invoice details ' + this.invoiceDetails + ' complete'));


            console.log('Facture entreprise Ok');

            console.log(this.invoiceDetails);
        }
        else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le prix unitaire et la quantit� ! ' });
        }

    }

    findSelectedIndex(): number {
        return this.registeredInvoicesDetails.indexOf(this.invoiceDetails);
    }

    removeInvoiceDetails(invoiceDetails: InvoiceDetails) {
        //const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
        console.log(invoiceDetails);
        if (invoiceDetails.invoice.status === 2) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: ' Vous ne pouvez pas supprimer le d�tails d\'une facture d�j� valid�e par le client'
            });
        } else {
            this.invoiceDetailsService.removeInvoiceDetails(invoiceDetails)
                .subscribe((data: InvoiceDetails) => {
                    if (!data.error) {
                        console.log(data);

                        if (data.fee) {
                            this.registeredInvoicesFees.splice(this.registeredInvoicesFees.indexOf(invoiceDetails), 1);
                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(...this.registeredInvoicesFees);
                            this.registeredInvoicesFees = onTheFly;
                        }
                        else {
                            this.registeredInvoicesDetails.splice(this.registeredInvoicesDetails.indexOf(invoiceDetails), 1);
                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(...this.registeredInvoicesDetails);
                            this.registeredInvoicesDetails = onTheFly;
                        }

                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succ�s ' });
                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur : ' + data.error });
                    }

                },
                    error => console.log(error),
                    () => console.log('remove invoice détails ' + invoiceDetails + ' complete'));
        }
    }

    public getViewTimeTables(evt) {
        console.log('getViewTimeTables(evt)');
        console.log('getting getViewTimeTables for curse ID: ' + evt.data.course.id);
        this.timeTableService.getTimeTables(
            evt.data.course.id + '')
            .subscribe((data: TimeTableView[]) => {
                evt.data.timeTables = data
            },
                error => console.log(error),
                () => console.log('Get time tables complete'));
    }

    getCourseViewPreReqs(evt) {
        console.log('getCourseViewPreReqs(evt)');
        console.log('getting prerequisits for course ID: ' + evt.data.course.id);
        this.subjectService.getPrerequisits(evt.data.course.id)
            .subscribe(result => {
                for (let i = 0; i < result.length; i++) {
                    if (i > 0) {
                        evt.data.prereq += ', ' + result[i].reqSubject.code;
                    } else {
                        evt.data.prereq = result[i].reqSubject.code;
                    }
                }
            }),
            // tslint:disable-next-line:no-unused-expression
            error => console.log(error),
            // tslint:disable-next-line:no-unused-expression
            () => console.log('get prerequisits complete');
    }

    public getTimeTables(evt) {
        console.log('getting getTimeTables for Data: ' + evt.data);
        this.timeTableService.getTimeTables(
            evt.data.course.id + '')
            .subscribe((data: TimeTableView[]) => {
                evt.data.timeTables = data
            },
                error => console.log(error),
                () => console.log('Get time tables complete'));

    }

    getCoursePreReqs(evt) {
        console.log('getting prerequisits for subject ID: ' + evt.data.course.subject.id);
        console.log('getting prerequisits for Data: ' + evt.data);
        this.subjectService.getPrerequisits(evt.data.course.subject.id)
            .subscribe(result => {
                for (let i = 0; i < result.length; i++) {
                    if (i > 0) {
                        evt.data.prereq += ', ' + result[i].reqSubject.code;
                    } else {
                        evt.data.prereq = result[i].reqSubject.code;
                    }
                }
            }),
            // tslint:disable-next-line:no-unused-expression
            error => console.log(error),
            // tslint:disable-next-line:no-unused-expression
            () => console.log('get prerequisits complete');
    }
}

