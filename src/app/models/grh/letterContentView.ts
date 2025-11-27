import { LetterNumeroRef } from "./letterNumeroRef";
import { LetterObject } from "./letterObject";
import { SocietyBank } from "./societyBank";
import { Civility } from "./civility";
import { AccountNumber } from "./accountNumber";

export class LetterContentView {
    id: number;
    letterNumeroRefId: number;
    letterObjectId: number;
    accountNumberId: number;
    civilityId: number;
    amountInLetter: string;
    letterNumeroRef: string;
    letterObject: string;
    accountNumber: string;
    civility: string;
    bank: string;
}
