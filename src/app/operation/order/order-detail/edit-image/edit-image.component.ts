import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent extends OrderDataComponent implements OnInit {

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }
  @Input() image: any = null;
  @Input() idImage: any = null;
  public check = false;

  ngOnInit() {
  }
  updateImage() {
    this.check = true;
  }
  editImage() {
    this.orderService.getPut(`edit-image/${this.idImage}`, `image=${this.image}`).subscribe(res => {
      this.check = false;
      this.popup.success('ok');
    });
  }
}
