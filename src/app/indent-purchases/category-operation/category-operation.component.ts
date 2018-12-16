import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { IndentService } from 'app/services/indent.service';
import {MatDialog} from '@angular/material';
import * as _ from 'lodash';
import { GeneratePurchaseOrder } from "app/indent-purchases/generate-order-modal/generate-order.component";
import * as moment from 'moment';
import { ToasterService } from "app/services/toaster.service";

@Component({
    selector     : 'category-list',
    templateUrl  : './category-operation.component.html',
    styleUrls    : ['./category-operation.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit
{
    dataSource: any[] = [];
    displayedColumns = ['Sno', 'name', 'action'];

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
        private _ecommerceProductsService: EcommerceProductsService,
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
        this.getCategory();
    }

    getCategory(): any {
        this._indentService.GetCategory().subscribe((a: any) => {
            if (a && a.Body.length) {
                this.dataSource = a.Body;
            }
        });
    }

    editIndent(obj): any {
        console.log(obj);
    }

    deleteCategory(id): any {
        this._indentService.DeleteCategory(id).subscribe(a => {
            if (a && a.Status.toLowerCase() === 'success') {
                this._toastr.successToast('Category deleted succesfully');
                this.getCategory();                
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
            case 'number': return compare(a.PONumber, b.PONumber, isAsc);
            case 'supplier': return compare(a.VendorName, b.VendorName, isAsc);
            case 'date': return compare(a.PODate, b.PODate, isAsc);
            case 'dispatch': return compare(a.Despatchhrough, b.Despatchhrough, isAsc);
            default: return 0;
          }
        });
      }
}
function compare(a: number | string, b: number | string, isAsc: boolean): any {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        public dialog: MatDialog,
        private _ecommerceProductsService: EcommerceProductsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._ecommerceProductsService.products;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._ecommerceProductsService.onProductsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._ecommerceProductsService.products.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch ( this._matSort.active )
            {
                case 'date':
                    [propertyA, propertyB] = [a.PODate, b.PODate];
                    break;
                case 'number':
                    [propertyA, propertyB] = [a.PONumber, b.PONumber];
                    break;
                case 'supplier':
                    [propertyA, propertyB] = [a.VendorName, b.VendorName];
                    break;
                case 'dispatch':
                    [propertyA, propertyB] = [a.Despatchhrough, b.Despatchhrough];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
