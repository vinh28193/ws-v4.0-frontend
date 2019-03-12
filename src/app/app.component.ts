import {Component} from '@angular/core';
import {BaseComponent} from './core/base.compoment';
import {ClientService} from './core/service/client.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent {

    constructor(public http: ClientService) {
        super(http);
    }
}
