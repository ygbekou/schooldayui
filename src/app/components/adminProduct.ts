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
import {Publisher} from '../models/publisher';
import {ScheduleEvent} from '../models/scheduleEvent';
import {LevelDropdown} from './dropdowns/dropdown.level';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {DataTableModule, DialogModule, Message} from 'primeng/primeng';
import {User} from '../models/User';
import {ProductService} from '../services/product.service';
import {ProductCopyService} from '../services/productCopy.service';
import {CategoryDropdown} from './dropdowns/dropdown.category';
import {LanguageDropdown} from './dropdowns/dropdown.language';
import {BrandDropdown} from './dropdowns/dropdown.brand';
import {PublisherDropdown} from './dropdowns/dropdown.publisher';
import {AuthorDropdown} from './dropdowns/dropdown.author';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {FileUploader} from './fileUploader';
import { RoomDropdown } from './dropdowns/dropdown.room';
import { Room } from '../models/room';
import {Building} from '../models/building' ;
@Component({
  selector: 'app-admin-product',
  templateUrl: '../pages/adminProduct.html',
  providers: [Constants, CategoryDropdown, LanguageDropdown, AuthorDropdown, PublisherDropdown, BrandDropdown,RoomDropdown]
})

export class AdminProduct implements OnInit, OnDestroy {
  public products: Product[];
  public error: String = '';
  public selectedProductCopy: ProductCopy;
  displayDialog: boolean;
  brand:Brand = new Brand();
  //categorie: Category = new Category();
  product: Product = new Product();
  selectedProduct: Product;
  newProduct: boolean;
  room:Room = new Room();
  cols: any[];
  user: User = new User();
  msgs: Message[] = [];
  @ViewChild(FileUploader) fileUploader: FileUploader;

  public categoryDropdown: CategoryDropdown;
  public languageDropdown: LanguageDropdown;
  public authorDropdown: AuthorDropdown;
  public publisherDropdown: PublisherDropdown;
  public brandDropdown: BrandDropdown;
  public roomDropdown: RoomDropdown;

  public constant: Constants;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  CATEGORY: string = Constants.CATEGORY;
  LANGUAGE: string = Constants.LANGUAGE;
  BRAND: string = Constants.BRAND;
  AUTHOR: string = Constants.AUTEUR;
  PUBLISHER: string = Constants.PUBLISHER;
  PRODUCT_ROOM: string = Constants.PRODUCT_ROOM;
  statuses: any[];
  public searchProductFct: Function;
  public searchText: string = "";

  constructor
    (
    private productService: ProductService,
    private productCopyService: ProductCopyService,
    private ctgDropdown: CategoryDropdown,
    private lgeDropdown: LanguageDropdown,
    private autDropdown: AuthorDropdown,
    private brdDropdown: BrandDropdown,
    private pubDropdown: PublisherDropdown,
    private rDropdown: RoomDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.categoryDropdown = ctgDropdown;
    this.languageDropdown = lgeDropdown;
    this.authorDropdown = autDropdown;
    this.brandDropdown = brdDropdown;
    this.publisherDropdown = pubDropdown;
    this.roomDropdown = rDropdown;
    this.statuses = [];
    this.statuses.push({label: 'En stock', value: 0});
    this.statuses.push({label: 'Emprunte', value: 1});
    this.statuses.push({label: 'Perdu', value: 2});
  }

  ngOnDestroy() {
    this.products = null;
    this.error = null;
    this.product = null;
    this.selectedProduct = null;
    this.cols = null;
  }

  ngOnInit() {

    this.cols = [

      {field: 'name', header: Constants.NAME_OR_TITLE, sortable: 'true', filter: 'true'},
      {field: 'category.name', header: Constants.CATEGORY, sortable: 'true', filter: 'true'},
      {field: 'brand.name', header: Constants.BRAND, sortable: 'true', filter: 'true'},
      {field: 'productCode', header: Constants.CODE, sortable: 'true', filter: 'true'},
      {field: 'room.name', header: Constants.PRODUCT_ROOM, sortable: 'true', filter: 'true'},
      //{field: 'isbn', header: Constants.ISBN, sortable: 'true', filter: 'true'},
      //{field: 'pages', header: Constants.PAGES, sortable: 'true', filter: 'true'},
      //{field: 'publicationYear', header: Constants.PUBLICATION_YEAR, sortable: 'true', filter: 'true'},
      {field: 'authorName', header: Constants.AUTEUR, sortable: 'false', filter: 'true', type: 'string[]'}
      //{field: 'publisherName', header: Constants.PUBLISHER, sortable: 'false', filter: 'true'}

    ];

    this.user = JSON.parse(atob(Cookie.get('user')));

    this.searchProductFct = this.searchProduct.bind(this);

  }

  public getAll(): void {
    this.products = [];
    this.productService.getAll()
      .subscribe((data: Product[]) => {
        this.products = data;
        //console.info("Classes: " + this.classes);
      },
      error => console.log(error),
      () => console.log('Get all Products complete'));
  }


  showDialogToAdd() {
    this.error = "";
    this.newProduct = true;
    this.product = new Product();
    this.displayDialog = true;
  }

  save() {
    this.msgs = [];
    try {
      this.error = '';
      this.productService.save(this.product)
        .subscribe(result => {
          if (result.id > 0) {
            this.product = result;
            this.putInTable();
            //this.displayDialog = false;
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    this.msgs = [];
    try {
      this.error = '';
      this.productService.delete(this.product)
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

  putInTable() {
    var onTheFly: Product[] = [];
    if (!this.products) {
      this.products = [];
    }
    if (this.newProduct)
      onTheFly.push(this.product);
    else {

      const indx = this.findSelectedIndex();
      this.products[indx] = this.product;
    }

    
    onTheFly.push(...this.products);
    this.products = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.products.splice(this.findSelectedIndex(), 1);
    var onTheFly: Product[] = [];
    onTheFly.push(...this.products);
    this.products = onTheFly;
    this.resetData();
  }

  removeFromSubTable() {
    this.product.productCopies.splice(this.findSelectedIndex(), 1);
    var onTheFly: ProductCopy[] = [];
    onTheFly.push(...this.product.productCopies);
    this.product.productCopies = onTheFly;
    //this.resetData();
  }

  resetData() {
    this.product = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newProduct = false;
    this.product = this.clone(evt.data);
    //this.setDropdownValues();
    this.displayDialog = true;
    this.product.productCopies = [];
  }

  /*setDropdownValues() {
    this.product.brand = new Brand();
    this.product.brand.id = this.product.brandId;
    this.product.brand.name = this.product.brandName;

    this.product.category = new Category();
    this.product.category.id = this.product.categoryId;
    this.product.category.name = this.product.categoryName;

    this.product.author = new Author();
    this.product.author.id = this.product.authorId;
    this.product.author.name = this.product.authorName;

    this.product.language = new Language();
    this.product.language.id = this.product.languageId;
    this.product.language.name = this.product.languageName;

    this.product.publisher = new Publisher();
    this.product.publisher.id = this.product.publisherId;
    this.product.publisher.name = this.product.publisherName;

    this.product.room = new Room();
    this.product.room.id = this.product.roomId;
    this.product.room.name = this.product.roomName;
  }*/

  setDropdownValues() {
    this.product.brand = new Brand();
     this.product.brandId = this.product.brand.id;
    this.product.brandName= this.product.brand.name;

    this.product.category = new Category();
    this.product.categoryId=this.product.category.id ;
   this.product.categoryName= this.product.category.name ;

    this.product.author = new Author();
    this.product.authorId=this.product.author.id ;
   this.product.authorName= this.product.author.name ;

    this.product.language = new Language();
    this.product.languageId = this.product.language.id ;
    this.product.languageName=this.product.language.name;

    this.product.publisher = new Publisher();
    this.product.publisherId=this.product.publisher.id ;
   this.product.publisherName= this.product.publisher.name;

    this.product.room = new Room();
   this.product.roomId= this.product.room.id;
    this.product.roomName= this.product.room.name ;
  }

  clone(e: Product): Product {
    let aProduct = new Product();
    for (let prop in e) {
      aProduct[prop] = e[prop];
    }
    return aProduct;
  }

  findSelectedIndex(): number {
    //console.log(this.selectedProduct);
    return this.products.indexOf(this.selectedProduct);
  }

  updateText(event) {
    this.searchText = event;
  }

  public searchProduct() {
    this.productService.searchProducts(this.searchText)
      .subscribe((data: Product[]) => {
        this.products = data;
        //console.info("Classes: " + this.classes);
      },
      error => console.log(error),
      () => console.log('Search Products complete for criteria ' + this.searchText));
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("product", data);
  }

  addNew(prdct: Product) {
    this.selectedProduct = prdct;
    var productCopies: ProductCopy[] = [];
    var pc = new ProductCopy();
    pc.status = 0;
    this.product.productCopies.push(pc);
    productCopies.push(... this.product.productCopies);
    this.product.productCopies = productCopies;
  }

  public saveProductCopyEvent(event) {
    this.msgs = [];
    event.data.productId = this.product.id;
    this.productCopyService.save(event.data)
      .subscribe((data: ProductCopy) => {
        this.product.productCopies[
          this.product.productCopies.indexOf(event.data)] = data;
        var onTheFly: ProductCopy[] = [];
        onTheFly.push(...this.product.productCopies);
        this.product.productCopies = onTheFly;
        this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
        //console.log(data);
      },
      error => console.log(error),
      () => console.log('Save Product Copy'));
  }


  public saveProductCopy(productCopy: ProductCopy) {
    this.msgs = [];
    if (productCopy.status == 1) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Utilise le menu emprunts pour les emprunts.'});
    } else
      this.productCopyService.save(productCopy)
        .subscribe((data: ProductCopy) => {
          this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
        },
        error => console.log(error),
        () => console.log('Save Product Copy'));
  }

  deleteProductCopy(productCopy: ProductCopy) {
    this.msgs = [];
    try {
      this.error = '';
      this.productCopyService.delete(productCopy)
        .subscribe(result => {
          if (result=="Success") {
            this.removeFromSubTable();
            this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
          }
          else {
            this.error = Constants.deleteFailed;
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: result});
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  public getProductCopies(evt) {
    this.product = evt.data;
    this.product.productCopies = [];
    this.productCopyService.getProductCopies(this.product.id)
      .subscribe((data: ProductCopy[]) => {
        this.product.productCopies = data
        this.selectedProduct = this.product;
      },
      error => console.log(error),
      () => console.log('Get copies complete'));
  }


}
