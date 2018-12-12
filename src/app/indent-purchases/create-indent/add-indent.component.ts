import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { IndentService } from '../../services/indent.service';
import { ToasterService } from '../../services/toaster.service';


export const materialList = [
    { name: 'Material 1', id: 1},
    { name: 'Material 2', id: 2},
    { name: 'Material 3', id: 3},
    { name: 'Material 4', id: 4},
];

export const categoryList = [
    { name: 'Production', id: 1},
    { name: 'Consumption', id: 2},
    { name: 'Maintainance', id: 3},
    { name: 'Capital Expenditure', id: 4},
];

export const unitList = [
    {name: 'piece', uniqueName: 'pcs'},
    {name: 'number', uniqueName: 'number'},
    {name: 'kilogram', uniqueName: 'kgs'},
    {name: 'litre', uniqueName: 'ltr'},

];

export const gstList = [0, 5, 12, 18, 28];
export const priority = ['normal', 'urgent'];

@Component({
    selector     : 'add-indent',
    templateUrl  : './add-indent.component.html',
    styleUrls    : ['./add-indent.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddIndentComponent implements OnInit
{
    pageType: string;
    indentForm: FormGroup;
    materialList = materialList;
    categoryList = categoryList;
    unitList = unitList;
    gstList = gstList;
    priority = priority;
    materialFilter: Observable<any>;
    categoryFilter: Observable<any>;
    unitFilter: Observable<any>;
    public noMaterialFound: boolean = false;
    public noUnitFound: boolean = false;
    

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _formBuilder: FormBuilder,
        // private _location: Location,
        private _matSnackBar: MatSnackBar,
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
        this.indentForm = this.createProductForm();   
        this.materialFilter = this.indentForm.get('rawMaterial').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

        this.categoryFilter = this.indentForm.get('category').valueChanges
        .pipe(
          startWith(''),
          map(value => this._categoryFilter(value))
        );

        this.unitFilter = this.indentForm.get('unit').valueChanges
        .pipe(
          startWith(''),
          map(value => this._unitFilter(value))
        );
    }

    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            date: [''],
            rawMaterial: ['', [Validators.required]],
            category: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            stkid: [{value: '', disabled: true}],
            unit: ['', [Validators.required]],
            hsnCode: [''],
            gst: [''],
            priority: ['', [Validators.required]]
        });
    }

    addNewIndent(): any {
        debugger;
        const request: any = this.indentForm.value;
        this._indentService.AddIndent(request).subscribe(a => {
            if (a && a.status.toLowerCase() === 'success') {
                this._toastr.successToast('Indent added succesfully');                
            } else {
                this._toastr.errorToast(a.status);
            }
        });
    }

    showToaster() {
        this._matSnackBar.open('Indent added succesfully', '', {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
    }

    getRawMaterial() {
        this._indentService.GetRawMaterial().subscribe((a: any[]) => {
            if (a && a.length) {
                this.materialList = a;
            }
        });
    }

    getStockUnit() {
        this._indentService.GetStockUnit().subscribe((a: any[]) => {
            if (a && a.length) {
                this.unitList = a;
            }
        });
    }

    getCategory() {
        this._indentService.GetCategory().subscribe((a: any[]) => {
            if (a && a.length) {
                this.categoryList = a;
            }
        });
    }

    addRawMaterial() {
        let val = 'a';
        console.log(val);

        this._indentService.AddRawMaterial(val).subscribe((a: any[]) => {
           console.log(a);
        }); 
    }


    addUnit() {
        let val = 'a';
        console.log(val);

        this._indentService.AddStockUnit(val).subscribe((a: any[]) => {
           console.log(a);
        }); 
    }

    addCategory() {
        let val = 'a';
        console.log(val);

        this._indentService.AddCategory(val).subscribe((a: any[]) => {
           console.log(a);
        }); 
    }

    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.materialList.filter( (option: any) => option.name.toLowerCase().includes(filterValue));
    }

    private _categoryFilter(value: string) {
        const filterValue = value.toLowerCase();
        return this.categoryList.filter( (option: any) => option.name.toLowerCase().includes(filterValue));
    }

    private _unitFilter(value: string) {
        const filterValue = value.toLowerCase();
        return this.unitList.filter( (option: any) => option.name.toLowerCase().includes(filterValue));
    }
    
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

