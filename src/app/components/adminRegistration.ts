import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import {CourseService} from '../services/course.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Currency } from '../models/currency';
import { TuitionView } from '../models/tuitionView'
import { ClassDropdown } from './dropdowns/dropdown.class';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { TermDropdown } from './dropdowns/dropdown.term';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { StudentTuitionComment } from 'app/models/studentTuitionComment';
import { PaymentCommitment } from 'app/models/paymentCommitment';
import { Payment } from 'app/models/payment';
import { BankDropdown } from "./dropdowns/dropdown.bank";
import { Bank } from 'app/models/bank';
import { PaymentCommitmentView } from 'app/models/paymentCommitmentView';
import {CourseView} from '../models/courseView';
import { SchoolYear } from 'app/models/schoolYear';
@Component({
  selector: 'app-admin-registration',
  templateUrl: '../pages/adminRegistration.html',
  providers: [StudentService, Constants, ClassDropdown, SchoolYearDropdown, TermDropdown, BankDropdown,CourseService]
})
export class AdminRegistration implements OnInit, OnDestroy {

  public enrollments: Enrollment[];
  public selectedEnrollment: Enrollment;
  public tuitions: TuitionView[];
  public currencies: Currency[];
  public tuition: TuitionView = new TuitionView();
  public selectedView: TuitionView = new TuitionView();
  public enrollment: Enrollment;
  public newEnrollment: boolean;
  public user: User;
  public student: Student;
  public loggedInUser: User;
  public classDropdown: ClassDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  @Input() role: string;
  displayDialog: boolean;
  displayPayment: boolean;
  public error: string;
  public success: string;
  public reportName: string;
  public payAmount: number;
  public convertedAmount: number;
  public currency: Currency = new Currency();
  public mainCurrency: Currency = new Currency();
  public selectedCurrency: string;
  public activeTab = 0;
  public containCommitment: boolean = false;

  public studentTuitionComment: StudentTuitionComment;
  public studentTuitionComments: StudentTuitionComment[];
  public studentTuitionCommentComments: StudentTuitionComment[];
  public studentTuitionCommentDocuments: StudentTuitionComment[];
  addStudentTuitionComment: boolean;

  addStudentTuitionRebate: boolean;


  public studentPaymentCommitment: PaymentCommitment;
  public studentPaymentCommitments: PaymentCommitment[];
  public selectedStudentPaymentCommitment: PaymentCommitment;

  public studentPaymentCommitmentView: PaymentCommitmentView;
  public studentPaymentCommitmentViews: PaymentCommitmentView[];
  public selectedStudentPaymentCommitmentView: PaymentCommitmentView;
  
  confirmDisablePaymentCommitment: boolean = false;
  confirmDisableStudentTuition: boolean = false;
  expandRow: boolean = false;
  displayPaymentCommitment: boolean;
  addPaymentCommitment: boolean;
  colsPaymentCommitment: any[];
  enableButton: boolean;
  errorStudentTuition: string;
  successStudentTuition: string;

  public tuitionViewCommitments: TuitionView[];


  public studentPaymentsAndRebate: Payment[];
  public studentPayments: Payment[];
  colsPayments: any[];
  addPayment: boolean;
  abandon: boolean;
  showAbandon: boolean = false;
  public bankDropdown: BankDropdown;
  bank: Bank;
  eventData: any;



  displayPaymentComment: boolean;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  tuitionView: TuitionView = new TuitionView();

  public termDropdown: TermDropdown;
  cols: any[];
  @Output() onEnrollmentSelected = new EventEmitter<Enrollment>();

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  CLASSE: string = Constants.CLASSE;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  PRINT: string = Constants.PRINT;
  PAYMENTS: string = Constants.PAYMENTS;
  TERM: string = Constants.TERM;
  PAY: string = Constants.PAY;

  tranchePaymentExist : boolean = false;
  courseInscritExist : boolean = false;
  public registeredCourses: CourseView[];

  schoolYear : SchoolYear = new SchoolYear();

  currentUser: User = JSON.parse(atob(Cookie.get("user")));

  constructor
    (private studentService: StudentService,
      private courseService: CourseService,
      clsDropdown: ClassDropdown,
      syDropdown: SchoolYearDropdown,
      tmDropdown: TermDropdown,
      bkDropdown: BankDropdown,
      private changeDetectorRef: ChangeDetectorRef
    ) {
    this.classDropdown = clsDropdown;
    this.schoolYearDropdown = syDropdown;
    this.termDropdown = tmDropdown;
    this.bankDropdown = bkDropdown;
  }

  ngOnDestroy() {
    this.enrollments = null;
    this.selectedEnrollment = null;
    this.user = null;
    this.cols = null;
    this.colsPaymentCommitment = null;
    this.colsPayments = null;
  }

  getAll() { }

  public getTuitions(evt) {
    this.eventData = evt;
    this.abandon = false;
    this.tuitions = [];

    this.enrollment = evt.data;
    if(this.enrollment.student.status == 3){
       this.abandon = true;
    }
    console.log(this.abandon);
    console.log(this.enrollment);
    this.enrollment.enrollmentDate = new Date(this.enrollment.enrollmentDate);
    this.studentService.getTuitions(this.enrollment).subscribe((data: TuitionView[]) => 
    { 
      this.tuitions = data; 
      console.log(this.tuitions);
    },
    error => console.log(error),
    () => console.log('Get tuitions'));
  }

  public showAbandonDialog(){
    this.showAbandon = true;
  }

  public saveAbandonAdjustment(){

  }

  public makePayment(data) {
    this.tuition = data;
    this.payAmount = this.tuition.balance;
    this.convertedAmount = this.payAmount * this.currency.factor;
    this.displayPayment = true;

    //this.displayPaymentComment = false;
    this.displayPaymentCommitment = false;
  }

  public convertCurrency(event) {
    //console.log(event);
    this.error = "";
    for (let i = 0; i < this.currencies.length; i++) {
      let curr = this.currencies[i];
      if (curr.code == event.value) {
        this.currency = curr;
        break;
      }
    }
    if (!this.currency.supportOnlinePay) {
      this.error = Constants.ONLINE_PAY_NOT_SUPPORTED;
    }
    //console.log(this.currency.code + ", " + this.currency.factor);
    this.convertedAmount = this.payAmount * this.currency.factor;
  }
  public submitPayment() {
    this.error = "";
    if (!this.currency.supportOnlinePay) {
      this.error = Constants.ONLINE_PAY_NOT_SUPPORTED;
    } else {
      const parm: string = (this.payAmount / this.currency.factor) + "|" + this.currency.code + "|" + this.tuition.studentTuitionId + "|" + this.payAmount;
      this.studentService.createPayment(parm).subscribe((data: string) => {
        window.location.href = data;
        //console.log(data);
      }, error => {
        console.log(error);
        console.log('createPayment failed');
      },
        () => {

          console.log('createPayment successful');

        }

      );
    }
  }

  public removeTuition(theData) {
    this.error = '';
    //console.log(theData);
    const tuitionView: TuitionView = theData;
    tuitionView.modBy = this.loggedInUser.id;
    tuitionView.enrollmentId = this.enrollment.id;
    tuitionView.studentId = this.enrollment.student.id;
    this.studentService.removeTuition(tuitionView).subscribe((data: TuitionView) => {
     if(data.studentId == null){
      tuitionView.studentId = null;
      tuitionView.studentTuitionId = null;
      this.tuitions[this.tuitions.indexOf(theData)] = data;
     }else{
      this.error = 'Impossible de supprimer il y a des paiements sur la tranche' 
     }
      
    },
      () => console.log(this.error));
  }
  public addTuition(theData) {
    const tuitionView: TuitionView = theData;
    tuitionView.modBy = this.loggedInUser.id;
    tuitionView.enrollmentId = this.enrollment.id;
    //console.log("classse "+  tuitionView.enrollmentId);
    tuitionView.studentId = this.enrollment.student.id;
    this.studentService.addTuition(tuitionView).subscribe((data: TuitionView) => {
      this.tuitions[this.tuitions.indexOf(theData)] = data;
      //console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Tuition'));

  }

  public getTuitionList(evt) {
    this.enrollment = evt.data;
    this.enrollment.enrollmentDate = new Date(this.enrollment.enrollmentDate);
    this.studentService.getTuitionList(this.enrollment).subscribe((data: TuitionView[]) => { 
      this.tuitions = data; 
      for(let tt in this.tuitions){
        if(this.tuitions[tt].studentTuitionId != null){
          this.tranchePaymentExist = true;
          break;
        }else{
          this.tranchePaymentExist = false;
        }
      }
    },
      error => console.log(error),
      () => {
        console.log('Get tuitions');
      } 
    );
  }

  getCourses(user: User) {
    this.user = user;
    this.registeredCourses = [];
    this.courseService.getUserCoursesBySchoolYear(this.user,this.enrollment.schoolYear.id)
      .subscribe((data: CourseView[]) => {
        this.registeredCourses = data; 
        console.log(this.registeredCourses.length,"======")
        if(this.registeredCourses.length  > 0){
          this.courseInscritExist = true
        }else{
          this.courseInscritExist = false ;
        }
      },
      error => console.log(error));
  }

  public printRecap() {
    this.studentService.printRecap(this.enrollment).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get printRecap'));
  }


  public getEnrollments(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.user = aUser;

      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
          if (this.student != null) {
            this.studentService.getEnrollments(this.student)
              .subscribe(result => {
                this.enrollments = result;
                //console.log(this.enrollments);
              });
          }
        });

    }
  }

  public saveTuition(event) {
    let tuitionView: TuitionView = event.data;
    tuitionView.modBy = this.loggedInUser.id;
    tuitionView.enrollmentId = this.enrollment.id;

    this.studentService.saveTuition(event.data).subscribe((data: TuitionView) => {
      tuitionView = data;
      this.tuitions[this.tuitions.indexOf(event.data)] = tuitionView;
      var onTheFly: TuitionView[] = [];
      onTheFly.push(...this.tuitions);
      this.tuitions = onTheFly;
      //console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Tuition'));

  }

  public saveTuitionNew() {
    this.tuitionView.modBy = this.loggedInUser.id;
    this.tuitionView.enrollmentId = this.enrollment.id;

    console.log(this.tuitionView);

    this.studentService.saveTuitionNew(this.tuitionView).subscribe((data: TuitionView) => {
      this.tuitionView = data;

      this.addStudentTuitionRebate = false;
      this.success = Constants.saveSuccess;

      console.log(this.tuitionView);
    },
      error => console.log(error),
      () => console.log('Save Tuition'));


  }

  public saveTuitionRebate(data: TuitionView, rowIndex: number) {
    console.log(data);
    // console.log(rowIndex);

    this.error = '';
    this.success = '';
    
    if (data.newRebate == 0) {
      this.error = "Entrer le montant à payer !";
    }
    else if (data.newRebate > data.balance) {
      this.error = "Remise à appliquer supérieure au montant restant !";
    }else if(data.enable==false){
      this.error = "La tranche est désactivée";
    }
    else {
      this.tuitionView.modBy = this.loggedInUser.id;
      this.tuitionView.enrollmentId = this.enrollment.id;

      //var newPay: number = this.tuitionView.newPay;

      this.studentService.saveTuitionNewNew(data).subscribe((res: TuitionView) => {
        this.tuitionView = res;

        //this.getStudentPayments(); //A modifier apr�s en appelant la methode updateStudentPaymentsTable()
        //this.updateStudentTuitionInTable();
        //this.updateStudentTuitionRowInTable(rowIndex);

        this.addStudentTuitionRebate = false;
        this.success = Constants.saveSuccess;

        //console.log(this.tuitionView);
      },
        error => console.log(error),
        () => console.log('Save Tuition Rebate'));
    }

  }

  updateStudentTuitionRowInTable(rowIndex: number) {
    console.log(rowIndex);

    this.tuitions[rowIndex] = this.tuitionView;

    var onTheFly: TuitionView[] = [];
    onTheFly.push(...this.tuitions);
    this.tuitions = onTheFly;

    //this.resetData();
  }

  public saveTuitionNewNew(data: TuitionView) {
    console.log(data);

    this.error = '';
    this.success = '';

    if (data.newPay == 0) {
      this.error = "Entrer le montant à payer !";
    }
    else if (data.slipNumber == null) {
      this.error = "Entrer le numero du bordereau !";
    }
    else if (this.bank == null) {
      this.error = "Choisissez la banque destinataire !";
    }
    else if (data.newPay > data.balance) {
      this.error = "Montant à payer supérieur au montant restant !";
    }
    else {
      this.tuitionView.modBy = this.loggedInUser.id;
      this.tuitionView.enrollmentId = this.enrollment.id;

      data.bankId = this.bank.id;
      var newPay: number = this.tuitionView.newPay;
      //console.log("Student tuition " + newPay);
      //console.log("Student tuition newPay " + this.tuitionView.newPay);

      /* Date payement � la banque (date bordereau) */
      if (data.bankPaymentDate != null)
      {
        const dateArray = data.bankPaymentDate.toString().split('/');
        var fDate= new Date(dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]);
        data.bankPaymentDate=fDate;
      }

      // console.log(data,"c'est ce que j'envoie");

      this.studentService.saveTuitionNewNew(data).subscribe((res: TuitionView) => {
        this.tuitionView = res;

        //Mise � jour du tableau de la liste des versements
        //this.updateStudentPaymentsTable(newPay);

        //Mise � jour dans le tableau d'affichage
        this.tuitionView.slipNumber = ''; //Initialisation du num�ro de bordereau du pr�c�dent versement
        this.tuitionView.bankPaymentDate = null;

        this.tuitionViewCommitments[this.tuitionViewCommitments.indexOf(data)] = this.tuitionView;
        var onTheFly: TuitionView[] = [];
        onTheFly.push(...this.tuitionViewCommitments);
        this.tuitionViewCommitments = onTheFly;

        this.getStudentPayments(); //A modifier apr�s en appelant la methode updateStudentPaymentsTable()

        this.addStudentTuitionRebate = false;
        this.success = Constants.saveSuccess;

        this.bank = null;

        //console.log(this.tuitionView);
      },
        error => console.log(error),
        () => console.log('Save Tuition'));
    }

  }

  public updateStudentPaymentsTable(newPay: number) {
    var onTheFly: Payment[] = [];
    let newP = new Payment();
    newP.amount = newPay;
    newP.paymentDate = new Date();
    newP.bank = this.bank;
    newP.slipNumber = this.tuitionView.slipNumber;

    onTheFly.push(newP);
    onTheFly.push(...this.studentPayments);
    this.studentPayments = onTheFly;

    //console.log("Student tuition " + newPay);
  }

  public showTuitionCommentDialog(data) {
    this.tuitionView = data;
    //console.log(data);

    this.studentTuitionComment = new StudentTuitionComment();

    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      //this.studentTuitionComment.studentTuitionId = data.studentTuitionId;
      this.studentTuitionComment.studentTuitionId = data.studentTuitionId;
      //console.log(this.studentTuitionComment);
      this.displayPaymentComment = true;
      this.success = "";
      this.error = "";
    }
  }

  public deleteShowTuitionCommentDialog() {
    this.displayPaymentComment = false;
    this.success = "";
    this.error = "";
  }

  addNewStudentTuitionComment() {
    this.addStudentTuitionComment = true;
  }

  public cancelStudentTuitionComment() {
    this.addStudentTuitionComment = false;
  }

  putStudentTuitionCommentInTable() {
    var onTheFly: StudentTuitionComment[] = [];
    onTheFly.push(...this.studentTuitionCommentComments);
    onTheFly.push(this.studentTuitionComment);
    this.studentTuitionCommentComments = onTheFly;
  }


  public getStudentTuitionComments() {
    this.studentTuitionComments = [];

    if (this.studentTuitionComment.studentTuitionId != null) {
      //this.user = aUser;

      this.studentService.getStudentTuitionComments(this.studentTuitionComment.studentTuitionId)
        .subscribe(result => {
          this.studentTuitionComments = result;
          //console.log(this.studentTuitionComments);
          this.trie();
        });

    }
  }

  public trie() {
    this.studentTuitionCommentComments = [];
    this.studentTuitionCommentDocuments = [];

    for (let i = 0; i < this.studentTuitionComments.length; i++) {
      if (this.studentTuitionComments[i].comment) {
        this.studentTuitionCommentComments.push(this.studentTuitionComments[i]);
      }
      if (this.studentTuitionComments[i].receivedDocument) {
        this.studentTuitionCommentDocuments.push(this.studentTuitionComments[i]);
      }
    }

  }

  saveStudentTuitionComment() {
    //console.log(this.tuitionView);

    try {
      this.error = '';
      //this.enrollment.student = this.student;
      if (this.studentTuitionComment.studentTuitionCommentDate == null) {
        this.studentTuitionComment.studentTuitionCommentDate = new Date();
        //this.error = 'Entrez une date';
      }
      this.studentTuitionComment.studentTuitionId = this.tuitionView.studentTuitionId;
      this.studentTuitionComment.modBy = this.loggedInUser.id;

      this.studentService.saveStudentTuitionComment(this.studentTuitionComment)
        .subscribe(result => {
          if (result.id > 0) {
            this.studentTuitionComment = result;
            this.addStudentTuitionComment = false;
            this.putStudentTuitionCommentInTable();
            this.success = Constants.saveSuccess;
          }
          else {
            //this.error = result.error;
            this.error = "Erreur !";
            this.displayPaymentComment = true;
          }
        })

    }
    //}
    catch (e) {
      console.log(e);
    }

  }

  showDialogToUploadReceivedDocument(data) {
    //console.log(data);

    this.studentTuitionComment = new StudentTuitionComment();
    this.studentTuitionComment.id = this.tuitionView.studentTuitionId;

    //console.log(this.studentTuitionComment);

    this.fileUploader.showDialogToUploadImage("recuPaiment", this.studentTuitionComment);

  }

  ngOnInit() {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    this.studentService.getAllCurrencies()
      .subscribe(result => {
        this.currencies = result;
        for (let i = 0; i < this.currencies.length; i++) {
          let curr = this.currencies[i];
          this.currencies[i].label = this.currencies[i].name;
          this.currencies[i].value = this.currencies[i].code;
          //console.log(curr.code);
          if (curr.main) {
            this.currency = curr;
            this.mainCurrency = curr;
            this.selectedCurrency = curr.code;
            //console.log('Main Currency:' + curr.code);
          }
        }
        if (this.currency == null) {
          this.currency = this.currencies[0];
          this.mainCurrency = this.currencies[0];
        }
      });

    if (this.loggedInUser.role == 3) {
      this.getEnrollments(this.loggedInUser);
    }
    this.cols = [
      { field: 'enrollmentDate', header: Constants.DATE_INSCRIPTION, type: 'Date', sortable: 'true' },
      { field: 'levelClass.name', header: Constants.CLASSE, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'term.name', header: Constants.TERM, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'schoolYear.year', header: Constants.YEAR, type: 'string', sortable: 'false', filter: 'true' }
    ];
    this.colsPaymentCommitment = [
      { field: 'paymentCommitment.amount', header: Constants.AMOUNT, type: 'Double', sortable: 'true' },
      { field: 'paid', header: Constants.AMOUNT_PAID, type: 'Double', sortable: 'true' },
      //{ field: 'rebate', header: Constants.REBATE, type: 'Double', sortable: 'true' },
      { field: 'balance', header: Constants.BALANCE, type: 'Double', sortable: 'true' },
      { field: 'paymentCommitment.dueDate', header: Constants.DUE_DATE, type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'paymentCommitment.remindDate', header: Constants.REMIND_DATE, type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'paymentCommitment.comment', header: Constants.COMMENT, type: 'string', sortable: 'false', filter: 'true' }
    ];
    this.colsPayments = [
      { field: 'amount', header: Constants.AMOUNT_PAID, type: 'Double', sortable: 'true' },
      { field: 'rebate', header: Constants.REBATE, type: 'Double', sortable: 'true' },
      { field: 'paymentDate', header: Constants.PAYMENT_DATE, type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'bank.name', header: Constants.PAYMENT_BANK, type: 'string', sortable: 'false', filter: 'true' },
      { field: 'slipNumber', header: Constants.PAYMENT_SLIP_NUMBER, type: 'string', sortable: 'false', filter: 'true' },
      { field: 'bankPaymentDate', header: Constants.BANK_PAYMENT_DATE, type: 'Date', sortable: 'true', filter: 'true' },
      { field: 'caissier.name', header: Constants.CASHIER, type: 'string', sortable: 'false', filter: 'true' }
    ];
  }


  onRowSelect(evt) {
    this.enrollment = new Enrollment();
    console.log(evt.data);
    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      this.newEnrollment = false;
      this.enrollment = this.clone(evt.data);
      this.enrollment.enrollmentDate = new Date(this.enrollment.enrollmentDate);
      this.schoolYear = this.enrollment.schoolYear;
      this.displayDialog = true;
    }
    this.getTuitionList(evt);

    this.getCourses(evt.data.student.user);

    // console.log(this.courseInscritExist,"--- cours inscr exist---");
    // console.log(this.tranchePaymentExist ,"tranch pay exist")

  }

  clone(e: Enrollment): Enrollment {
    let aEnrollment = new Enrollment();
    for (let prop in e) {
      aEnrollment[prop] = e[prop];
    }
    return aEnrollment;
  }

  findSelectedIndex(): number {
    return this.enrollments.indexOf(this.selectedEnrollment);
  }

  showDialogToAdd() {
    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      this.newEnrollment = true;
      this.tranchePaymentExist = false;
      this.courseInscritExist = false;
      this.enrollment = new Enrollment();
      this.registeredCourses = [];
      this.tuitions = [];
      this.error = null;
      this.displayDialog = true;
    }
  }

  saveEnrollment() {
    try {
      this.error = '';
      this.enrollment.student = this.student;
      this.enrollment.modBy = this.loggedInUser.id;
      if (this.student == null || this.student.id <= 0) {
        this.error = Constants.ACCEPT_STUDENT_FIRST;
      } else if (this.enrollment.levelClass == null) {
        this.error = Constants.SELECT_CLASS;
      } else if (this.enrollment.enrollmentDate == null) {
        this.error = 'Entrez une date';
      } else if (this.enrollment.schoolYear == null) {
        this.error = 'Choisissez l\'annee';
      } else {
          this.studentService.saveEnrollment(this.enrollment)
          .subscribe(result => {
            if (result.id > 0) {
              this.enrollment = result;
              this.putInTable();
            }
            else {
              this.error = result.error;
              this.displayDialog = true;
            }
          })

      }
    }
    catch (e) {
      console.log(e);
    }
  }

  onChange(change : boolean){
    this.enrollment.hasScholarship = !this.enrollment.hasScholarship;
  }

  deleteEnrollment() {
    try {
      this.error = '';
      this.studentService.deleteEnrollment(this.enrollment)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = 'Prière supprimer les tranches affectées à l\'étudiant avant de supprimer la classe';
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.enrollments == null) {
      this.enrollments = [];
    }
    if (this.newEnrollment) {
      this.enrollments.push(this.enrollment);
    }
    else {
      this.enrollments[this.findSelectedIndex()] = this.enrollment;
    }
    var onTheFly: Enrollment[] = [];
    onTheFly.push(...this.enrollments);
    this.enrollments = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.enrollments.splice(this.findSelectedIndex(), 1);
    var onTheFly: Enrollment[] = [];
    onTheFly.push(...this.enrollments);
    this.enrollments = onTheFly;
    this.resetData();
  }

  resetData() {
    this.enrollment = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }
  deleteTuitionComment() {
  }

  /* Update Payment System 01112019 */


  public showPaymentCommitmentDialog(data) {
    this.tuitionView = data;
    //console.log(data);

    this.activeTab = 0;

    this.studentPaymentCommitment = new PaymentCommitment();

    this.studentTuitionComment = new StudentTuitionComment();

    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      this.studentPaymentCommitment.studentTuitionId = data.studentTuitionId;
      this.studentTuitionComment.studentTuitionId = data.studentTuitionId;

      this.displayPaymentCommitment = true;
      this.addPayment = false;
      this.addPaymentCommitment = false;
      this.success = "";
      this.error = "";
    }

    //this.getStudentPaymentCommitments();
    this.getCommitmentPaymentByStudentTuition();

  }

  public checkRowExpand(evt) {
    this.tuitionView = evt.data;
    //this.selectedView = evt.data;
    console.log(this.tuitionView);
    //console.log(data);

    this.activeTab = 0;

    this.studentPaymentCommitment = new PaymentCommitment();

    this.studentTuitionComment = new StudentTuitionComment();

    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      this.studentPaymentCommitment.studentTuitionId = this.tuitionView.studentTuitionId;
      this.studentTuitionComment.studentTuitionId = this.tuitionView.studentTuitionId;

      this.expandRow = true;
      this.addPayment = false;
      this.addPaymentCommitment = false;
      this.success = "";
      this.error = "";
    }

    //this.getStudentPaymentCommitments();
    //this.getCommitmentPaymentByStudentTuition();

  }

  public deleteShowTuitionCommitmentDialog() {
    this.displayPaymentCommitment = false;
    this.success = "";
    this.error = "";
  }

  addNewPaymentCommitment() {
    /*
    var onTheFly: PaymentCommitment[] = [];
    let spc = new PaymentCommitment();
    onTheFly.push(...this.studentPaymentCommitments);
    onTheFly.push(spc);
    this.studentPaymentCommitments = onTheFly;
    console.log('StudentPaymentCommitments:' + this.studentPaymentCommitments);
    */
    this.studentPaymentCommitment = new PaymentCommitment();
    this.addPaymentCommitment = true;
  }

  putPaymentCommitmentInTable() {
    /*
    var onTheFly: PaymentCommitment[] = [];
    
    onTheFly.push(...this.studentPaymentCommitments);
    onTheFly.push(this.studentPaymentCommitment);
    this.studentPaymentCommitments = onTheFly;
    */
    //console.log('StudentPaymentCommitments:' + this.studentPaymentCommitments);

    
    var onTheFly: PaymentCommitmentView[] = [];

    //Construction de la vue à partir de l'obet qu'on vient d'enregistrer
    this.studentPaymentCommitmentView = new PaymentCommitmentView();
    this.studentPaymentCommitmentView.paymentCommitment = this.studentPaymentCommitment;
    this.studentPaymentCommitmentView.paid = 0;
    this.studentPaymentCommitmentView.rebate = 0;
    this.studentPaymentCommitmentView.balance = this.studentPaymentCommitment.amount;

    onTheFly.push(...this.studentPaymentCommitmentViews);
    onTheFly.push(this.studentPaymentCommitmentView);
    this.studentPaymentCommitmentViews = onTheFly;

    console.log(this.studentPaymentCommitmentViews);
  }

  updatePaymentCommitmentInTable() {
    
    this.studentPaymentCommitments[this.findPaymentCommitmentSelectedIndex()] = this.studentPaymentCommitment;
    
    var onTheFly: PaymentCommitment[] = [];
    onTheFly.push(...this.studentPaymentCommitments);
    this.studentPaymentCommitments = onTheFly;

    this.resetData();
  }

  findPaymentCommitmentSelectedIndex(): number {
    return this.studentPaymentCommitments.indexOf(this.selectedStudentPaymentCommitment);
  }

  updatePaymentCommitmentViewInTable() {
    
    this.studentPaymentCommitmentViews[this.findPaymentCommitmentViewSelectedIndex()] = this.studentPaymentCommitmentView;
    
    var onTheFly: PaymentCommitmentView[] = [];
    onTheFly.push(...this.studentPaymentCommitmentViews);
    this.studentPaymentCommitmentViews = onTheFly;

    //this.resetData();
    this.changeDetectorRef.detectChanges();
  }

  findPaymentCommitmentViewSelectedIndex(): number {
    return this.studentPaymentCommitmentViews.indexOf(this.selectedStudentPaymentCommitmentView);
  }

  saveStudentPaymentCommitment() {

    //console.log(this.tuitionView);

    this.error = '';
    this.success = '';
    if(this.tuitionView.enable == true){

     if(this.tuitionView.amount == this.tuitionView.paid){
      this.error = "La tranche est soldée"
     }else{
      if(this.studentPaymentCommitment.amount <= this.tuitionView.balance){
        if (this.studentPaymentCommitment.amount <= 0) {
          this.error = "Erreur : Le montant de l'engagement doit être supérieur à 0 !"
        }
        else {
          this.studentPaymentCommitment.studentTuitionId = this.tuitionView.studentTuitionId;
          this.studentPaymentCommitment.enable = true;
    
          try {
    
            this.studentService.saveStudentPaymentCommitment(this.studentPaymentCommitment)
              .subscribe(result => {
                if (result.id > 0) {
                  this.studentPaymentCommitment = result;
                  this.addPaymentCommitment = false;
                  this.success = Constants.saveSuccess;
    
                  this.putPaymentCommitmentInTable();
                }
                else if(result.error != null) {
                  this.error = result.error;
                  this.displayPaymentComment = true;
                }
                else {
                  this.error = "Erreur lors de l'enregistrement. Verifiez tous les champs";
                  this.displayPaymentComment = true;
                }
              })
    
          }
          //}
          catch (e) {
            console.log(e);
          }
        }
      }else{
        this.error = "Le montant de l'engagement dépasse le montant restant à payer sur la tranche";
      }
     }
    }
    
    else{
      this.error = "La tranche est désactivée";
    }

  }

  public cancelStudentPaymentCommitment() {
    this.addPaymentCommitment = false;
  }


  public getStudentPaymentCommitments() {
    if (this.studentPaymentCommitment.studentTuitionId != null) {
      //this.user = aUser;

      this.studentPaymentCommitments = [];

      this.studentService.getStudentPaymentCommitments(this.studentPaymentCommitment.studentTuitionId)
        .subscribe(result => {
          this.studentPaymentCommitments = result;
          //console.log(this.studentPaymentCommitments);

          //this.trie();

        });

    }
  }

  public getCommitmentPaymentByStudentTuition() {
    console.log("1");
    if (this.studentPaymentCommitment.studentTuitionId != null) {
      console.log("2");
      this.studentPaymentCommitmentViews = [];

      this.studentService.getCommitmentPaymentByStudentTuition(this.studentPaymentCommitment.studentTuitionId)
        .subscribe(result => {
          this.studentPaymentCommitmentViews = result;
          //console.log(this.studentPaymentCommitmentViews);

        });

    }
  }

  onTabChange(evt) {
    this.activeTab = evt.index;

    this.success = "";
    this.error = "";

    if (evt.index == 0) {
      this.addStudentTuitionRebate = false;
      this.tuitionView.newRebate = 0;
    } else if (evt.index == 1) {
      this.addPaymentCommitment = false;
      this.getCommitmentPaymentByStudentTuition();
      //this.getStudentTuitionComments();
    } else if (evt.index == 2) {
      this.addPayment = false;
      this.getStudentPayments();
    } else if (evt.index == 3) {

      this.tuitionCommentOrDocumentSelected();
    } else if (evt.index == 4) {
      this.addStudentTuitionComment = false;
      this.tuitionCommentOrDocumentSelected();
    }
  }

  public tuitionCommentOrDocumentSelected() {
    //console.log(this.tuitionView);

    this.studentTuitionComment = new StudentTuitionComment();

    if (this.loggedInUser.role <= 2 || this.loggedInUser.role == 5 || this.loggedInUser.role == 8 || this.loggedInUser.role == 9) {
      //this.studentTuitionComment.studentTuitionId = data.studentTuitionId;
      this.studentTuitionComment.studentTuitionId = this.tuitionView.studentTuitionId;
      //console.log(this.studentTuitionComment);
      //this.displayPaymentComment = true;
      this.success = "";
      this.error = "";
    }

    this.getStudentTuitionComments();
  }





  addNewStudentTuitionRebate() {
    this.addStudentTuitionRebate = true;
  }

  public cancelStudentTuitionRebate() {
    this.addStudentTuitionRebate = false;
  }


  public getStudentPayments() {
    this.studentPayments = [];
    this.studentPaymentsAndRebate = [];

    if (this.tuitionView.studentTuitionId != null) {
      //this.user = aUser;

      this.studentService.getStudentPayments(this.tuitionView.studentTuitionId)
        .subscribe(result => {
          this.studentPayments = result;
          //console.log(this.studentPayments);

          //this.trieStudentPaymentRebate();

        });

    }
  }


  public trieStudentPaymentRebate() {

    for (let i = 0; i < this.studentPaymentsAndRebate.length; i++) {
      if (this.studentPaymentsAndRebate[i].amount) {
        this.studentPayments.push(this.studentPaymentsAndRebate[i]);

      }
      //console.log(this.studentPayments);
      /*
      if (this.studentTuitionComments[i].receivedDocument)
      {
        this.studentTuitionCommentDocuments.push(this.studentTuitionComments[i]);
      }
      */
    }

  }

  addNewPayment() {
    /*var onTheFly: StudentTuitionComment[] = [];
    let stc = new StudentTuitionComment();
    onTheFly.push(...this.studentTuitionCommentComments);
    onTheFly.push(stc);
    this.studentTuitionCommentComments = onTheFly;*/
    this.addPayment = true;

    //this.getTuitionCommitments();
    this.getTuitionCommitmentsNew();
  }

  public cancelPayment() {
    this.addPayment = false;
  }


  public getTuitionCommitments() {
    if (this.tuitionView.studentTuitionId != null) {
      //this.user = aUser;

      this.tuitionViewCommitments = [];

      this.studentService.getTuitionCommitments(this.tuitionView.studentTuitionId)
        .subscribe(result => {
          this.tuitionViewCommitments = result;
          //console.log(this.tuitionViewCommitments);

        });

    }
  }


  public getTuitionCommitmentsNew() {
    if (this.tuitionView.studentTuitionId != null) {
      //this.user = aUser;

      this.tuitionViewCommitments = [];
      console.log("Student tuition Id ");
      console.log(this.tuitionView.studentTuitionId);
      this.studentService.getTuitionCommitmentsNew(this.tuitionView.studentTuitionId)
        .subscribe(result => {
          //Si des engagements actifs sont cr�es, les paiements se feront sur ces engagements
          if (result.length > 0) {
            this.tuitionViewCommitments = result;
          }
          //Si les engagements actifs ne sont pas cr�es, les paiements se feront sur la tranche de paiement principal
          else if(this.tuitionView.enable) {
            var onTheFly: TuitionView[] = [];
            onTheFly.push(...this.tuitionViewCommitments);
            onTheFly.push(this.tuitionView);
            this.tuitionViewCommitments = onTheFly;
          }

          //console.log(this.tuitionViewCommitments);

        });

    }
  }

  enablePaymentCommitment(data: PaymentCommitmentView) {
    this.error = '';
    this.success = '';

    this.studentPaymentCommitmentView = data;
    this.selectedStudentPaymentCommitmentView = data;

    this.studentPaymentCommitment = data.paymentCommitment;
    this.selectedStudentPaymentCommitment = data.paymentCommitment;

    // Vérificaition si cet engement avait fait l'objet d'un paiement avant d'être abandonné.
    if(this.studentPaymentCommitmentView.balance < this.studentPaymentCommitmentView.paymentCommitment.amount) 
    {
      this.error = "Cet engagement ne pourra plus être activé. Il faisait objet de paiement avant d'être abandonné.";
    }
    else 
    {

      this.enableButton = true;

      try {
        this.error = '';
  
        this.studentPaymentCommitment.studentTuitionId = this.tuitionView.studentTuitionId;
  
        this.studentService.enablePaymentCommitment(this.studentPaymentCommitment)
          .subscribe(result => {
            if (result.error == null) {
              this.studentPaymentCommitment = result;
              this.studentPaymentCommitmentView.paymentCommitment = this.studentPaymentCommitment;
              
              this.success = Constants.saveSuccess;
  
              this.updatePaymentCommitmentViewInTable();
            }
            else {
              this.error = result.error;
            }
  
            this.enableButton = false;
          })
  
      }
      //}
      catch (e) {
        console.log(e);
      }
    }

  }

  disablePaymentCommitment(data: PaymentCommitmentView) {
    console.log("Désactivation ");
    this.error = '';
    this.success = '';

    this.studentPaymentCommitmentView = data;
    this.selectedStudentPaymentCommitmentView = data;

    this.studentPaymentCommitment = data.paymentCommitment;
    this.selectedStudentPaymentCommitment = data.paymentCommitment;
    //console.log(this.studentPaymentCommitment)
    //console.log(this.studentPaymentCommitmentView)
    // Vérification si l'engagement est déjà soldé
    if(this.studentPaymentCommitmentView.balance == 0) {
      this.error = "Erreur : Engagement déjà soldé !";
    }
    //Vérification si un paiement a été effectué à partir de l'engagement
    else if (this.studentPaymentCommitmentView.balance < this.studentPaymentCommitmentView.paymentCommitment.amount) {
      //this.error = "Erreur : Une partie du montant de cet engagement a déjà été payé !";
      this.confirmDisablePaymentCommitment = true;
    }
    else {

      this.enableButton = true;

      try {

        this.studentPaymentCommitment.studentTuitionId = this.tuitionView.studentTuitionId;
  
        this.studentService.disablePaymentCommitment(this.studentPaymentCommitment)
          .subscribe(result => {
            if (result.error == null) {
              this.studentPaymentCommitment = result;
              this.studentPaymentCommitmentView.paymentCommitment = this.studentPaymentCommitment;
              
              this.success = Constants.saveSuccess;
  
              //this.updatePaymentCommitmentInTable();
              this.updatePaymentCommitmentViewInTable();
            }
            else {
              this.error = result.error;
            }
  
            this.enableButton = false;
          })
  
      }
      //}
      catch (e) {
        console.log(e);
      }
    }

  }

  disablePaymentCommitmentAfterMakingItPayment() {
    try {

      this.studentPaymentCommitment.studentTuitionId = this.tuitionView.studentTuitionId;

      this.studentService.disablePaymentCommitmentAfterMakingItPayment(this.studentPaymentCommitment)
        .subscribe(result => {
          if (result.id > 0 && result.error == null) {
            //this.studentPaymentCommitment = result;
            //this.studentPaymentCommitmentView.paymentCommitment = this.studentPaymentCommitment;
            
            this.success = Constants.saveSuccess;

            //this.updatePaymentCommitmentInTable();
            this.getCommitmentPaymentByStudentTuition();
            this.confirmDisablePaymentCommitment = false;
          }
          else {
            this.error = result.error;
          }

          this.enableButton = false;
        })

    }
    //}
    catch (e) {
      console.log(e);
    }
  }

  cancelDisablingStudentTuition() {
    this.confirmDisableStudentTuition = false;
  }

  cancelDisablingPaymentCommitment() {
    this.confirmDisablePaymentCommitment = false;
  }

  public enableStudentTuition(data: TuitionView) {
    this.tuition = data;
    this.selectedView = data;

    this.errorStudentTuition = '';
    this.successStudentTuition = '';

    //console.log(this.tuition);
    
    /* By GBATI  COMMENT BY ADABOUNOU
    if(data.paid > 0){
      this.errorStudentTuition = "Cette tranche ne pourra plus être activée. Elle faisait objet de paiement avant d'être abandonnée.";
    }
    else{*/
    
    if( this.selectedView.balance< this.selectedView.amount){
      this.errorStudentTuition = 'Erreur: cette tranche a été payée avant d\'être désativée !';
    }else{
      try {
        this.error = '';
  
        this.studentService.enableStudentTuition(this.tuition)
          .subscribe(result => {
            
            this.tuition = result;
              
            this.successStudentTuition = Constants.saveSuccess;
  
            this.updateStudentTuitionInTable();
            
            this.enableButton = false;
          },
          error => console.log(error));
  
      }
      //}
      catch (e) {
        console.log(e);
      }
    }
   
  }

  public saveDisableStudentTuition(){
    this.studentService.disableStudentTuitionAfterPayment(this.tuition)
    .subscribe(result => {
      
      this.tuition = result;
        
      this.successStudentTuition = Constants.saveSuccess;

      this.updateStudentTuitionInTable();
      
      this.enableButton = false;
      this.getTuitions(this.eventData);
      //this.getEnrollments(this.loggedInUser);
      this.confirmDisableStudentTuition = false;
    },
    error => console.log(error));
  }

  public disableStudentTuition(data: TuitionView) {
 
    this.tuition = data;
    this.selectedView = data;
  
    this.errorStudentTuition = '';
    this.successStudentTuition = '';

    
/* By GBATI COMMENT BY ADABOUNOU
    //console.log(this.tuition);

    if(this.tuition.paid > 0) {
      this.confirmDisableStudentTuition = true;
      //this.confirmDisablePaymentCommitment = true;
      //this.errorStudentTuition = "Erreur ! Un paiement a été déjà effectué sur cette tranche.";
     */
    
    if(this.tuition.hasCommitment) {
      this.errorStudentTuition = "Cette tranche a des engagements, prière plutot les désactiver";
      // console.log("engagement");
    } else   if(this.tuition.balance == 0) {
      this.errorStudentTuition = "Tranche déja soldée";
      //console.log("engagement");
      
    }
    else {
      console.log("pas d'engagement");
      this.enableButton = true;

      try {
        this.error = '';
  
        this.studentService.disableStudentTuition(this.tuition)
          .subscribe(result => {
            
            this.tuition = result;
              
            this.successStudentTuition = Constants.saveSuccess;
  
            this.updateStudentTuitionInTable();
            
            this.enableButton = false;
          },
          error => console.log(error));
  
      }
      //}
      catch (e) {
        console.log(e);
      }
    }
  }

  updateStudentTuitionInTable() {
    
    this.tuitions[this.findStudentTuitionSelectedIndex()] = this.tuition;
    
    var onTheFly: TuitionView[] = [];
    onTheFly.push(...this.tuitions);
    this.tuitions = onTheFly;

    this.changeDetectorRef.detectChanges();
  }

  findStudentTuitionSelectedIndex(): number {
    return this.tuitions.indexOf(this.selectedView);
  }

  bankSelected(event) {
    //console.log(event);

    this.bank = new Bank();

    this.bank.id = event.id;
    /*
		this.bank.name = event.name;
		this.bank.description = event.string1;
    console.log(this.informationChannel);
    */

  }

}
