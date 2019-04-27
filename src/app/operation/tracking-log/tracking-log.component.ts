import {Component, OnInit} from '@angular/core';
import { TrackingLogService} from './tracking-log.service';
import {FormBuilder, FormGroup,FormControl} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';


@Component({
  selector: 'app-tracking-log',
  templateUrl: './tracking-log.component.html',
  styleUrls: ['./tracking-log.component.css']
})
export class TrackingLogComponent implements OnInit {

  public searchForm: FormGroup;
  public ListTrackingLog: any = [];
  public ListTrackingLogEdit: any = [];
  public TotalCountTrackingLog: any = 0;
  public PageCountTrackingLog : any = 0;
  public PerPageTrackingLog : any = 0;
  public CurrentPageTrackingLog : any = 0;
  public modals: any = [];
  constructor(private TrackingLogService: TrackingLogService,
              private fb: FormBuilder,
  ) {
  	
   }

  ngOnInit() {
    this.CurrentPageTrackingLog = 1;
    this.PerPageTrackingLog = 20;
    this.buildSearchForm();  
  	this.loadTrackingLog();
    this.buildListTrackingLogEdit();

  }
  buildSearchForm() {
    this.searchForm = this.fb.group({
      trackingcode: '',
      ip: '',
      user: '',
      sortField: '',
      logtype: '',
      note:'',
      page: this.CurrentPageTrackingLog,
      perPage: this.PerPageTrackingLog,
    });
    console.log(this.searchForm);
  }
  loadTrackingLog()
  {
        const params: any = {};
        params.page = 1;
  	    this.TrackingLogService.search(params).subscribe(res => {
            const result: any = res;
            this.loadFormSearch(result);
           
        });
  }
  getListTrackingLog()
  {

         const value = this.searchForm.value;
         const params: any = {};
         params.trackingcode = value.trackingcode;
         params.request_ip = value.ip;
         params.log_type = value.logtype;
         params.user = value.user;
         //params.sortField = value.sortField;
         params.note = value.note;
         params.page = value.page;
         params.perPage = value.perPage;
         this.TrackingLogService.search(params).subscribe(res => {
         const result: any = res;
         this.loadFormSearch(result);

        });
        console.log(value);
  }
  openShowTrackingLog(trackingcode) {
        const params: any = {};
        params.trackingcode = trackingcode;
        this.TrackingLogService.search(params).subscribe(res => {
           const result: any = res;
           this.ListTrackingLogEdit =result.data._items;
           console.log(this.ListTrackingLogEdit);
        });
   }
  offOption() {
    }
  buildListTrackingLogEdit()
  {
         this.ListTrackingLogEdit.tracking = '2132';
         this.ListTrackingLogEdit.user = '12321';
         this.ListTrackingLogEdit.user = '';
         this.ListTrackingLogEdit.request_ip = '';
         this.ListTrackingLogEdit.created_at = '';
         this.ListTrackingLogEdit.log_type = '';
         this.ListTrackingLogEdit.object = '';
  }
  loadFormSearch(result)
  {
            this.ListTrackingLog = result.data._items;
            this.TotalCountTrackingLog = result.data._meta.totalCount;
            this.PageCountTrackingLog = result.data._meta.pageCount;
            this.PerPageTrackingLog = result.data._meta.perPage;
            this.CurrentPageTrackingLog = result.data._meta.currentPage;
  }

    handlePagination(event) {
        const page = event.page;
        console.log(page);
        this.searchForm.patchValue({page: page});
        this.getListTrackingLog();
    }
}
