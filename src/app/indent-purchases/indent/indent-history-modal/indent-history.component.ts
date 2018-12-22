import {Component, Input, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToasterService } from '../../../services/toaster.service';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndentService } from '../../../services/indent.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'indent-history-modal',
  styleUrls: ['./indent-history.component.scss'],
  templateUrl: './indent-history.component.html',
  animations   : fuseAnimations,
})
export class IndentHistoryComponent implements OnInit {
    public moment = moment;

    @Input() dataSource: any[] = [];
    displayedColumns = ['serial', 'date', 'number', 'name', 'category', 'qty'];

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
	    @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _indentService: IndentService,
        private _toastr: ToasterService,
        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();


    }

    /**
     * On init
     */
    ngOnInit(): void
    {

        _.map(this.data.indentList, (o) => {
          o.CreateDate = moment(o.CreateDate).format('MM/DD/YYYY');
          return o.OrderQuantity = o.Quantity;  
        });
    }
}
