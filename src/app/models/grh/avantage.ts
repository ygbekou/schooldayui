import { AvantageType } from 'app/models/grh/avantageType';

export class Avantage {
    id: number;
    key: string;
    wording: string;
    description: string;
    taxable: boolean;
    avantageType: AvantageType;
}
