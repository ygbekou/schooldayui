import {ExpenseType} from './expenseType';
import {Course} from './course';
export class Expense {
  id: number;
  expenseDate: Date = new Date();
  currency: string;
  comment: string;
  amount: number;
  expenseType: ExpenseType;
  course: Course;
}