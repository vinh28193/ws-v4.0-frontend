import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TrackingService} from '../tracking.service';
import {TrackingDataComponent} from '../tracking-data.component';
import {ModalDirective} from 'ngx-bootstrap';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
    selector: 'app-us-sending-views',
    templateUrl: './us-sending-views.component.html',
    styleUrls: ['./us-sending-views.component.css']
})
export class UsSendingViewsComponent extends TrackingDataComponent implements OnInit {

    @Input() tab_tracking = '';
    @Input() tracking_codes = '';
    @Input() page = 1;
    @Input() limit = 20;
    @Input() total = 0;
    @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
    @Output() updateTracking: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() mergeTracking: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('insertTrackingModal') insertTrackingModal: ModalDirective;
    public productIds: any = [];
    public filter: any = {
        tracking_code: '',
        sku: '',
        order_code: '',
        type_tracking: '',
    };
    public tracking_Insert: any = {
        tracking_code: '',
        info: []
    };

    constructor(
        public trackingService: TrackingService,
        public _scope: ScopeService
    ) {
        super(trackingService, _scope);
    }

    ngOnInit() {
    }

    showSellerRefundModal(park) {
        this.sellerRefund.emit(park);
    }

    showUpdateForm(packTr) {
        this.updateTracking.emit(packTr);
    }

    mapUnknown(id, tracking_code) {
        this.trackingService.popup.confirm(() => {
            this.trackingService.mapUnknownUS(id, {product_id: this.productIds[id]}).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.trackingService.popup.success(res.message);
                    this.search();
                } else {
                    this.trackingService.popup.error(res.message);
                }
            });
        }, 'Do you want map product id ' + this.productIds[id] + ' for tracking ' + tracking_code, 'Map');
    }

    search() {
        this.searchEvent.emit({
            page: this.page,
            limit: this.limit,
            total: this.total,
            filter: this.filter
        });
    }

    handlePagination(event) {
        this.page = event.page;
        this.search();
    }

    gettotalPage() {
        return Math.ceil(this.total / this.limit);
    }

    refresh() {
        this.filter = {
            tracking_code: '',
            sku: '',
            order_code: '',
            type_tracking: '',
        };
        this.page = 1;
        this.limit = 20;
        this.search();
    }

    showMergeTracking(id, tracking) {
        this.mergeTracking.emit({id: id, tracking_code: tracking});
    }

    insertTrackingShow() {
        this.tracking_Insert.info = [];
        this.addInfo();
        this.insertTrackingModal.show();
    }

    insertTracking() {
        if (!this.tracking_Insert.tracking_code) {
            return this.trackingService.popup.error('Tracking code cannot null!');
        }
        if (!this.tracking_Insert.info.length) {
            return this.trackingService.popup.error('Tracking cannot empty info!');
        }
        this.trackingService.post('s-us-send/insert-tracking', this.tracking_Insert).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.trackingService.popup.success(res.message);
                this.insertTrackingModal.hide();
                this.search();
            } else {
                this.trackingService.popup.error(res.message);
            }
        });
    }

    addInfo() {
        this.tracking_Insert.info.push({
            order_id: '',
            product_id: '',
            purchase_number_invoice: '',
        });
    }

    removeInfo(ind) {
        const rs = [];
        $.each(this.tracking_Insert.info, function (k, v) {
            if (k !== ind) {
                rs.push(v);
            }
        });
        this.tracking_Insert.info = rs;
        console.log('remove: ');
    }
}
