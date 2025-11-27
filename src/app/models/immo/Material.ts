import { AccountingAccount } from "./AccountingAccount";
import { CategoryMaterial } from "./CategoryMaterial";
import { Nature } from "./Nature";

export class Material {
    id: number;
    code: string;
    name: string;
    lifetime: number;
    rate: number;
    description: string;
    accountingAccount: AccountingAccount;
    categoryMaterial: CategoryMaterial;
    nature: Nature;
}