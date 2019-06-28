import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../../order/order-data.component';
import {PotentialService} from '../../potential.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {ScopeService} from '../../../../core/service/scope.service';

@Component({
  selector: 'app-product-potential',
  templateUrl: './product-potential.component.html',
  styleUrls: ['./product-potential.component.css']
})
export class ProductPotentialComponent extends OrderDataComponent implements OnInit {

  @Input() products: any = [];
  @Input() orderId: any = null;
  @Input() policy: any = [];
  @Input() type: any = [];
  @Input() orderCode: any = [];
  public id: any;

  constructor(public orderService: PotentialService, private popup: PopupService, private fb: FormBuilder, public scopeS: ScopeService) {
    super(orderService);
  }

  ngOnInit() {
  }

}
