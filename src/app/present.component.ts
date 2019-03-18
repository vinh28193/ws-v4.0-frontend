import {OnInit} from '@angular/core';
import {BaseComponent} from './core/base.compoment';
import {ClientService} from './core/service/client.service';

export class PresentComponent extends BaseComponent implements OnInit {

    // meta
    public totalCount: number;
    public pageCount: number;
    public currentPage: number;
    public perPage: number;

    constructor(public http: ClientService) {
        super(http);
    }

    ngOnInit() {
    }

}
