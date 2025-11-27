export class AccountingAccount {
    id: number;
    accountNumber: string;
    name: string;
    description: string;
    parent: AccountingAccount;
    lifetime: number;
}