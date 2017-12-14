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

  saveCompany( company: Company ) {
    this.companies$.push(company)
      .then( _ => console.log('success'));
      // .catch( error => console.log('error', error));
  }

  updateCompany( company: Company ) {
    this.companies$.update(company.$key, company)
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

  getCompany(companyKey: string) {
    return this.af.object(`companies/${companyKey}`);
  }
}
