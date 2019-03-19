import {Component} from '@angular/core';
import {ModuleComponent} from './module.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // template: '<router-outlet></router-outlet>'
})
export class AppRoutingComponent extends ModuleComponent {
    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    loading = false;

    closeSidebar() {
        $('.page-wrapper').removeClass('toggled');

    }

    showSidebar() {
        $('.page-wrapper').addClass('toggled');
    }

    checkLogin() {
        console.log('chec');
    }
}
