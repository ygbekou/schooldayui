import { MaterialsAcquired } from "./MaterialsAcquired";

export class MaterialAcquired {
    id: number;
    identificationCode: string;
    serialNumber: string;
    lastAssignmentDate: Date;
    isAffected: boolean;
    firstReleaseDateInStore: Date;
    originValue: number;
    amountPurchase: number;
    amountCustoms: number;
    materialsAcquired: MaterialsAcquired;

    toString(): String{
        return this.materialsAcquired.material.name + " " + this.identificationCode;
    }
}