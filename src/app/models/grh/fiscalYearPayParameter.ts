import { FiscalYear } from 'app/models/grh/fiscalYear';
import { PayParameter } from 'app/models/grh/payParameter';

export class FiscalYearPayParameter {
    id: number;
    value: number;
    fiscalYear: FiscalYear;
    payParameter: PayParameter;
}
