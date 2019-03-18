import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

/**
 * 1 đối tượng  cho việc khai báo, khai thác router,
 * các component routing đều được kế thừa
 */
export class ModuleComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

}
