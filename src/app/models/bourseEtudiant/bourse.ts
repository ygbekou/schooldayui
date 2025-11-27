import { SousCategorieBourse } from "./sousCategorieBourse";

export class Bourse {
    id: number;
    code: string;
    libelle: string;
    description: string;
    sousCategorieBourse: SousCategorieBourse;
}