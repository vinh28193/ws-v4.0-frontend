import {Component, OnInit} from '@angular/core';
import {OperationDataComponent} from '../../operation-data.component';
import {OperationService} from '../../operation.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent extends OperationDataComponent implements OnInit {

    constructor(public service: OperationService) {
        super(service);
    }
    clients: any = [];
    activeClient: any = {};
    totalclient = 0;
    limit = 20;
    keyword = '';

    ngOnInit() {
        this.getClients(1);
    }
    getClients(page) {
        console.log(this.limit);
        const fd = new FormData();
        fd.append('keyword', this.keyword);
        this.currentPage = page;
        this.service.get('clients/index', fd, this.currentPage, this.limit).subscribe(res => {
            // this.total = res.total;
            this.clients = res.data;
            this.totalclient = res.total;
            this.activeClient = this.clients[0];
            this.getTotalTransaction(this.activeClient.id);
        });
    }

    getTotalTransaction(client) {
        if (this.activeClient !== client) {
            this.activeClient = client;
            let fd = new FormData();
            fd.append('idWallet', client.id);
            this.walletService.getList('clients/get-total-transaction', fd).subscribe(res => {
                this.total = res.data;
            });
        }
    }
}
