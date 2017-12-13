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
    this.company$.set(company);
  }
}
