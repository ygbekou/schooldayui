import { MaterialAcquired } from "./MaterialAcquired";
import { Year } from "./Year";

export class Amortization {
    id: number;
    numberMonths: number;
    previousAmortization: number;
    yearAmortizationFinancial: number;
    accumulatedAmortization: number;
    netBookValue: number;
    materialAcquired: MaterialAcquired;
    year: Year;
}