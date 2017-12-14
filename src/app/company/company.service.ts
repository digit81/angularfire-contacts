import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Company} from '../models/company';

@Injectable()
export class CompanyService {
  company$: FirebaseObjectObservable<Company>;
  private companies$: FirebaseListObservable<Company[]>;

  constructor(
    private af: AngularFireDatabase
  ) {
    this.company$ = this.af.object(`company`);
    this.companies$ = this.af.list(`companies`);
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

  getCompanies(): FirebaseListObservable<Company[]> {
    return this.companies$;
  }
}
