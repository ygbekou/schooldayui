export class PersonType {
    id: number;
    name: string;
    rate: number;

    constructor(id: number = 0, name: string = "", rate:number = 0){
        this.id = id;
        this.name = name;
        this.rate = rate;
    }
  }