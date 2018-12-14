import {Component, Input, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ToasterService } from '../../services/toaster.service';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndentService } from '../../services/indent.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';


@Component({
  selector: 'generate-purchase-order',
  styleUrls: ['./generate-order.component.scss'],
  templateUrl: './generate-order.component.html',
  animations   : fuseAnimations,
})
export class GeneratePurchaseOrder {
	showSupplierDetail: boolean = true;
    @Input() dataSource: any[] = [];
    displayedColumns = ['serial','date', 'number', 'supplier', 'action'];

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
	    @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _indentService: IndentService,
        private _toastr: ToasterService,   
    )
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
}
