import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PopoverDirective} from 'ngx-bootstrap';
import {PotentialService} from '../../potential.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {ScopeService} from '../../../../core/service/scope.service';
import {OrderDataComponent} from '../../../order/order-data.component';

@Component({
  selector: 'app-asign-sale-potential',
  templateUrl: './asign-sale-potential.component.html',
  styleUrls: ['./asign-sale-potential.component.css']
})
export class AsignSalePotentialComponent extends OrderDataComponent implements OnInit {

  @Input() id: any;
  @Input() saleSupport: any;
  @Input() saleSupportName: any;
  @Input() type: any;
  @Input() saleAll: any = [];
  @Input() saleId: any;
  @Output() checkSale = new EventEmitter();
  public loadSale: boolean = false;

  @ViewChild('pop') pop: PopoverDirective;

  public oldSaleSupport;
  public sales: any = [];
  public saleALL: any = [];

  constructor(public orderService: PotentialService, private popup: PopupService, private fb: FormBuilder, public scopeS: ScopeService) {
    super(orderService);
  }

  assignSale() {
    this.saleALL = this.saleAll.filter(c => Number(c.id) === Number(this.saleId));
    const messagePop = 'Do you want assign order ' + this.id + ' to new sale ';
    this.popup.warning(() => {
      const params: any = {};
      params.idSale = this.saleId;
      params.saleName = this.saleALL[0]['username'];
      params.saleEmail = this.saleALL[0]['email'];
      params.type = this.type;
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
  }
}
