import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OperationRoutingComponent} from '../operation-routing.component';


@Component({
  selector: 'app-potential-routing',
  template: '<router-outlet></router-outlet>'
})
export class PotentialRoutingComponent extends OperationRoutingComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) {
    super(activatedRoute , );
  }

  ngOnInit() {
  }

}
