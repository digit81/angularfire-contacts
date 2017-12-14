import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';

@Injectable()
export class CompanyService {
  company$: FirebaseObjectObservable<any>;

  constructor(
    private af: AngularFireDatabase
  ) {
    this.company$ = this.af.object(`company`);
  }

  saveCompany( company ) {
    this.company$.set(company)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  updateCompany( company ) {
    this.company$.update(company)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  removeCompany( ) {
    this.company$.remove()
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }
}
