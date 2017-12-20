import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../../models/contact';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CompanyService} from '../../company/company.service';
import {Company} from '../../models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact$: Observable<Contact>;
  private contactID: string;
  isNewContact: boolean;
  companies$: Observable<Company[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.contactID = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactID === 'new';
    !this.isNewContact ? this.getContact() : this.assignNewContact();
  }

  saveContact( contact: Contact ) {
    const save = this.isNewContact
      ? this.contactService.saveContact(contact)
      : this.contactService.updateContact(this.contactID, contact);
    save.then( _ => this.router.navigate(['/contact-list']) );

  }

  removeContact() {
    this.contactService.removeContact( this.contactID )
      .then( _ => this.router.navigate(['/contact-list']) );
  }

  private getContact() {
    this.contact$ = this.contactService.getContact( this.contactID );

  }

  private assignNewContact() {
    this.contact$ = Observable.of({}) as Observable<Contact>;
  }
}
