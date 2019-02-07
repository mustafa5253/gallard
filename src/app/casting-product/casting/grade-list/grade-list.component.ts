import { DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { GeneratePurchaseOrder } from "app/indent-purchases/generate-order-modal/generate-order.component";
import { IndentService } from 'app/services/indent.service';
import { ToasterService } from "app/services/toaster.service";
import * as _ from 'lodash';
import * as moment from 'moment';
import { BehaviorSubject, merge, Observable, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IndentHistoryComponent } from 'app/indent-purchases/indent/indent-history-modal/indent-history.component';
import { AddIndentComponent } from "app/indent-purchases/indent/create-indent/add-indent.component";
import { AddCastingComponent } from '../create-casting/add-casting.component';
import { AddGradeComponent } from '../create-grade/add-grade.component';
import { Location } from '@angular/common';


@Component({
    selector     : 'grade-list',
    templateUrl  : './grade-list.component.html',
    styleUrls    : ['./grade-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class GradeListComponent implements OnInit, OnChanges {
    @Input() refreshList: boolean = false;
    //@Output() updateIndent: EventEmitter<any> = new EventEmitter(null);
    dataSource: any[] = [];
    displayedColumns = [ 'S.NO.', 'Casting Base', 'Grade', 'Action'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;
    moment = moment;
    indentList:any[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialog: MatDialog,
        private _indentService: IndentService,
        private _toastr: ToasterService,
        public location :Location
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
        this.getIndentList();
    }

    getIndentList(): any {
        this._indentService.GetIndent().subscribe((a: any) => {
            if (a && a.Body &&a.Body.length) {
                this.dataSource = a.Body;
                this.indentList = a.Body;
                this.refreshList = false;
            }
        });
    }

     goBack() {
    this.location.back();
  }

    editIndent(obj): any {
        const dialogRef = this.dialog.open(AddCastingComponent, {
            width: '100%',
            panelClass: ['max-950', 'center-align'],
            data: obj
        });

        dialogRef.afterClosed().subscribe(isSuccess => {
            if(isSuccess) {
                dialogRef.close();
                this.getIndentList();
            }
        });
    }

    deleteIndent(indentId): any {
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
        const dialogRef = this.dialog.open(GeneratePurchaseOrder, {
            width: "100%",
            panelClass: 'full-width-modal',
            data: { indentList: selectedIndent, isUpdate: false }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getIndentList();
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
            case 'IndentDate': return this.compare(a.CreateDate, b.CreateDate, isAsc);
            case 'priority': return this.compare(a.Priority, b.Priority, isAsc);
            case 'category': return this.compare(a.CategoryName, b.CategoryName, isAsc);
            case 'quantity': return this.compare(a.Quantity, b.Quantity, isAsc);
            case 'name': return this.compare(a.ItemName, b.ItemName, isAsc);
            default: return 0;
          }
        });
    }

    

    createGrade() {
        const dialogRef = this.dialog.open(AddGradeComponent, {
            width: '100%',
            panelClass: ['max-950', 'center-align'],
        });

        dialogRef.afterClosed().subscribe(isSuccess => {
            if(isSuccess) {
                this.getIndentList();
            }
        });
    }

    ngOnChanges(s) {
        if (s && s.refreshList.currentValue) {
            this.getIndentList();
        }
    }
    compare(a: number | string, b: number | string, isAsc: boolean): any {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    search(ev) {
        let searchStr = ev.target.value ? ev.target.value.toLowerCase() : '';
        this.dataSource = this.indentList.filter((item) => item.ItemName.toLowerCase().includes(searchStr));
    }

    

} 
