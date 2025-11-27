
import {Author} from './author';
import {Brand} from './brand';
import {Category} from './category';
import {Language} from './language';
import {ProductCopy} from './productCopy';
import {Publisher} from './publisher';
import { Room } from './room';

export class Product {
  id: number;
  name: string;
  room: Room;
  productCode: string;
  isbn: string;
  pages: number;
  publicationYear: number;
  edition: string;
  returnable: boolean;
  author: Author;
  publisher: Publisher;
  language: Language;
  brand: Brand;
  category: Category;
  pic: string;
  status: boolean = true;
  barCode: string;
  description: string;
  qty: number;
  minQty: number;
  qtyInStock: number;
  // For view use only
  authorId: number;
  authorName: string;
  publisherId: number;
  publisherName: string;
  languageId: number;
  languageName: string;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;

  roomId:number;
  roomName:string;

  productCopies: ProductCopy[] = [];
}