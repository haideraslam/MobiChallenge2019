import { Injectable } from '@angular/core';

class Userinformation {
  constructor() {
    this.name = '';
    this.imageName = '';
  }

  name: string;
  imageName: string;
}

@Injectable()
export class SharedDataService {

  userInformation: Userinformation = new Userinformation();

  constructor() { }
}
