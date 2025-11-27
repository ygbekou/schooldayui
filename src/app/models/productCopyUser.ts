export class ProductCopyUser {
  id: number;
  productId: number;
  productName: string;
  isbn: string;
  productCopyId: number;
  productCopyCode: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userMiddleName: string; 
  issueDate: Date;
  dueDate: Date;
  isOverDue: boolean;
  returnDate: Date;
  fine: number;
  waivedFine: number;
}