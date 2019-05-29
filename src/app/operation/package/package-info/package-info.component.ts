import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScopeService} from '../../../core/service/scope.service';
import {PackageDataComponent} from '../package-data.component';
import {PackageService} from '../package.service';

@Component({
  selector: 'app-package-info',
  templateUrl: './package-info.component.html',
  styleUrls: ['./package-info.component.css']
})
export class PackageInfoComponent extends PackageDataComponent implements OnInit {
  @Input() packTr: any = [];
  @Output() viewLog: EventEmitter<any> = new EventEmitter<any>();
  constructor(
      http: PackageService,
      public _scope: ScopeService
      ) {
    super(http, _scope);
  }

  ngOnInit() {
  }
  viewLogInfo(code, type) {
    this.viewLog.emit({code: code, type: type});
  }

}
