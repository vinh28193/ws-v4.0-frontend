import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PopoverDirective} from 'ngx-bootstrap';
import {OrderDataComponent} from '../../../order-data.component';
import {OrderService} from '../../../order.service';
import {PopupService} from '../../../../../core/service/popup.service';
import {ScopeService} from '../../../../../core/service/scope.service';

@Component({
  selector: 'app-assign-sale-cart',
  templateUrl: './assign-sale-cart.component.html',
  styleUrls: ['./assign-sale-cart.component.css']
})
export class AssignSaleCartComponent extends OrderDataComponent implements OnInit {
  @Input() id: any;
  @Input() saleSupport: any;
  @Input() saleAll: any;
  @Input() saleId: any;
  @Output() checkSale = new EventEmitter();
  public loadSale: boolean = false;

  @ViewChild('pop') pop: PopoverDirective;

  public oldSaleSupport;
  public sales: any = [];

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder, public scopeS: ScopeService) {
    super(orderService);
  }

  assignSale() {
    const messagePop = 'Do you want assign order ' + this.id + ' to new sale ';
    this.popup.warning(() => {
      const params: any = {};
      params.idSale = this.saleId;
      params.typeUpdate = 'assignSaleCart';
      this.orderService.put(`cart/${this.id}`, params).subscribe(res => {
        if (res.success) {
          this.loadSale = true;
          this.checkSale.emit(this.loadSale);
          this.popup.success(res.message);
        } else {
          this.popup.error(res.message);
        }
      });
    }, messagePop);
  }

  ngOnInit() {
    // this.sales = JSON.parse(localStorage.getItem('systemSale'));
    // this.oldSaleSupport = this.saleSupport;
  }
}
