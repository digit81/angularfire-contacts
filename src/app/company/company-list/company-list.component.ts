import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Company} from '../../models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: FirebaseListObservable<Company[]>;

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }
}
