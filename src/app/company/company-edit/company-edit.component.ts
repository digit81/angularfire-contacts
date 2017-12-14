import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company$: FirebaseObjectObservable<any>;

  constructor(
    private companyService: CompanyService
  ) {
    this.company$ = this.companyService.company$;
  }

  ngOnInit() {
  }

  saveCompany( company ) {
    this.companyService.saveCompany({name: company.name});
  }

  updateCompany( company ) {
    this.companyService.updateCompany({phone: 123});
  }
}
