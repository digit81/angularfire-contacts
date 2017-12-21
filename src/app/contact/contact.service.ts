import { Injectable } from '@angular/core';
import {Contact} from '../models/contact';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class ContactService {
  public contacts$: Observable<Contact[]>;
  public companyId$ = new BehaviorSubject(undefined);
  private contactsCollection: AngularFirestoreCollection<Contact>;


  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.contactsCollection = this.afs.collection(`contacts`);
    // this.getSnapshot();
  }

  getSnapshot() {
    this.contacts$ = this.contactsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Contact;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  saveContact( contact: Contact ) {
    contact.userId = this.auth.userId;
    return this.contactsCollection.add(contact)
      .then( _ => console.log('saveContact success'))
      .catch( error => console.log('saveContact error', error));
  }

  updateContact( contactID: string, contact: Contact ) {
    contact.userId = this.auth.userId;
    return this.contactsCollection.doc(contactID).update(contact)
      .then( _ => console.log('updateContact success'))
      .catch( error => console.log('updateContact error', error));
  }

  getContacts(): Observable<Contact[]> {
    return this.companyId$.switchMap( companyId => {
      const collection = companyId ?
        this.afs.collection<Contact>('contacts', ref => ref.where('companyKey', '==', companyId)) :
        this.afs.collection<Contact>('contacts');

      return collection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Contact;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    });
  }

  removeContact( contactID: string ) {
    return this.contactsCollection.doc(contactID).delete()
      .then( _ => console.log('removeContact success'))
      .catch( error => console.log('removeContact error', error));
  }

  getContact(docId: string): Observable<Contact> {
    return this.afs.doc<Contact>(`contacts/${docId}`).valueChanges();
  }
}
