import { Avantage } from 'app/models/grh/avantage';
import { PayDetail } from 'app/models/grh/payDetail';

export class AvantageValue {
    id: number;
    amount: number;
    state: boolean;
    avantage: Avantage;
    payDetail: PayDetail;
}
