import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Company} from '../models/company';

@Injectable()
export class CompanyService {
  private companies$: FirebaseListObservable<Company[]>;

  constructor(
    private af: AngularFireDatabase
  ) {
    this.companies$ = this.af.list(`companies`);
  }

  saveCompany( company: Company ) {
    return this.companies$.push(company)
      .then( _ => console.log('success'));
      // .catch( error => console.log('error', error));
  }

  updateCompany( company: Company ) {
    return this.companies$.update(company.$key, company)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  removeCompany( key: string ) {
    return this.companies$.remove( key )
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
