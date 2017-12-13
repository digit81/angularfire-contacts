import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

import 'rxjs/add/operator/take';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private af: AngularFireDatabase
  ) {
    const observable = this.af.object(`connected`);

    observable
      .take(1)
      .subscribe(
        next => console.log( 'next', next ),
        error => console.log( 'error', error ),
        () => console.log( 'completed' )
      );
  }
}
