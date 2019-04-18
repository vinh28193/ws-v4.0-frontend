import {OnInit} from '@angular/core';
import {BaseComponent} from './core/base.compoment';
import {ClientService} from './core/service/client.service';

/**
 * 1 đối tượng cho việc hiển thị dữ liệu, trình bày.
 * quản lý cả dữ liệu được dùng chung cho toàn module
 */
export class PresentComponent extends BaseComponent implements OnInit {

    // meta
    public totalCount = 0;
    public pageCount = 1;
    public currentPage = 1;
    public perPage = 20;

    public allKey = 'ALL';
    public allLabel = '--All--';

    public jsVoid = 'javascript:void(0);';

    constructor(public http: ClientService) {
        super(http);
    }

    ngOnInit() {
    }

}
