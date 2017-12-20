import { Injectable } from '@angular/core';
import {Contact} from '../models/contact';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {
  public contacts$: Observable<Contact[]>;
  public companyId$ = new BehaviorSubject(undefined);
  private contactsCollection: AngularFirestoreCollection<Contact>;


  constructor(
    private afs: AngularFirestore
  ) {
    this.contactsCollection = this.afs.collection(`contacts`);
    this.onSnapshotContacts();
  }

  onSnapshotContacts() {
    this.contacts$ = this.contactsCollection.snapshotChanges().map(contacts => {
      return contacts.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

  }

  saveContact( contact: Contact ) {
    return this.contactsCollection.add(contact)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  updateContact( contactID: string, contact: Contact ) {
    return this.contactsCollection.doc(contactID).update(contact)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  removeContact( contactID: string ) {
    return this.contactsCollection.doc(contactID).delete()
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  getContacts(): Observable<Contact[]> {
    // return this.afs.collection(`contacts`, ref => {
    //   let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //   if (color) { query = query.where('color', '==', color) };
    //   return query;
    // }, {
    //   query: {
    //     orderByChild: 'companyKey',
    //     equalTo: this.companyId$
    //   }
    // });
    return this.contacts$;
  }

  getContact(docId: string): Observable<Contact> {
    return this.afs.doc<Contact>(`contacts/${docId}`).valueChanges();
  }
}
