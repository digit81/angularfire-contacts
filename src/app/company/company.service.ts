import { Injectable } from '@angular/core';
import {Company} from '../models/company';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CompanyService {
  private companies$: Observable<Company[]>;
  private companiesCollection: AngularFirestoreCollection<Company>;

  // private companies$: FirebaseListObservable<Company[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.companiesCollection = this.afs.collection(`companies`);
    this.companies$ = this.companiesCollection.valueChanges();
  }

  saveCompany( company: Company ) {
    // return this.companiesCollection.push(company)
    //   .then( _ => console.log('success'));
      // .catch( error => console.log('error', error));
  }

  updateCompany( company: Company ) {
    // return this.companies$.update(company.$key, company)
    //   .then( _ => console.log('success'))
    //   .catch( error => console.log('error', error));
  }

  removeCompany( key: string ) {
    // return this.companies$.remove( key )
    //   .then( _ => console.log('success'))
    //   .catch( error => console.log('error', error));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyKey: string) {
    return this.afs.doc(`companies/${companyKey}`);
  }
}
