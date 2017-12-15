import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../company.service';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Company} from '../../models/company';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company$: FirebaseObjectObservable<Company>;
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
    !this.isNewCompany ? this.getCompany() : this.assignNewCompany();
  }

  saveCompany( company: Company ) {
    const save = this.isNewCompany
      ? this.companyService.saveCompany(company)
      : this.companyService.updateCompany(company);
    save.then( _ => this.router.navigate(['/company-list']) );

  }

  removeCompany() {
    this.companyService.removeCompany( this.companyKey )
      .then( _ => this.router.navigate(['/company-list']) );
  }

  private getCompany() {
    this.company$ = this.companyService.getCompany( this.companyKey );

  }

  private assignNewCompany() {
    this.company$ = Observable.of({}) as FirebaseObjectObservable<Company>;
  }
}
