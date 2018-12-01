import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { AppState } from './store/roots';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppState } from './store/reducers';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'page',
  template: `
    <div id="main">
      <!-- layout-main -->
        <router-outlet></router-outlet>
      <!--/layout-main -->
    </div>`
})
export class PageComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-empty
  // private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  // private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute, private location: Location
  constructor() {
  }

  public ngOnInit() {
    //
  }

  public ngOnDestroy(): void {
    // this.destroyed$.next(true);
    // this.destroyed$.complete();
  }
}
