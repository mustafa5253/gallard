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
import { ToasterService } from '../../services/toaster.service';
import {MatDialog} from '@angular/material';
import * as _ from 'lodash';
import { GeneratePurchaseOrder } from "app/indent-purchases/generate-order-modal/generate-order.component";


export const IndentList = [
    { selected: false, IndentDate: '08/12/2018', priority: 'Normal', category: 'Production', material: { name: 'Thread Lock', uniqueName: 'threadlock'}, quantity: 100.00, unit: 'kgs'},
    { selected: false, IndentDate: '07/12/2018', priority: 'Urgent', category: 'Maintenance', material: { name: 'Ferro Manganese HC', uniqueName: 'threadlock'}, quantity: 2000.00, unit: 'kgs'},
    { selected: false, IndentDate: '04/12/2018', priority: 'Urgent', category: 'Mould Coats', material: { name: 'Black Japan Paints', uniqueName: 'threadlock'}, quantity: 100.00, unit: 'ltr'},
    { selected: false, IndentDate: '02/12/2018', priority: 'Urgent', category: 'Electrical', material: { name: 'Silica Sand', uniqueName: 'threadlock'}, quantity: 25000.00, unit: 'kgs'},
    { selected: false, IndentDate: '01/12/2018', priority: 'Normal', category: 'Production', material: { name: 'Grinding Wheel 2', uniqueName: 'threadlock'}, quantity: 20.00, unit: 'pcs'},
];

@Component({
    selector     : 'indent-list',
    templateUrl  : './indent-list.component.html',
    styleUrls    : ['./indent-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class IndentListComponent implements OnInit
{
    dataSource: any[] = IndentList;
    displayedColumns = ['selected', 'IndentDate', 'material', 'category', 'quantity', 'priority', 'action'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

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
        // this.dataSource = new FilesDataSource(this._ecommerceProductsService, this.paginator, this.sort);

        // fromEvent(this.filter.nativeElement, 'keyup')
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(() => {
        //         if ( !this.dataSource )
        //         {
        //             return;
        //         }

        //         // this.dataSource.filter = this.filter.nativeElement.value;
        //     });
        this.getIndentList();
    }

    getIndentList(): any {
        this._indentService.GetIndent().subscribe((a: any) => {
            if (a && a.Body.length) {
                this.dataSource = a.Body;
            }
        });
    }

    editIndent(obj): any {
        console.log(obj);
    }

    deleteIndent(indentId): any {
        console.log(indentId);
        this._indentService.DeleteIndent(indentId).subscribe(a => {
            if (a && a.Status.toLowerCase() === 'success') {
                this._toastr.successToast('Indent deleted succesfully');
                this.getIndentList();                
            } else {
                this._toastr.errorToast(a.status);
            }
        });
    }

    generateOrder() {
        let selectedIndent = _.filter(this.dataSource, (o: any) => o.selected);
        if(selectedIndent && !selectedIndent.length) {
            return this._toastr.warningToast('Please select atleast 1 indent');
        }
        console.log('selectedIndent', selectedIndent);
        const dialogRef = this.dialog.open(GeneratePurchaseOrder, {
            width: "100%",
            panelClass: 'full-width-modal',
            data: { indentList: selectedIndent }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
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
            case 'IndentDate': return compare(a.CreateDate, b.CreateDate, isAsc);
            case 'priority': return compare(a.Priority, b.Priority, isAsc);
            case 'category': return compare(a.CategoryName, b.CategoryName, isAsc);
            case 'quantity': return compare(a.Quantity, b.Quantity, isAsc);
            case 'name': return compare(a.ItemName, b.ItemName, isAsc);
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
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
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
