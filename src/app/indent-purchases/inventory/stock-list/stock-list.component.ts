import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { IndentService } from 'app/services/indent.service';
import {MatDialog} from '@angular/material';
import * as _ from 'lodash';
import { GeneratePurchaseOrder } from "app/indent-purchases/generate-order-modal/generate-order.component";
import * as moment from 'moment';
import { ToasterService } from "app/services/toaster.service";
import { IssueStockComponent } from "app/indent-purchases/inventory/issue-stock/issue-stock.component";


@Component({
    selector     : 'stock-list',
    templateUrl  : './stock-list.component.html',
    styleUrls    : ['./stock-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StockListComponent implements OnInit
{
    dataSource: any[] = [];
    displayedColumns = ['checkbox', 'Sno', 'material', 'category', 'quantity'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;
    moment = moment;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialog: MatDialog,
        private _indentService: IndentService,
        private _toastr: ToasterService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getStockList();
    }

    getStockList(): any {
        this._indentService.GetStockList().subscribe((a: any) => {
            if (a && a.Body.length) {
                this.dataSource = a.Body;
            }
        });
    }

    editIndent(obj): any {
        console.log(obj);
    }

    deleteMaterial(id): any {
        this._indentService.DeleteMaterial(id).subscribe(a => {
            if (a && a.Status.toLowerCase() === 'success') {
                this._toastr.successToast('Material deleted succesfully');
                this.getStockList();       
            } else {
                this._toastr.errorToast(a.status);
            }
        });
    }


    sortData(sort): any {
        const data = this.dataSource.slice();
        if (!sort.active || sort.direction === '') {
          this.dataSource = data;
          return;
        }
    
        this.dataSource = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'material': return compare(a.ItemName, b.ItemName, isAsc);
            case 'category': return compare(a.CategoryId, b.CategoryId, isAsc);
            case 'quantity': return compare(a.Quantity, b.Quantity, isAsc);
            default: return 0;
          }
        });
    }


    openStockIssueModal(){
        let selectedItem = _.filter(this.dataSource, (o) => o.selected);
        if (selectedItem && !selectedItem.length) {
            return this._toastr.errorToast('Please select atleast 1 item');
        }
        
        const dialogRef = this.dialog.open(IssueStockComponent, {
            width: '100%',
            panelClass: ['max-950', 'center-align'],
            data: { material: selectedItem }
        });

        dialogRef.afterClosed().subscribe(isSuccess => {
            if(isSuccess) {
                dialogRef.close();
            }
        });
    }
}
function compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

