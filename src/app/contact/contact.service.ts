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
    return this.contactsCollection.add(contact)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  updateContact( contactID: string, contact: Contact ) {
    return this.contactsCollection.doc(contactID).update(contact)
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
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


    // const collection = this.afs.collection<Contact>(`contacts`, ref => {
    //   const companyId = this.companyId$.getValue();
    //   if ( companyId ) {
    //     ref.where('companyKey', '==', companyId);
    //   }
    //   ref.orderBy('name', 'desc');
    //   return ref;
    // });
    // return collection.valueChanges();
    // , {
    //     query: {
    //       orderByChild: 'companyKey',
    //         equalTo: this.companyId$
    //     }
    //   }
    // return this.contactsCollection.where()
    // return this.contacts$;
  }

  removeContact( contactID: string ) {
    return this.contactsCollection.doc(contactID).delete()
      .then( _ => console.log('success'))
      .catch( error => console.log('error', error));
  }

  getContact(docId: string): Observable<Contact> {
    return this.afs.doc<Contact>(`contacts/${docId}`).valueChanges();
  }
}
