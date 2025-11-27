import { PayParameterType } from 'app/models/grh/payParameterType';

export class PayParameter {
    id: number;
    key: string;
    wording: string;
    //value: number;
    description: string;
    parameterType: PayParameterType;
}
