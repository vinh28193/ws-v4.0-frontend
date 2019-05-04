import {Component} from '@angular/core';
import {ModuleComponent} from './module.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<div class="loading_new" style="display: none" id="loading">\n' +
        '  <div class="loading-inner-new">\n' +
        '    <img src="../../assets/images/loading64.gif">\n' +
        '  </div>\n' +
        '</div>' +
        '<router-outlet></router-outlet>',
    styleUrls: ['./app-routing.component.css']
})
export class AppRoutingComponent extends ModuleComponent {
    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    loading = false;

}
