import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user-component',
  template: `
      <h1>User Component</h1>
      <button (click)="onNavigate()">Go Home</button>
      <hr>
      {{id}}
      <hr>
      <router-outlet></router-outlet>
    `
})
export class UserComponent implements OnDestroy {
  private subscription: Subscription;
  id: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    // Extracting a Fragment works just like extracting QueryParams
    // this.subscription = this.route.fragment.subscribe(
    //   fragment => console.log(fragment);
    // );

    this.subscription = activatedRoute.params.subscribe(
      (param: any) => this.id = param['id']
    );
  }

  onNavigate() {
    this.router.navigate(['/'], { queryParams: { analytics: 100 }, fragment: 'section1', preserveQueryParams: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
