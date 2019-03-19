import {Component} from '@angular/core';
import {ModuleComponent} from './module.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppRoutingComponent extends ModuleComponent {

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

}
