import {Component} from '@angular/core';
import {ModuleComponent} from './module.component';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>'
})
export class AppRoutingComponent extends ModuleComponent {


}
