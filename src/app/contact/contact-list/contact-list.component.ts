import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Contact} from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts$: FirebaseListObservable<Contact[]>;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }
}
