import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Contact} from '../../models/contact';
import {CompanyService} from '../../company/company.service';
import {Company} from '../../models/company';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts$: FirebaseListObservable<Contact[]>;
  companies$: FirebaseListObservable<Company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.getContacts();
  }

  getContacts(companyKey?: string) {
    this.contacts$ = this.contactService.getContacts(companyKey);
  }
}
