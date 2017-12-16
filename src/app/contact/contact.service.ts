import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Contact} from '../models/contact';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
  private contacts$: FirebaseListObservable<Contact[]>;
  public companyKey$ = new BehaviorSubject(undefined);


  constructor(
    private af: AngularFireDatabase
  ) {
    this.contacts$ = this.af.list(`contacts`);
  }

  saveContact( contact: Contact ) {
    return this.contacts$.push(contact)
      .then( _ => console.log('success'));
      // .catch( error => console.log('error', error));
  }

  updateContact( contact: Contact ) {
    return this.contacts$.update(contact.$key, contact)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  removeContact( key: string ) {
    return this.contacts$.remove( key )
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  getContacts(): FirebaseListObservable<Contact[]> {
    return this.af.list(`contacts`, {
      query: {
        orderByChild: 'companyKey',
        equalTo: this.companyKey$
      }
    });
  }

  getContact(contactKey: string) {
    return this.af.object(`contacts/${contactKey}`);
  }
}
