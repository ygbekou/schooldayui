import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { Message } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
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
import { InvoiceDetailsService } from '../services/invoiceDetails.service';
import { FeeDropdown } from './dropdowns/dropdown.fee';
import { Expense } from '../models/expense';
import { InvoiceView } from "../models/invoiceView";
import { ProformaService } from "../services/proforma.service";
import { Proforma } from "../models/proforma";
import { Subject } from "../models/subject";
import { SubjectInvoiceView } from "../models/SubjectInvoiceView";

@Component({
    selector: 'app-admin-proforma-details',
    templateUrl: '../pages/adminProformaDetails.html',
    providers: [InvoiceDetailsService, UserService, ProformaService, Constants, SubjectService, TimeTableService,
        BaseService, SchoolYearDropdown, TermDropdown, FeeDropdown]
})

export class AdminProformaDetails implements OnInit {
    public invoiceDetails: InvoiceDetails = new InvoiceDetails();
    public registeredProformasDetails: InvoiceDetails[];
    public invoiceDetailsOrFeesColumnEditable: boolean = true;
    //public invoice: Invoice;
    @Input('proforma') proforma: Proforma;
    @Input('invoiceView') invoiceView: InvoiceView;

    public registeredProformasFees: InvoiceDetails[];
    public proformaFee: InvoiceDetails = new InvoiceDetails();

    @Output() onProformaDetailsSaved = new EventEmitter<InvoiceDetails>();

    public subjects: Subject[];
    public subjectsInvoiceView: SubjectInvoiceView[];
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

    PROFORMA_SEARCH_TEXT = Constants.PROFORMA_SEARCH_TEXT;

    constructor
        (
        private invoiceDetailsService: InvoiceDetailsService,
        private proformaService: ProformaService,
        private subjectService: SubjectService,
        private syDropdown: SchoolYearDropdown,
        private tmDropdown: TermDropdown,
        private fDropdown: FeeDropdown,
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
        this.registeredProformasDetails = [];
        this.registeredProformasFees = [];

        console.log(this.invoiceDetailsOrFeesColumnEditable);

        //console.log(this.invoice);
        //}
        this.cols = [
            {
                field: 'code',
                header: Constants.CODE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'name',
                header: Constants.SUBJECT,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '34%', 'overflow': 'visible' }
            },
            {
                field: 'cost',
                header: Constants.COST,
                type: 'number',
                sortable: 'true',
                filter: 'true',
                editable: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'costEnt',
                header: Constants.COST_ENT,
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
                filter: 'true',
                sortable: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            }
        ];

        this.colregs = [
            {
                field: 'subject.code',
                header: Constants.CODE,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '10%', 'overflow': 'visible' }
            },
            {
                field: 'subject.name',
                header: Constants.SUBJECT,
                sortable: 'false',
                filter: 'true',
                style: { 'width': '34%', 'overflow': 'visible' }
            },
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

    ngOnDestroy() {
        this.courses = null;
        this.subjectsInvoiceView = null;
    }

    public getRegisteredProformaDetails(invoiceView: InvoiceView) {
        this.registeredProformasDetails = [];
        console.log(invoiceView);
        //this.invoice = invoice;
        this.invoiceDetailsService.getRegisteredProformaDetails(invoiceView)
            .subscribe((data: InvoiceDetails[]) => {
                this.registeredProformasDetails = data;
                console.log(this.registeredProformasDetails);
            },
                error => console.log(error),
                () => console.log('Get registered details for ' + invoiceView + ' complete'));
    }

    public getRegisteredProformaFees(invoiceView: InvoiceView) {
        this.registeredProformasFees = [];
        console.log(invoiceView);
        this.invoiceDetailsService.getRegisteredProformaFees(invoiceView)
            .subscribe((data: InvoiceDetails[]) => {
                this.registeredProformasFees = data;
                console.log(this.registeredProformasFees);
            },
                error => console.log(error),
                () => console.log('Get registered fees for ' + invoiceView + ' complete'));
    }

    public invoiceDetailsOrFeeColumnUpdateEditableStatus() {
        if (this.invoiceView.status == 2) {
            this.invoiceDetailsOrFeesColumnEditable = false;
        }
        else {
            this.invoiceDetailsOrFeesColumnEditable = true;
        }
        console.log("Update invoice details and fees column status to : " + this.invoiceDetailsOrFeesColumnEditable);
    }

    public search() {
        //this.getRegisteredInvoiceDetails(this.invoice);
        this.subjectsInvoiceView = null;
        this.error = '';
        if (this.searchText == null) {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le code ou le nom ou la description' });
        } else {
            this.subjectService.searchSubjectInvoice(this.searchText)
                .subscribe((data: SubjectInvoiceView[]) => {
                    if (!data || data.length <= 0) {
                        this.error = Constants.NO_COURSE_FOUND;
                    } else {
                        this.subjectsInvoiceView = data;
                        console.log(data);
                    }
                },
                    error => console.log(error),
                    () => console.log('Get subjects for ' + this.searchText + ' complete'));
        }
    }

    addFee() {
        var onTheFly: InvoiceDetails[] = [];
        let feeProforma = new InvoiceDetails();
        onTheFly.push(...this.registeredProformasFees);
        onTheFly.push(feeProforma);
        this.registeredProformasFees = onTheFly;
        console.log('ProformaFees:' + this.registeredProformasFees);
    }

    columnModify(evt) {
        console.log(evt.data);
        console.log(this.proforma);
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
        console.log(this.proforma);
        this.proformaFee = evt.data;

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

    saveProformaDetails(subjectViewInvoiceTable: SubjectInvoiceView) {
        console.log(subjectViewInvoiceTable);
        //console.log(invoiceDetails);

        //Construction de l'objet invoice détails
        this.invoiceDetails.proformaId = this.invoiceView.proformaId;
        this.invoiceDetails.subject = subjectViewInvoiceTable.subject;
        this.invoiceDetails.description = subjectViewInvoiceTable.subject.name;
        //Si c'est une facture d'une personne (étudiant)
        /*if (this.invoiceView.userId) {
            this.invoiceDetails.unitPrice = subjectViewInvoiceTable.cost;
        }
        //S'il s'agit d'une facture envoyée à une entreprise
        if (this.invoiceView.companyId) {
            this.invoiceDetails.unitPrice = subjectViewInvoiceTable.costEnt;
        }*/
        this.invoiceDetails.discPerc = subjectViewInvoiceTable.discPerc;
        this.invoiceDetails.qty = subjectViewInvoiceTable.qty;
        this.invoiceDetails.totalCost = subjectViewInvoiceTable.totalCost;

        //S'il s'agit d'une facture envoyée à une entreprise
        if (this.invoiceView.companyId) {
            this.invoiceDetails.unitPrice = subjectViewInvoiceTable.costEnt;
            //Au moins renseigner le prix unitaire et la quantité
            if (subjectViewInvoiceTable.costEnt && subjectViewInvoiceTable.qty) {
                this.invoiceDetailsService.saveProformaDetails(this.invoiceDetails)
                    .subscribe((data: InvoiceDetails) => {
                        if (data.proformaId > 0) {
                            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                            this.invoiceDetails = data;

                            this.onProformaDetailsSaved.emit(this.invoiceDetails);
                            console.log(data);
                            console.log(this.invoiceDetails);

                            if (this.registeredProformasDetails == null) {
                                this.registeredProformasDetails = [];
                            }

                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(data);
                            onTheFly.push(...this.registeredProformasDetails);
                            this.registeredProformasDetails = onTheFly;

                        } else {
                            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                        }
                        //initialize
                        this.invoiceDetails=new InvoiceDetails();

                    },
                        error => console.log(error),
                        () => console.log('register proforma details ' + this.invoiceDetails + ' complete'));


                console.log('Proforma entreprise Ok');

                console.log(this.invoiceDetails);
            }
            else {
                this.msgs.push({
                    severity: 'danger',
                    summary: 'Echec',
                    detail: 'Entrez le prix unitaire pour une entreprise et la quantité !'
                });
            }
        }
        //Si c'est une facture d'une personne (étudiant)
        else if (this.invoiceView.userId) {
            this.invoiceDetails.unitPrice = subjectViewInvoiceTable.cost;
            //Au moins renseigner le prix unitaire et la quantité
            if (subjectViewInvoiceTable.cost && subjectViewInvoiceTable.qty) {
                this.invoiceDetailsService.saveProformaDetails(this.invoiceDetails)
                    .subscribe((data: InvoiceDetails) => {
                        if (data.proformaId > 0) {
                            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                            console.log(data);

                            this.invoiceDetails = data;

                            this.onProformaDetailsSaved.emit(this.invoiceDetails);

                            if (this.registeredProformasDetails == null) {
                                this.registeredProformasDetails = [];
                            }

                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(data);
                            onTheFly.push(...this.registeredProformasDetails);
                            this.registeredProformasDetails = onTheFly;

                        } else {
                            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                        }

                    },
                        error => console.log(error),
                        () => console.log('register proforma details ' + this.invoiceDetails + ' complete'));

                console.log('Proforma personne Ok');

                console.log(this.invoiceDetails);
            }
            else {
                this.msgs.push({
                    severity: 'danger',
                    summary: 'Echec',
                    detail: 'Entrez le prix unitaire pour une personne et la quantité !'
                });
            }
        }

    }

    public getProformaById(invoiceView: InvoiceView) {
        this.error = null;
        this.proformaService.getProformaById(invoiceView).subscribe((data: Proforma) => {
            this.proforma = data;
            console.log(data);
        },
            error => console.log(error),
            () => console.log('Find proforma by id ' + invoiceView.proformaId));
    }

    saveFeeProformaDetails(feeProformaTable: InvoiceDetails) {
        console.log(feeProformaTable);

        //Au moins renseigner le prix unitaire et la quantité
        if (feeProformaTable.unitPrice && feeProformaTable.qty) {
            feeProformaTable.proformaId = this.invoiceView.proformaId;
            feeProformaTable.description = feeProformaTable.fee.name;
            this.invoiceDetailsService.saveProformaDetails(feeProformaTable)
                .subscribe((data: InvoiceDetails) => {
                    if (data.proformaId > 0) {
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                        this.proformaFee = data;

                        this.onProformaDetailsSaved.emit(this.proformaFee);
                        console.log(data);
                        console.log(this.proformaFee);

                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                    }

                },
                    error => console.log(error),
                    () => console.log('register proforma fee ' + this.proformaFee + ' complete'));


            console.log('Save proforma Fee Ok');

            console.log(this.proformaFee);
        }
        else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le prix unitaire et la quantité ! '});
        }

    }

    columnInvoiceDetailsModify(evt) {

        //Au moins renseigner le prix unitaire et la quantité
        if (evt.data.unitPrice && evt.data.qty) {
            evt.data.totalCost = evt.data.unitPrice * evt.data.qty *
                (1 - evt.data.discPerc / 100);
        }
    }

    updateProformaDetails(invoiceDetails: InvoiceDetails) {
        console.log(invoiceDetails);

        //Au moins renseigner le prix unitaire et la quantité
        if (invoiceDetails.unitPrice && invoiceDetails.qty) {
            this.invoiceDetailsService.saveProformaDetails(invoiceDetails)
                .subscribe((data: InvoiceDetails) => {
                    if (data.id > 0) {
                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                        this.invoiceDetails = data;

                        this.onProformaDetailsSaved.emit(this.invoiceDetails);
                        console.log(data);
                        //this.courses.splice(this.courses.indexOf(course), 1);

                        const onTheFly: InvoiceDetails[] = [];
                        //onTheFly.push(data);
                        this.registeredProformasDetails[this.findSelectedIndex()] = this.invoiceDetails;
                        onTheFly.push(...this.registeredProformasDetails);
                        this.registeredProformasDetails = onTheFly;

                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Echec' });
                    }

                },
                    error => console.log(error),
                    () => console.log('register proforma details ' + this.invoiceDetails + ' complete'));

            console.log(this.invoiceDetails);
        }
        else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Entrez le prix unitaire et la quantité ! '});
        }

    }

    findSelectedIndex(): number {
        return this.registeredProformasDetails.indexOf(this.invoiceDetails);
    }

    removeProformaDetails(invoiceDetails: InvoiceDetails) {
        console.log(invoiceDetails);
        if (invoiceDetails.proforma.status == 2) {
            this.msgs.push({
                severity: 'danger',
                summary: 'Echec',
                detail: ' Vous ne pouvez pas supprimer le détails d\'une proforma déjà validée par le client'
            });
        } else {
            this.invoiceDetailsService.removeProformaDetails(invoiceDetails)
                .subscribe((data: InvoiceDetails) => {
                    if (!data.error) {
                        console.log(data);

                        if (data.fee) {
                            this.registeredProformasFees.splice(this.registeredProformasFees.indexOf(invoiceDetails), 1);
                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(...this.registeredProformasFees);
                            this.registeredProformasFees = onTheFly;
                        }
                        else {
                            this.registeredProformasDetails.splice(this.registeredProformasDetails.indexOf(invoiceDetails), 1);
                            const onTheFly: InvoiceDetails[] = [];
                            onTheFly.push(...this.registeredProformasDetails);
                            this.registeredProformasDetails = onTheFly;
                        }

                        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Succès '});
                    } else {
                        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Erreur : ' + data.error });
                    }

                },
                    error => console.log(error),
                    () => console.log('remove proforma détails ' + invoiceDetails.id + ' complete'));
        }
    }

}

