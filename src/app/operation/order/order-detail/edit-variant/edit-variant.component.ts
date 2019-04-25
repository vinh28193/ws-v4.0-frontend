import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['./edit-variant.component.css']
})
export class EditVariantComponent extends OrderDataComponent implements OnInit {
  @Input() id: any = null;
  @Input() variant: any = null;
  public editForm: FormGroup;
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      variant: this.variant,
    });
  }

  // editVariant() {
  //   console.log(this.editForm.value);
  //   this.orderService.put(`product/${this.id}`, this.editForm.value).subscribe(res => {
  //     this.popup.success('update success');
  //   });
  // }
}
