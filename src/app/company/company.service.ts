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
    // this.companiesCollection.onSnapshot(this.onSnapshotCompanies);
    this.onSnapshotCompanies();
  }

  onSnapshotCompanies() {
    this.companies$ = this.companiesCollection.snapshotChanges().map(companies => {
      return companies.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  saveCompany( company: Company ) {
    return this.companiesCollection.add(company)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  updateCompany( companyID: string, company: Company ) {
    console.log(company);
    return this.companiesCollection.doc(companyID).update(company)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  removeCompany( companyID: string ) {
    return this.companiesCollection.doc(companyID).delete()
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(docId: string): Observable<Company> {
    const document: AngularFirestoreDocument<Company> = this.afs.doc('companies/' + docId);
    return document.valueChanges();
  }
}
