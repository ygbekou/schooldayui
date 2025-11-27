import { Material } from "./Material";
import { MaterialBrand } from "./MaterialBrand";
import { Reception } from "./Reception";
import { Vendor } from "./Vendor";

export class MaterialsAcquired {
    id: number;
    dateEntryIntoStore: Date;
    quantity: number;
    unitPrice: number;
    amountPurchase: number;
    amountTotal: number;
    amountCustoms: number;
    reference: string;
    features: string;
    reception: Reception;
    material: Material;
    vendor: Vendor;
    materialBrand: MaterialBrand;
}