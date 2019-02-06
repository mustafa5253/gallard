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


@Component({
    selector     : 'material-list',
    templateUrl  : './materials-operation.component.html',
    styleUrls    : ['./materials-operation.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class MaterialListComponent implements OnInit
{
    dataSource: any[] = [];
    displayedColumns = ['serial', 'material', 'category', 'unit', 'hsn', 'gst', 'action'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;
    moment = moment;
    materialList: any[] = [];
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
        this.getMaterialList();
    }

    getMaterialList(): any {
        this._indentService.GetRawMaterial().subscribe((a: any) => {
            if (a && a.Body && a.Body.length) {
                this.dataSource = a.Body;
                this.materialList = a.Body;
            } else {
                this.materialList = [];
                this.dataSource = [];
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
                this.getMaterialList();       
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
            case 'unit': return compare(a.UOMID, b.UOMID, isAsc);
            default: return 0;
          }
        });
      }

    search(ev) {
        let searchStr = ev.target.value ? ev.target.value.toLowerCase() : '';
        this.dataSource = this.materialList.filter((item) => item.ItemName.toLowerCase().includes(searchStr) || item.CategoryName.toLowerCase().includes(searchStr)  || item.Name.toLowerCase().includes(searchStr));
    }
}
function compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

