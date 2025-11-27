import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Class} from '../models/class';
import {ClassService} from '../services/class.service';
import {Constants} from '../app.constants';
import {Author} from '../models/author';
import {Brand} from '../models/brand';
import {Category} from '../models/category';
import {Language} from '../models/language';
import {Product} from '../models/product';
import {ProductCopy} from '../models/productCopy';
import {ProductCopyUser} from '../models/productCopyUser';
import {Publisher} from '../models/publisher';
import {ScheduleEvent} from '../models/scheduleEvent';
import {LevelDropdown} from './dropdowns/dropdown.level';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {DataTableModule, DialogModule, Message} from 'primeng/primeng';
import {User} from '../models/User';
import {UserService} from '../services';
import {ProductService} from '../services/product.service';
import {ProductCopyService} from '../services/productCopy.service';
import {ProductCopyUserService} from '../services/productCopyUser.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-product-user',
  templateUrl: '../pages/adminProductUser.html',
  providers: [Constants]
})

export class AdminProductUser implements OnInit, OnDestroy {
  public products: Product[];
  public error: String = '';
  public selectedProduct: Product;
  public selectedProductCopy: ProductCopy;
  displayDialog: boolean;
  product: Product = new Product();
  newProduct: boolean;
  cols: any[];
  userCols: any[];
  borrowedCols: any[];
  selectedCopyCols: any[];
  user: User = new User();
  borrower: User = new User();
  msgs: Message[] = [];
  productCopyUsers: ProductCopyUser[] = [];
  selectedProductCopies: ProductCopy[] = [];
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  public users: User[];
  public constant: Constants;
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  RETURN_LABEL: string = Constants.RETURN_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  SELECT_USER_LABEL: string = Constants.SELECT_USER_LABEL;

  CATEGORY: string = Constants.CATEGORY;
  LANGUAGE: string = Constants.LANGUAGE;
  BRAND: string = Constants.BRAND;
  AUTHOR: string = Constants.AUTEUR;
  PUBLISHER: string = Constants.PUBLISHER;
  RENT: string = Constants.RENT;

  public searchProductFct: Function;
  public searchText: string = "";
  public searchTextU: string = "";

  constructor
    (
    private userService: UserService,
    private productService: ProductService,
    private productCopyService: ProductCopyService,
    private productCopyUserService: ProductCopyUserService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    this.products = null;
    this.error = null;
    this.selectedProduct = null;
    this.product = null;
    this.cols = null;
    this.borrowedCols = null;
  }

  ngOnInit() {

    this.cols = [

      {field: 'name', header: Constants.NAME_OR_TITLE, sortable: 'true', filter: 'true'},
      {field: 'categoryName', header: Constants.CATEGORY, sortable: 'true', filter: 'true'},
      {field: 'brandName', header: Constants.BRAND, sortable: 'true', filter: 'true'},
      {field: 'authorName', header: Constants.AUTEUR, sortable: 'false', filter: 'true', type: 'string[]'}

    ];

    this.borrowedCols = [

      {field: 'productName', header: Constants.NAME, sortable: 'true'},
      {field: 'productCopyCode', header: Constants.CODE, sortable: 'true'},
      {field: 'isbn', header: Constants.ISBN, sortable: 'true'},
      {field: 'issueDate', header: Constants.DATE, sortable: 'true', type: 'Date'},
      {field: 'dueDate', header: Constants.DATE_ECHEANCE, sortable: 'true', type: 'Date', editable: 'true'},
      {field: 'returnDate', header: Constants.RETURN_DATE, sortable: 'true', type: 'Date'},

    ];

    this.userCols = [
      {field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'},
      {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'}
    ];

    this.selectedCopyCols = [

      {field: 'productName', header: Constants.NAME, sortable: 'true'},
      {field: 'code', header: Constants.CODE, sortable: 'true'},
      {field: 'isbn', header: Constants.ISBN, sortable: 'true'},

    ];

    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user != null
      && (this.user.role === 2 || this.user.role === 3||this.user.role === 5)) {
      this.borrower = this.user;
      this.onUserSelected(this.user);
    }

    this.searchProductFct = this.searchProduct.bind(this);


  }

  addToBasket(productCopy: ProductCopy) {
    this.selectedProductCopies.push(productCopy);
    this.productCopyUserService.saveBasket(this.borrower.id, this.selectedProductCopies)
      .subscribe((data: ProductCopyUser[]) => {
        this.productCopyUsers = data;
        this.selectedProductCopies = [];
        this.removeFromList(productCopy);
      },
      error => console.log(error),
      () => console.log('Get copies for user complete'));

  }

  returnProduct(productCopyUser: ProductCopyUser) {
    productCopyUser.returnDate = new Date();
    this.msgs = [];
    this.productCopyUserService.save(productCopyUser)
      .subscribe((data: string) => {
        this.msgs.push({severity: 'success', summary: 'Success', detail: data});
      },
      error => console.log(error),
      () => console.log('Get copies for user complete'));

  }

  removeFromBasket(productCopy: ProductCopy) {
    this.selectedProductCopies.splice(this.selectedProductCopies.indexOf(productCopy), 1);

    var onTheFly: ProductCopy[] = [];
    onTheFly.push(...this.selectedProductCopies);
    this.selectedProductCopies = onTheFly;

  }

  removeFromList(productCopy: ProductCopy) {
    this.product.productCopies.splice(this.product.productCopies.indexOf(productCopy), 1);

    var onTheFly: ProductCopy[] = [];
    onTheFly.push(...this.product.productCopies);
    this.product.productCopies = onTheFly;

  }

  findSelectedIndex(): number {
    return this.products.indexOf(this.selectedProduct);
  }

  updateText(event) {
    this.searchText = event;
  }

  showUserPopup() {
    this.displayDialog = true;
  }

  public searchProduct() {
    this.productService.searchProducts(this.searchText)
      .subscribe((data: Product[]) => {
        this.products = data;
      },
      error => console.log(error),
      () => console.log('Search Products complete for criteria ' + this.searchText));
  }

  public getProductCopyUsers() {
    this.productCopyUserService.getProductCopyUsers(this.borrower.id)
      .subscribe((data: ProductCopyUser[]) => {
        this.productCopyUsers = data
      },
      error => console.log(error),
      () => console.log('Get copies for user complete'));
  }

  onUserSelected(user: User) {
    this.changeDetectorRef.detectChanges();
    this.getProductCopyUsers();
  }

  public getProductCopies(evt) {
    this.product = evt.data;
    this.productCopyService.getProductCopies(this.product.id)
      .subscribe((data: ProductCopy[]) => {
        this.product.productCopies = data;
      },
      error => console.log(error),
      () => console.log('Get copies complete'));
  }

  public getInStockProductCopies(evt) {
    this.product = evt.data;
    this.productCopyService.getInStockProductCopies(this.product.id)
      .subscribe((data: ProductCopy[]) => {
        this.product.productCopies = data;
      },
      error => console.log(error),
      () => console.log('Get copies complete'));
  }

  public search() {
    this.error = null;
    if (this.searchTextU != null) {
      this.userService.search(this.searchTextU).subscribe((data: User[]) => {
        this.users = data;
        if (this.users == null || this.users.length <= 0) {
          this.error = Constants.NO_USER_FOUND;
        }
      },
        error => console.log(error),
        () => console.log('Find users with name like ' + this.searchTextU));
    }
  }

  saveUserProductCopy(event) {
    const pcu: ProductCopyUser = event.data;
    this.msgs = [];
    if (pcu.returnDate == null) {
      this.productCopyUserService.save(pcu)
        .subscribe((data: string) => {
          this.msgs.push({severity: 'success', summary: 'Success', detail: data});
        },
        error => console.log(error),
        () => console.log('Save PCU complete'));
    } else {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Produit deja retourne'});
    }

  }
}
