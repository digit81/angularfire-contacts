import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Company} from '../../models/company';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company$: FirebaseObjectObservable<any>;
  private companyKey: string;
  isNewCompany: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    if ( !this.isNewCompany ) { this.getCompany(); }
  }

  saveCompany( company: Company ) {
    this.companyService.saveCompany(company);
  }

  updateCompany( company: Company ) {
    this.companyService.updateCompany(company);
  }

  removeCompany() {
    this.companyService.removeCompany();
  }

  private getCompany() {
    this.company$ = this.companyService.getCompany( this.companyKey );

  }
}
