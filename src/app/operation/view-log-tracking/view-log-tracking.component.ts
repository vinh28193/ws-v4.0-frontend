import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {OperationService} from '../operation.service';

@Component({
    selector: 'app-view-log-tracking',
    templateUrl: './view-log-tracking.component.html',
    styleUrls: ['./view-log-tracking.component.css']
})
export class ViewLogTrackingComponent implements OnInit, DoCheck {

    constructor(public service: OperationService) {
    }

    @Input() type = 'tracking';
    @Input() code = '';
    public data: any = [];
    public current_code = '';
    ngOnInit() {
    }

    ngDoCheck(): void {
        if (this.code !== this.current_code) {
            this.current_code = this.code;
            this.getList();
        }
    }

    getList() {
        if (!this.code || !this.type) {
            return this.service.popup.error('Dont see ' + this.type + ' code: ' + this.code);
        }
        this.service.post('log-tracking/view-log', {type: this.type, code: this.code}).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.data = rs.data;
            } else {
                this.service.popup.error(rs.message);
            }
        });
    }
}
