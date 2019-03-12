import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../core/service/client.service';

@Component({
    selector: 'app-shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

    constructor(private shipmentService: ClientService) {
    }

    getProcessing = false;

    ngOnInit() {
    }

    getList() {
        const fd = new FormData();
        this.shipmentService.post('manifest/index', fd, 1, 20).subscribe(res => {
            console.log(res);
        });
    }
}
